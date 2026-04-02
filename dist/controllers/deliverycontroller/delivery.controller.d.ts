import { Request, Response, NextFunction } from 'express';
export declare const postDelivery: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const listDelivery: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateDelivery: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getspecificDelivery: (req: Request, res: Response, next: NextFunction) => Promise<void>;
