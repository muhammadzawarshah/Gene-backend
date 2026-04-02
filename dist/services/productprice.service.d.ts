export declare class ProductPriceService {
    static getAllProductPrices(): Promise<({
        product: {
            product_id: string;
            name: string;
            sku_code: string | null;
        };
        tax: {
            tax_id: number;
            name: string;
            rate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
        uom: {
            uom_id: number;
            name: string;
        };
    } & {
        product_id: string;
        uom_id: number;
        unit_price: import("@prisma/client-runtime-utils").Decimal;
        tax_id: number | null;
        prod_price_id: number;
        price_type: import("@prisma/client").$Enums.price_type_enum;
        currency: string | null;
        effective_from: Date;
        effective_to: Date | null;
    })[]>;
    static getPricesByProductId(productId: string): Promise<({
        tax: {
            tax_id: number;
            name: string;
            rate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
        uom: {
            uom_id: number;
            name: string;
        };
    } & {
        product_id: string;
        uom_id: number;
        unit_price: import("@prisma/client-runtime-utils").Decimal;
        tax_id: number | null;
        prod_price_id: number;
        price_type: import("@prisma/client").$Enums.price_type_enum;
        currency: string | null;
        effective_from: Date;
        effective_to: Date | null;
    })[]>;
    static getProductPriceById(id: number): Promise<({
        product: {
            product_id: string;
            name: string;
            sku_code: string | null;
        };
        tax: {
            tax_id: number;
            name: string;
            rate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
        uom: {
            uom_id: number;
            name: string;
        };
    } & {
        product_id: string;
        uom_id: number;
        unit_price: import("@prisma/client-runtime-utils").Decimal;
        tax_id: number | null;
        prod_price_id: number;
        price_type: import("@prisma/client").$Enums.price_type_enum;
        currency: string | null;
        effective_from: Date;
        effective_to: Date | null;
    }) | null>;
    static createProductPrice(data: any): Promise<{
        product: {
            product_id: string;
            name: string;
            sku_code: string | null;
        };
        tax: {
            tax_id: number;
            name: string;
            rate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
        uom: {
            uom_id: number;
            name: string;
        };
    } & {
        product_id: string;
        uom_id: number;
        unit_price: import("@prisma/client-runtime-utils").Decimal;
        tax_id: number | null;
        prod_price_id: number;
        price_type: import("@prisma/client").$Enums.price_type_enum;
        currency: string | null;
        effective_from: Date;
        effective_to: Date | null;
    }>;
    static updateProductPrice(id: number, data: any): Promise<{
        product: {
            product_id: string;
            name: string;
            sku_code: string | null;
        };
        tax: {
            tax_id: number;
            name: string;
            rate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
        uom: {
            uom_id: number;
            name: string;
        };
    } & {
        product_id: string;
        uom_id: number;
        unit_price: import("@prisma/client-runtime-utils").Decimal;
        tax_id: number | null;
        prod_price_id: number;
        price_type: import("@prisma/client").$Enums.price_type_enum;
        currency: string | null;
        effective_from: Date;
        effective_to: Date | null;
    }>;
    static deleteProductPrice(id: number): Promise<{
        product_id: string;
        uom_id: number;
        unit_price: import("@prisma/client-runtime-utils").Decimal;
        tax_id: number | null;
        prod_price_id: number;
        price_type: import("@prisma/client").$Enums.price_type_enum;
        currency: string | null;
        effective_from: Date;
        effective_to: Date | null;
    }>;
    static getActivePrice(productId: string, priceType: string): Promise<{
        product: {
            name: string;
        };
        tax: {
            tax_id: number;
            name: string;
            rate: import("@prisma/client-runtime-utils").Decimal | null;
        } | null;
        uom: {
            uom_id: number;
            name: string;
        };
    } & {
        product_id: string;
        uom_id: number;
        unit_price: import("@prisma/client-runtime-utils").Decimal;
        tax_id: number | null;
        prod_price_id: number;
        price_type: import("@prisma/client").$Enums.price_type_enum;
        currency: string | null;
        effective_from: Date;
        effective_to: Date | null;
    }>;
}
