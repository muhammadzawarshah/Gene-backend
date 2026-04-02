import { Request, Response } from 'express';
export declare class UserController {
    static register(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static listAll(_req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static updatePartner(req: Request, res: Response): Promise<void>;
    static getuser(req: Request, res: Response): Promise<void>;
    static updateProfile(req: Request, res: Response): Promise<void>;
    static changePassword(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
