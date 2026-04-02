import { Request, Response } from 'express';
export declare class StockController {
    static getStockByWarehouse(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static stockTransfer(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
