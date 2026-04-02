import { Request, Response, NextFunction } from 'express';
export declare class ERPController {
    static createProduct(req: Request, res: Response, next: NextFunction): Promise<void>;
    static addParty(req: Request, res: Response, next: NextFunction): Promise<void>;
    static createUOM(req: Request, res: Response, next: NextFunction): Promise<void>;
    static createPurchaseOrder(req: Request, res: Response, next: NextFunction): Promise<void>;
    static pickGRN(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getOpenPOs(req: Request, res: Response, next: NextFunction): Promise<void>;
    static receiveGoods(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static getPOItems(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static getDropdowns(req: Request, res: Response, next: NextFunction): Promise<void>;
}
