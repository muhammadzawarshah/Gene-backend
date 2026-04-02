import { prisma } from '../lib/prisma.js';
export class DeliveryService {
    static async shipOrder(soId, warehouseId, discount, transportCharges, totalAmount, products) {
        return await prisma.$transaction(async (tx) => {
            const orderLines = await tx.salesorderline.findMany({
                where: { so_id: Number(soId) }
            });
            if (!orderLines || orderLines.length === 0) {
                throw new Error("Sales Order has no items in database.");
            }
            const today = new Date();
            const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
            const lastDelivery = await tx.deliverynote.findFirst({
                where: { delivery_number: { startsWith: `DN-${dateStr}` } },
                orderBy: { delivery_number: 'desc' }
            });
            let nextSeq = "001";
            if (lastDelivery && lastDelivery.delivery_number) {
                const parts = lastDelivery.delivery_number.split('-');
                if (parts.length === 3) {
                    const lastSeq = parseInt(parts[2]);
                    nextSeq = (lastSeq + 1).toString().padStart(3, '0');
                }
            }
            const deliveryNumber = `DN-${dateStr}-${nextSeq}`;
            const delivery = await tx.deliverynote.create({
                data: {
                    so_id: Number(soId),
                    delivery_number: deliveryNumber,
                    delv_date: today,
                    status: 'POSTED',
                    discount: String(discount || "0"),
                    transportcharges: String(transportCharges || "0"),
                    nettotal: String(totalAmount || "0"),
                }
            });
            for (const line of orderLines) {
                const matchedProduct = (products || []).find(p => String(p.product_id) === String(line.product_id) || String(p.id) === String(line.product_id));
                let finalBatchId = null;
                if (matchedProduct) {
                    const selectedBatchNumber = matchedProduct.batch;
                    const batchData = (matchedProduct.batchOptions || []).find((b) => String(b.batch_number) === String(selectedBatchNumber));
                    if (batchData) {
                        finalBatchId = Number(batchData.batch_id);
                    }
                }
                const existingStock = await tx.stockitem.findUnique({
                    where: {
                        product_id_warehouse_id: {
                            product_id: line.product_id,
                            warehouse_id: Number(warehouseId)
                        }
                    }
                });
                if (!existingStock) {
                    throw new Error(`Stock record not found for Product ID: ${line.product_id}`);
                }
                await tx.deliverynoteline.create({
                    data: {
                        delv_note_id: delivery.delv_note_id,
                        product_id: line.product_id,
                        delivered_qty: line.quantity,
                        uom_id: line.uom_id,
                        batch_id: finalBatchId,
                        so_line_id: line.so_line_id,
                        remarks: "Shipped from warehouse"
                    }
                });
                await tx.stockitem.update({
                    where: {
                        product_id_warehouse_id: {
                            product_id: line.product_id,
                            warehouse_id: Number(warehouseId)
                        }
                    },
                    data: {
                        quantity_on_hand: { decrement: line.quantity },
                        reserved_quantity: { decrement: line.quantity }
                    }
                });
                await tx.stockmovement.create({
                    data: {
                        mov_type: 'OUTBOUND',
                        source_doctype: 'SALE_ORDER',
                        product_id: line.product_id,
                        warehouse_from_id: Number(warehouseId),
                        quantity: line.quantity,
                        uom_id: line.uom_id,
                        posted_at: new Date()
                    }
                });
            }
            return delivery;
        });
    }
    static async deliverylist() {
        return prisma.deliverynote.findMany({
            include: {
                salesorder: {
                    include: {
                        party: true
                    }
                },
                deliverynoteline: {
                    include: {
                        product: {
                            include: {
                                productprice: true
                            }
                        },
                        uom: true,
                        batch: true
                    },
                },
            },
            orderBy: { delv_date: 'desc' }
        });
    }
    static async updateDelivery(delvNoteId, lines, remarks) {
        return await prisma.$transaction(async (tx) => {
            for (const line of lines) {
                await tx.deliverynoteline.update({
                    where: { delv_note_line_id: line.delv_note_line_id },
                    data: {
                        delivered_qty: Number(line.delivered_qty),
                        remarks: line.remarks || remarks
                    }
                });
            }
            const updatedDelivery = await tx.deliverynote.update({
                where: { delv_note_id: delvNoteId },
                data: {
                    status: 'COMPLETED',
                    delivered_by: 'SYSTEM_SYNC'
                }
            });
            return updatedDelivery;
        });
    }
    static async getDeliveryDetails(id) {
        return prisma.deliverynote.findFirst({
            where: { delivery_number: id },
            include: {
                salesorder: { include: { party: true } },
                deliverynoteline: {
                    include: {
                        product: true,
                        uom: true,
                        batch: true,
                        salesorderline: {
                            select: {
                                unit_price: true,
                                line_total: true,
                                tax: { select: { name: true, rate: true, type: true } }
                            }
                        }
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=delivery.service.js.map