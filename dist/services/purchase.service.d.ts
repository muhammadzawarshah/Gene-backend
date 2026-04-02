export declare class PurchaseService {
    static createPO(data: any): Promise<{
        total_amount: import("@prisma/client-runtime-utils").Decimal | null;
        status: import("@prisma/client").$Enums.purchase_order_enum;
        po_id: number;
        party_id_supplier: string;
        order_date: Date;
        expected_del_date: Date | null;
    }>;
    static purchaselist(): Promise<{
        po: ({
            party: {
                name: string;
            };
        } & {
            total_amount: import("@prisma/client-runtime-utils").Decimal | null;
            status: import("@prisma/client").$Enums.purchase_order_enum;
            po_id: number;
            party_id_supplier: string;
            order_date: Date;
            expected_del_date: Date | null;
        })[];
        pol: {
            product_id: string;
            uom_id: number;
            po_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
            po_line_id: number;
        }[];
    }>;
    static purchaseonpoid(id: string): Promise<{
        po: {
            total_amount: import("@prisma/client-runtime-utils").Decimal | null;
            status: import("@prisma/client").$Enums.purchase_order_enum;
            po_id: number;
            party_id_supplier: string;
            order_date: Date;
            expected_del_date: Date | null;
        } | null;
        pol: ({
            product: {
                product_id: string;
                uom_id: number;
                name: string;
                sku_code: string | null;
                description: string | null;
                product_cat_id: number | null;
                hsn_code: string | null;
                brand: string | null;
            };
        } & {
            product_id: string;
            uom_id: number;
            po_id: number;
            quantity: import("@prisma/client-runtime-utils").Decimal;
            unit_price: import("@prisma/client-runtime-utils").Decimal;
            tax_id: number | null;
            line_total: import("@prisma/client-runtime-utils").Decimal;
            po_line_id: number;
        })[];
    }>;
    static updatePO(poId: number, data: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
