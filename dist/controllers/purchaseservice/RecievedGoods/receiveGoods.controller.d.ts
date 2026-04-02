import { Request, Response, NextFunction } from 'express';
export declare const receiveGoods: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listgrn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSingleGRN: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
