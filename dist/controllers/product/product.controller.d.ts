import { Request, Response } from 'express';
export declare class ProductController {
    static create(req: Request, res: Response): Promise<void>;
    static list(req: Request, res: Response): Promise<void>;
    static getOne(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getExpiredReport(req: Request, res: Response): Promise<void>;
    static getproductoncategory(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static update(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
}
