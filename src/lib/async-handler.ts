import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function asyncHandler(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      return await handler(request);
    } catch (error: any) {
      {
        if (error instanceof ZodError) {
          return NextResponse.json(
            {
              status: 'fail',
              message: 'Validation error',
              errors: error.cause,
            },
            { status: 400 }
          );
        }

        if (error instanceof Error) {
          return NextResponse.json(
            {
              status: 'error',
              message: error.message || 'An unexpected error occurred',
            },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { status: 'error', message: 'Unknown error' },
          { status: 500 }
        );
      }
    }
  };
}
