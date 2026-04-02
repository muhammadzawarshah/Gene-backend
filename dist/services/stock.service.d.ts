export declare class StockService {
    static reserveStock(tx: any, productId: string, warehouseId: number, qty: number): Promise<any>;
    static getWarehouseStock(warehouseId: number): Promise<({
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
        };
    } & {
        stock_item_id: number;
        product_id: string;
        warehouse_id: number;
        uom_id: number;
        quantity_on_hand: import("@prisma/client-runtime-utils").Decimal | null;
        reorder_point: import("@prisma/client-runtime-utils").Decimal | null;
        reserved_quantity: import("@prisma/client-runtime-utils").Decimal | null;
    })[]>;
    static recordMovement(tx: any, data: {
        mov_type: 'IN' | 'OUT' | 'TRANSFER' | 'ADJUSTMENT';
        product_id: string;
        uom_id: number;
        quantity: number;
        warehouse_from_id?: number;
        warehouse_to_id?: number;
        source_doctype?: string;
        source_doc_id?: string;
        batch_id?: number;
    }): Promise<any>;
}
