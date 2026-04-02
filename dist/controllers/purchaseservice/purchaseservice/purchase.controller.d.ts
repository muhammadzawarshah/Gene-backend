import { Request, Response, NextFunction } from 'express';
export declare const receiveGoods: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const listPurchase: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const purchaseorderlistonpoid: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updatepurchasepo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
