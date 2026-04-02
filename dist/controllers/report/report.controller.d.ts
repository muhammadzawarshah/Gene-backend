import { Request, Response, NextFunction } from 'express';
export declare class ReportController {
    static getInventoryDashboard(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getFinancialReport(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static getDashboard(req: Request, res: Response, next: NextFunction): Promise<void>;
}
