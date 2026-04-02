import { Request, Response } from 'express';
export declare class BatchController {
    static list(req: Request, res: Response): Promise<void>;
    static getOne(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static remove(req: Request, res: Response): Promise<void>;
}
