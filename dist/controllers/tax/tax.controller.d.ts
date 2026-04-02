import { Request, Response } from 'express';
export declare class TaxController {
    static getTaxes(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static createTax(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static deleteTax(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updateTax(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
