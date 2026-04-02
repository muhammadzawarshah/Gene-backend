import { prisma } from '../lib/prisma.js';
export class StockService {
    static async reserveStock(tx, productId, warehouseId, qty) {
        const stock = await tx.stockitem.findUnique({
            where: { product_id_warehouse_id: { product_id: productId, warehouse_id: warehouseId } }
        });
        if (!stock || (Number(stock.quantity_on_hand) - Number(stock.reserved_quantity) < qty)) {
            throw new Error(`Stock not available for Product: ${productId}`);
        }
        return await tx.stockitem.update({
            where: { stock_item_id: stock.stock_item_id },
            data: { reserved_quantity: { increment: qty } }
        });
    }
    static async getWarehouseStock(warehouseId) {
        return await prisma.stockitem.findMany({
            where: {
                warehouse_id: warehouseId,
            },
            include: {
                product: {
                    include: {
                        uom: true,
                        productprice: true,
                    },
                },
            },
        });
    }
    static async recordMovement(tx, data) {
        return await tx.stockmovement.create({
            data: {
                mov_type: data.mov_type,
                product_id: data.product_id,
                uom_id: data.uom_id,
                quantity: data.quantity,
                warehouse_from_id: data.warehouse_from_id,
                warehouse_to_id: data.warehouse_to_id,
                source_doctype: data.source_doctype,
                source_doc_id: data.source_doc_id,
                batch_id: data.batch_id,
                posted_at: new Date()
            }
        });
    }
}
//# sourceMappingURL=stock.service.js.map