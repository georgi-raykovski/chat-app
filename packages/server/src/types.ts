import { Request } from 'express';
export interface QueryPayload {
  foo: string;
}

export type RequestBody<T extends Record<any, any>> = Request<{}, {}, T>;
