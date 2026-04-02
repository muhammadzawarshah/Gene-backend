import { Request, Response } from 'express';
export declare class ProductPriceController {
    static list(req: Request, res: Response): Promise<void>;
    static listByProduct(req: Request, res: Response): Promise<void>;
    static getOne(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static lookup(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static remove(req: Request, res: Response): Promise<void>;
}
