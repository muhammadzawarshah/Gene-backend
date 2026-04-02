import { Request, Response } from 'express';
export declare class PartyController {
    static addParty(req: Request, res: Response): Promise<void>;
    static listCustomers(_req: Request, res: Response): Promise<void>;
    static listSuppliers(_req: Request, res: Response): Promise<void>;
    static updateParty(req: Request, res: Response): Promise<void>;
    static deleteParty(req: Request, res: Response): Promise<void>;
}
