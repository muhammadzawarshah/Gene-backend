export declare class DeliveryService {
    static shipOrder(soId: number, warehouseId: number, discount: string, transportCharges: string, totalAmount: string, products: any[]): Promise<{
        status: string | null;
        so_id: number | null;
        discount: string | null;
        delv_note_id: number;
        delivery_number: string | null;
        delv_date: Date;
        delivered_by: string | null;
        transportcharges: string | null;
        nettotal: string | null;
    }>;
    static deliverylist(): Promise<({
        deliverynoteline: ({
            batch: {
                status: string;
                batch_id: number;
                batch_number: string;
                manufacturing_date: Date | null;
                expiry_date: Date | null;
                location_id: number | null;
            } | null;
            product: {
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
            } & {
                product_id: string;
                uom_id: number;
                name: string;
                sku_code: string | null;
                description: string | null;
                product_cat_id: number | null;
                hsn_code: string | null;
                brand: string | null;
            };
            uom: {
                uom_id: number;
                name: string;
                conversion_to_base: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            product_id: string;
            uom_id: number;
            batch_id: number | null;
            delv_note_id: number;
            delv_note_line_id: number;
            delivered_qty: import("@prisma/client-runtime-utils").Decimal;
            so_line_id: number | null;
            remarks: string | null;
        })[];
        salesorder: ({
            party: {
                party_id: string;
                user_id: number | null;
                email: string | null;
                tax_id: number | null;
                name: string;
                type: import("@prisma/client").$Enums.party_enum;
                phone: string | null;
            };
        } & {
            party_id_customer: string;
            total_amount: import("@prisma/client-runtime-utils").Decimal | null;
            status: import("@prisma/client").$Enums.purchase_order_enum;
            so_id: number;
            order_date: Date;
            expected_del_date: Date | null;
        }) | null;
    } & {
        status: string | null;
        so_id: number | null;
        discount: string | null;
        delv_note_id: number;
        delivery_number: string | null;
        delv_date: Date;
        delivered_by: string | null;
        transportcharges: string | null;
        nettotal: string | null;
    })[]>;
    static updateDelivery(delvNoteId: number, lines: any[], remarks?: string): Promise<{
        status: string | null;
        so_id: number | null;
        discount: string | null;
        delv_note_id: number;
        delivery_number: string | null;
        delv_date: Date;
        delivered_by: string | null;
        transportcharges: string | null;
        nettotal: string | null;
    }>;
    static getDeliveryDetails(id: string): Promise<({
        deliverynoteline: ({
            batch: {
                status: string;
                batch_id: number;
                batch_number: string;
                manufacturing_date: Date | null;
                expiry_date: Date | null;
                location_id: number | null;
            } | null;
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
            salesorderline: {
                tax: {
                    name: string;
                    type: string;
                    rate: import("@prisma/client-runtime-utils").Decimal | null;
                } | null;
                unit_price: import("@prisma/client-runtime-utils").Decimal;
                line_total: import("@prisma/client-runtime-utils").Decimal;
            } | null;
            uom: {
                uom_id: number;
                name: string;
                conversion_to_base: import("@prisma/client-runtime-utils").Decimal | null;
            };
        } & {
            product_id: string;
            uom_id: number;
            batch_id: number | null;
            delv_note_id: number;
            delv_note_line_id: number;
            delivered_qty: import("@prisma/client-runtime-utils").Decimal;
            so_line_id: number | null;
            remarks: string | null;
        })[];
        salesorder: ({
            party: {
                party_id: string;
                user_id: number | null;
                email: string | null;
                tax_id: number | null;
                name: string;
                type: import("@prisma/client").$Enums.party_enum;
                phone: string | null;
            };
        } & {
            party_id_customer: string;
            total_amount: import("@prisma/client-runtime-utils").Decimal | null;
            status: import("@prisma/client").$Enums.purchase_order_enum;
            so_id: number;
            order_date: Date;
            expected_del_date: Date | null;
        }) | null;
    } & {
        status: string | null;
        so_id: number | null;
        discount: string | null;
        delv_note_id: number;
        delivery_number: string | null;
        delv_date: Date;
        delivered_by: string | null;
        transportcharges: string | null;
        nettotal: string | null;
    }) | null>;
}
