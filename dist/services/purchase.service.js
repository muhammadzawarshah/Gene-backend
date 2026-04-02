import { prisma } from '../lib/prisma.js';
import { ProductPriceService } from './productprice.service.js';
export class PurchaseService {
    static async createPO(data) {
        if (data.items && Array.isArray(data.items)) {
            for (const item of data.items) {
                if (item.price_type && item.product_id) {
                    await ProductPriceService.getActivePrice(item.product_id, item.price_type);
                }
            }
        }
        return await prisma.purchaseorder.create({
            data: {
                party_id_supplier: data.supplierId,
                order_date: new Date(),
                status: 'DRAFT',
                total_amount: data.totalAmount,
                purchaseorderline: {
                    create: data.items.map((item) => ({
                        product_id: item.productId || item.product_id,
                        quantity: item.quantity || item.total_unit,
                        uom_id: item.uomId || item.uom_id || 1,
                        unit_price: item.unitPrice || item.approved_rate,
                        line_total: (item.quantity || item.total_unit) * (item.unitPrice || item.approved_rate)
                    }))
                }
            }
        });
    }
    static async purchaselist() {
        const po = await prisma.purchaseorder.findMany({
            include: {
                party: {
                    select: {
                        name: true
                    }
                }
            }
        });
        const pol = await prisma.purchaseorderline.findMany();
        return {
            po, pol
        };
    }
    static async purchaseonpoid(id) {
        const po = await prisma.purchaseorder.findUnique({
            where: {
                po_id: Number(id)
            }
        });
        const pol = await prisma.purchaseorderline.findMany({
            where: {
                po_id: Number(id)
            },
            include: {
                product: true
            }
        });
        return {
            po, pol
        };
    }
    static async updatePO(poId, data) {
        return await prisma.$transaction(async (tx) => {
            const existingPO = await tx.purchaseorder.findUnique({
                where: { po_id: Number(poId) },
                include: { purchaseorderline: true }
            });
            if (!existingPO) {
                throw new Error("Purchase Order not found");
            }
            await tx.purchaseorder.update({
                where: { po_id: Number(poId) },
                data: {
                    status: data.status ?? existingPO.status,
                    total_amount: data.financials?.netTotal ?? existingPO.total_amount
                }
            });
            if (data.items && Array.isArray(data.items) && data.items.length > 0) {
                for (const item of data.items) {
                    const existingLine = existingPO.purchaseorderline.find((l) => l.product_id === item.product_id);
                    const newQty = parseFloat(item.total_unit || 0);
                    const newPrice = parseFloat(item.approved_rate || 0);
                    const lineTotal = newQty * newPrice;
                    if (existingLine) {
                        await tx.purchaseorderline.update({
                            where: { po_line_id: existingLine.po_line_id },
                            data: {
                                quantity: newQty,
                                unit_price: newPrice,
                                line_total: lineTotal
                            }
                        });
                    }
                    else {
                        await tx.purchaseorderline.create({
                            data: {
                                po_id: Number(poId),
                                product_id: item.product_id,
                                quantity: newQty,
                                uom_id: Number(item.uom_id) || 1,
                                unit_price: newPrice,
                                line_total: lineTotal
                            }
                        });
                    }
                }
            }
            return { success: true, message: "PO updated successfully" };
        });
    }
}
//# sourceMappingURL=purchase.service.js.map