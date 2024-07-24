import { Request } from 'express';
import { PayloadType } from './payload/payload.type';
declare global {
  namespace Express {
    interface Request {
      user?: PayloadType;
    }
  }
}
