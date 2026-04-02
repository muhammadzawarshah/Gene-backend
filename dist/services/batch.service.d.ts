export declare class BatchService {
    static listBatches(): Promise<({
        batchitem: ({
            product: {
                product_id: string;
                name: string;
                sku_code: string | null;
            };
        } & {
            product_id: string;
            batch_id: number;
            item_id: number;
            received_quantity: import("@prisma/client-runtime-utils").Decimal;
            available_quantity: import("@prisma/client-runtime-utils").Decimal;
        })[];
        province: {
            name: string | null;
            province_id: number;
        } | null;
    } & {
        status: string;
        batch_id: number;
        batch_number: string;
        manufacturing_date: Date | null;
        expiry_date: Date | null;
        location_id: number | null;
    })[]>;
    static getBatchById(id: number): Promise<({
        batchitem: ({
            product: {
                product_id: string;
                name: string;
                sku_code: string | null;
            };
        } & {
            product_id: string;
            batch_id: number;
            item_id: number;
            received_quantity: import("@prisma/client-runtime-utils").Decimal;
            available_quantity: import("@prisma/client-runtime-utils").Decimal;
        })[];
        province: {
            name: string | null;
            province_id: number;
        } | null;
    } & {
        status: string;
        batch_id: number;
        batch_number: string;
        manufacturing_date: Date | null;
        expiry_date: Date | null;
        location_id: number | null;
    }) | null>;
    static createBatch(data: {
        batch_number: string;
        manufacturing_date?: string;
        expiry_date?: string;
        status?: string;
        location_id?: number;
        items: {
            product_id: string;
            received_quantity: number;
            available_quantity: number;
        }[];
    }): Promise<{
        batchitem: ({
            product: {
                product_id: string;
                name: string;
                sku_code: string | null;
            };
        } & {
            product_id: string;
            batch_id: number;
            item_id: number;
            received_quantity: import("@prisma/client-runtime-utils").Decimal;
            available_quantity: import("@prisma/client-runtime-utils").Decimal;
        })[];
        province: {
            name: string | null;
            province_id: number;
        } | null;
    } & {
        status: string;
        batch_id: number;
        batch_number: string;
        manufacturing_date: Date | null;
        expiry_date: Date | null;
        location_id: number | null;
    }>;
    static updateBatch(id: number, data: {
        batch_number?: string;
        manufacturing_date?: string;
        expiry_date?: string;
        status?: string;
        location_id?: number;
        items?: {
            product_id: string;
            received_quantity: number;
            available_quantity: number;
        }[];
    }): Promise<{
        batchitem: ({
            product: {
                product_id: string;
                name: string;
                sku_code: string | null;
            };
        } & {
            product_id: string;
            batch_id: number;
            item_id: number;
            received_quantity: import("@prisma/client-runtime-utils").Decimal;
            available_quantity: import("@prisma/client-runtime-utils").Decimal;
        })[];
        province: {
            name: string | null;
            province_id: number;
        } | null;
    } & {
        status: string;
        batch_id: number;
        batch_number: string;
        manufacturing_date: Date | null;
        expiry_date: Date | null;
        location_id: number | null;
    }>;
    static deleteBatch(id: number): Promise<{
        status: string;
        batch_id: number;
        batch_number: string;
        manufacturing_date: Date | null;
        expiry_date: Date | null;
        location_id: number | null;
    }>;
}
