import { Request, Response } from 'express';
export declare const createWarehouse: (req: Request, res: Response) => Promise<void>;
export declare const getWarehouses: (_req: Request, res: Response) => Promise<void>;
export declare const deleteWarehouse: (req: Request, res: Response) => Promise<void>;
export declare const updateWarehouse: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
