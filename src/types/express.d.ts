import { Request } from 'express';
import { payloadType } from './payload/payload.type';
declare global {
  namespace Express {
    interface Request {
      user?: payloadType;
    }
  }
}
