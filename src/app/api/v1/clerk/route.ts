import { addUserToDb, updateClerkMetaData } from '@/lib/data';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  try {
    // Get the headers
    const headerPayload = await headers();
    const svixId = headerPayload.get('svix-id');
    const svixTimestamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('Missing required svix headers');
      return new Response('Missing headers', { status: 400 });
    }

    const svixHeaders = {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    };

    // Get the body
    const payload = await request.text();

    // Verify the webhook signature
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(payload, svixHeaders) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error occurred', { status: 400 });
    }

    console.log('Webhook received:', evt.type);

    // Handle the event
    switch (evt.type) {
      case 'user.created':
        try {
          const result = await addUserToDb({ data: evt.data });

          if (result.success) {
            await updateClerkMetaData({ clerkId: evt.data.id });
            console.log('User created successfully:', evt.data.id);
          } else {
            console.error('Failed to create user:', result.message);
          }
        } catch (error) {
          console.error('Error creating user:', error);
          return new Response('Error creating user', { status: 500 });
        }
        break;

      case 'user.updated':
        console.log('User updated:', evt.data.id);
        // Handle user updates if needed
        break;

      case 'user.deleted':
        console.log('User deleted:', evt.data.id);
        // Handle user deletion if needed
        break;

      default:
        console.log('Unhandled webhook event type:', evt.type);
        break;
    }

    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
