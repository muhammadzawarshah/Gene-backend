import { prisma } from '../lib/prisma.js';
import { source_doctype_enum } from "@prisma/client";
export class DeliveryService {
    async processDelivery(soId, warehouseId) {
        return await prisma.$transaction(async (tx) => {
            const orderLines = await tx.salesorderline.findMany({
                where: { so_id: soId },
                include: { product: true }
            });
            const delivery = await tx.deliverynote.create({
                data: {
                    delv_note_id: Math.floor(Date.now() / 1000),
                    so_id: soId,
                    delv_date: new Date(),
                    status: 'POSTED',
                }
            });
            for (const line of orderLines) {
                const availableBatchItem = await tx.batchitem.findFirst({
                    where: { product_id: line.product_id, available_quantity: { gte: line.quantity } },
                    include: { batch: true },
                    orderBy: { batch: { manufacturing_date: 'asc' } }
                });
                const availableBatch = availableBatchItem?.batch ?? null;
                await tx.stockitem.update({
                    where: {
                        product_id_warehouse_id: {
                            product_id: line.product_id,
                            warehouse_id: warehouseId
                        }
                    },
                    data: {
                        quantity_on_hand: { decrement: line.quantity },
                        reserved_quantity: { decrement: line.quantity }
                    }
                });
                await tx.stockmovement.create({
                    data: {
                        stock_mov_id: Math.floor(Date.now() / 1000),
                        mov_type: 'OUTBOUND',
                        source_doctype: source_doctype_enum.SALE_ORDER,
                        product_id: line.product_id,
                        warehouse_from_id: warehouseId,
                        quantity: line.quantity,
                        uom_id: line.uom_id,
                        batch_id: availableBatch?.batch_id,
                        posted_at: new Date()
                    }
                });
            }
            return delivery;
        });
    }
}
//# sourceMappingURL=DeliveryService.js.map