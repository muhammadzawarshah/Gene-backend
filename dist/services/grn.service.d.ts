export declare class GrnService {
    static processGRN(poId: number, warehouseId: number, items: any[], discount: string, transportCharges: string, netTotal: number): Promise<{
        status: string | null;
        po_id: number | null;
        discount: string | null;
        transportcharges: string | null;
        nettotal: string | null;
        grn_id: number;
        grn_number: string | null;
        received_date: Date;
        received_by: string | null;
    }>;
    static listgrn(): Promise<({
        grnline: ({
            batch: {
                batch_number: string;
                manufacturing_date: Date | null;
                expiry_date: Date | null;
            } | null;
            product: {
                name: string;
                sku_code: string | null;
            };
            purchaseorderline: {
                tax: {
                    name: string;
                    type: string;
                    rate: import("@prisma/client-runtime-utils").Decimal | null;
                } | null;
                unit_price: import("@prisma/client-runtime-utils").Decimal;
                line_total: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            uom: {
                name: string;
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
        })[];
        purchaseorder: ({
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
        }) | null;
    } & {
        status: string | null;
        po_id: number | null;
        discount: string | null;
        transportcharges: string | null;
        nettotal: string | null;
        grn_id: number;
        grn_number: string | null;
        received_date: Date;
        received_by: string | null;
    })[]>;
    static getGRNById(identifier: string | number): Promise<({
        grnline: ({
            batch: {
                batch_number: string;
                manufacturing_date: Date | null;
                expiry_date: Date | null;
            } | null;
            product: {
                name: string;
                sku_code: string | null;
            };
            purchaseorderline: {
                tax: {
                    name: string;
                    type: string;
                    rate: import("@prisma/client-runtime-utils").Decimal | null;
                } | null;
                unit_price: import("@prisma/client-runtime-utils").Decimal;
                line_total: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            uom: {
                name: string;
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
        })[];
        purchaseorder: ({
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
        }) | null;
    } & {
        status: string | null;
        po_id: number | null;
        discount: string | null;
        transportcharges: string | null;
        nettotal: string | null;
        grn_id: number;
        grn_number: string | null;
        received_date: Date;
        received_by: string | null;
    }) | null>;
}
