import { Request, Response } from "express";
export declare class productcategorycontroller {
    static createcategory(req: Request, res: Response): Promise<void>;
    static listcategory(req: Request, res: Response): Promise<void>;
    static specificcategory(req: Request, res: Response): Promise<void>;
    static updatecategory(req: Request, res: Response): Promise<void>;
    static deletecategory(req: Request, res: Response): Promise<void>;
}
