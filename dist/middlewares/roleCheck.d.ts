import { Request, Response, NextFunction } from 'express';
interface AuthRequest extends Request {
    user?: {
        role: string;
        id: string;
    };
}
export declare const checkRole: (allowedRoles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
