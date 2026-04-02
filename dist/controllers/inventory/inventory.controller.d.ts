import { Request, Response, NextFunction } from 'express';
export declare class InventoryController {
    static getLedger(req: Request, res: Response, next: NextFunction): Promise<void>;
    static deleteEntry(req: Request, res: Response): Promise<void>;
}
