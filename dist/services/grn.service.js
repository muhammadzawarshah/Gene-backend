import { prisma } from '../lib/prisma.js';
export class GrnService {
    static async processGRN(poId, warehouseId, items, discount, transportCharges, netTotal) {
        return await prisma.$transaction(async (tx) => {
            const grn = await tx.grn.create({
                data: {
                    po_id: Number(poId),
                    received_date: new Date(),
                    status: 'COMPLETED',
                    grn_number: `GRN-${Date.now()}`,
                    discount: discount,
                    transportcharges: transportCharges,
                    nettotal: String(netTotal)
                }
            });
            for (const item of items) {
                const qtyToReceive = Number(item.received_qty || item.quantity || 0);
                if (isNaN(qtyToReceive) || qtyToReceive <= 0) {
                    throw new Error(`Invalid quantity for product ${item.product_id}`);
                }
                const bNumber = item.batch_number || `BT-${Date.now()}-${item.product_id.slice(0, 4)}`;
                const batchEntry = await tx.batch.create({
                    data: {
                        batch_number: bNumber,
                        manufacturing_date: item.mfg_date ? new Date(item.mfg_date) : null,
                        expiry_date: item.expiry_date ? new Date(item.expiry_date) : null,
                        status: 'ACTIVE',
                        location_id: Number(warehouseId),
                        batchitem: {
                            create: {
                                product_id: item.product_id,
                                received_quantity: qtyToReceive,
                                available_quantity: qtyToReceive,
                            }
                        }
                    }
                });
                await tx.grnline.create({
                    data: {
                        grn_id: grn.grn_id,
                        product_id: item.product_id,
                        received_qty: qtyToReceive,
                        uom_id: Number(item.uom_id || 1),
                        batch_id: batchEntry.batch_id,
                        po_line_id: item.po_line_id || null,
                        remarks: "Received through automated GRN"
                    }
                });
                await tx.stockitem.upsert({
                    where: {
                        product_id_warehouse_id: {
                            product_id: item.product_id,
                            warehouse_id: Number(warehouseId)
                        }
                    },
                    update: {
                        quantity_on_hand: { increment: qtyToReceive }
                    },
                    create: {
                        product_id: item.product_id,
                        warehouse_id: Number(warehouseId),
                        uom_id: Number(item.uom_id || 1),
                        quantity_on_hand: qtyToReceive,
                        reserved_quantity: 0
                    }
                });
                await tx.stockmovement.create({
                    data: {
                        mov_type: "GRN",
                        product_id: item.product_id,
                        warehouse_to_id: Number(warehouseId),
                        quantity: qtyToReceive,
                        uom_id: Number(item.uom_id || 1),
                        batch_id: batchEntry.batch_id,
                        posted_at: new Date(),
                        source_doctype: "GRN",
                        source_doc_id: "RELATIONSHIP"
                    }
                });
            }
            await tx.purchaseorder.update({
                where: { po_id: Number(poId) },
                data: { status: 'RECIEVED' }
            });
            return grn;
        });
    }
    static async listgrn() {
        return await prisma.grn.findMany({
            include: {
                purchaseorder: {
                    include: {
                        party: {
                            select: {
                                name: true,
                            }
                        }
                    }
                },
                grnline: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                sku_code: true
                            }
                        },
                        batch: {
                            select: {
                                batch_number: true,
                                expiry_date: true,
                                manufacturing_date: true
                            }
                        },
                        uom: {
                            select: {
                                name: true
                            }
                        },
                        purchaseorderline: {
                            select: {
                                unit_price: true,
                                line_total: true,
                                tax: {
                                    select: {
                                        name: true,
                                        rate: true,
                                        type: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                received_date: 'desc'
            }
        });
    }
    static async getGRNById(identifier) {
        const isNumeric = !isNaN(Number(identifier));
        const whereCondition = isNumeric
            ? { grn_id: Number(identifier) }
            : { grn_number: String(identifier) };
        return await prisma.grn.findFirst({
            where: whereCondition,
            include: {
                purchaseorder: {
                    include: {
                        party: { select: { name: true } }
                    }
                },
                grnline: {
                    include: {
                        product: { select: { name: true, sku_code: true } },
                        batch: { select: { batch_number: true, expiry_date: true, manufacturing_date: true } },
                        uom: { select: { name: true } },
                        purchaseorderline: { select: { unit_price: true, line_total: true, tax: { select: { name: true, rate: true, type: true } } } }
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=grn.service.js.map