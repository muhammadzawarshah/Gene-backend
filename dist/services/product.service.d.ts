export declare class ProductService {
    static createProduct(data: any): Promise<{
        product_id: string;
        uom_id: number;
        name: string;
        sku_code: string | null;
        description: string | null;
        product_cat_id: number | null;
        hsn_code: string | null;
        brand: string | null;
    }>;
    static getAllProducts(): Promise<({
        productcategory: {
            description: string | null;
            product_category_id: number;
            category: string | null;
        } | null;
        productprice: {
            product_id: string;
            uom_id: number;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            prod_price_id: number;
            price_type: import("@prisma/client").$Enums.price_type_enum;
            currency: string | null;
            effective_from: Date;
            effective_to: Date | null;
        }[];
        uom: {
            uom_id: number;
            name: string;
            conversion_to_base: import("@prisma/client-runtime-utils").Decimal | null;
        };
        _count: {
            stockitem: number;
        };
    } & {
        product_id: string;
        uom_id: number;
        name: string;
        sku_code: string | null;
        description: string | null;
        product_cat_id: number | null;
        hsn_code: string | null;
        brand: string | null;
    })[]>;
    static getProductById(id: string): Promise<({
        batchitem: ({
            batch: {
                status: string;
                batch_id: number;
                batch_number: string;
                manufacturing_date: Date | null;
                expiry_date: Date | null;
                location_id: number | null;
            };
        } & {
            product_id: string;
            batch_id: number;
            item_id: number;
            received_quantity: import("@prisma/client-runtime-utils").Decimal;
            available_quantity: import("@prisma/client-runtime-utils").Decimal;
        })[];
        productcategory: {
            description: string | null;
            product_category_id: number;
            category: string | null;
        } | null;
        productprice: {
            product_id: string;
            uom_id: number;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            prod_price_id: number;
            price_type: import("@prisma/client").$Enums.price_type_enum;
            currency: string | null;
            effective_from: Date;
            effective_to: Date | null;
        }[];
        uom: {
            uom_id: number;
            name: string;
            conversion_to_base: import("@prisma/client-runtime-utils").Decimal | null;
        };
    } & {
        product_id: string;
        uom_id: number;
        name: string;
        sku_code: string | null;
        description: string | null;
        product_cat_id: number | null;
        hsn_code: string | null;
        brand: string | null;
    }) | null>;
    static getProductcategory(id: string): Promise<({
        batchitem: ({
            batch: {
                status: string;
                batch_id: number;
                batch_number: string;
                manufacturing_date: Date | null;
                expiry_date: Date | null;
                location_id: number | null;
            };
        } & {
            product_id: string;
            batch_id: number;
            item_id: number;
            received_quantity: import("@prisma/client-runtime-utils").Decimal;
            available_quantity: import("@prisma/client-runtime-utils").Decimal;
        })[];
        productcategory: {
            description: string | null;
            product_category_id: number;
            category: string | null;
        } | null;
        productprice: {
            product_id: string;
            uom_id: number;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            prod_price_id: number;
            price_type: import("@prisma/client").$Enums.price_type_enum;
            currency: string | null;
            effective_from: Date;
            effective_to: Date | null;
        }[];
        uom: {
            uom_id: number;
            name: string;
            conversion_to_base: import("@prisma/client-runtime-utils").Decimal | null;
        };
    } & {
        product_id: string;
        uom_id: number;
        name: string;
        sku_code: string | null;
        description: string | null;
        product_cat_id: number | null;
        hsn_code: string | null;
        brand: string | null;
    })[]>;
    static updateProduct(id: string, data: any): Promise<{
        product_id: string;
        uom_id: number;
        name: string;
        sku_code: string | null;
        description: string | null;
        product_cat_id: number | null;
        hsn_code: string | null;
        brand: string | null;
    }>;
    static getExpiredStock(): Promise<({
        batch: {
            batch_number: string;
            manufacturing_date: Date | null;
        } | null;
        grn: {
            grn_number: string | null;
            received_date: Date;
        };
        product: {
            name: string;
            sku_code: string | null;
            brand: string | null;
        };
    } & {
        product_id: string;
        uom_id: number;
        batch_id: number | null;
        expiry_date: Date | null;
        remarks: string | null;
        grn_id: number;
        grn_line_id: number;
        received_qty: import("@prisma/client-runtime-utils").Decimal;
        po_line_id: number | null;
    })[]>;
    static deleteProduct(id: string): Promise<{
        product_id: string;
        uom_id: number;
        name: string;
        sku_code: string | null;
        description: string | null;
        product_cat_id: number | null;
        hsn_code: string | null;
        brand: string | null;
    }>;
}
