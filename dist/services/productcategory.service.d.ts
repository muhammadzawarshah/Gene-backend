export declare class ProductCategoryService {
    static createCategory(data: any): Promise<{
        description: string | null;
        product_category_id: number;
        category: string | null;
    }>;
    static getAllProductcategory(): Promise<{
        description: string | null;
        product_category_id: number;
        category: string | null;
    }[]>;
    static getProductcategoryById(id: string): Promise<{
        description: string | null;
        product_category_id: number;
        category: string | null;
    } | null>;
    static updateProductcategory(id: string, data: any): Promise<{
        description: string | null;
        product_category_id: number;
        category: string | null;
    }>;
    static deleteProductcategory(id: string): Promise<{
        description: string | null;
        product_category_id: number;
        category: string | null;
    }>;
}
