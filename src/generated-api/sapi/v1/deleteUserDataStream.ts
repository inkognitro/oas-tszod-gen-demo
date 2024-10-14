import {z_Error, Error} from '../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../core';

export const deleteUserDataStreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    listenKey: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({}),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type DeleteUserDataStreamRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type DeleteUserDataStreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type DeleteUserDataStreamRequestResult = RequestResult<
  DeleteUserDataStreamRequest,
  DeleteUserDataStreamResponse
>;

export function deleteUserDataStream(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteUserDataStreamRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteUserDataStreamRequestResult> {
  return requestHandler.execute(
    createRequest(deleteUserDataStreamEndpointSchema, payload),
    config
  );
}
