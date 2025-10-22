import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

/**
 * The asyncHandler function is a TypeScript function that wraps another async function handler and
 * handles different types of errors that may occur during its execution.
 * @param handler - The `handler` parameter in the `asyncHandler` function is a function that takes a
 * `NextRequest` object as an argument and returns a `Promise` that resolves to a `NextResponse`
 * object. This function is responsible for handling the main logic of the request processing. The
 * `asyncHandler
 * @returns The `asyncHandler` function returns an asynchronous function that takes a `NextRequest`
 * object as a parameter and returns a `Promise` that resolves to a `NextResponse`. Inside this
 * function, it tries to execute the provided `handler` function with the `request` parameter. If an
 * error occurs during the execution, it checks the type of error and returns a corresponding
 * `NextResponse` object.
 */
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
