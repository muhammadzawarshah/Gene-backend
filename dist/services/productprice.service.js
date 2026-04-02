import { prisma } from '../lib/prisma.js';
export class ProductPriceService {
    static async getAllProductPrices() {
        return await prisma.productprice.findMany({
            include: {
                product: {
                    select: { product_id: true, name: true, sku_code: true }
                },
                uom: {
                    select: { uom_id: true, name: true }
                },
                tax: {
                    select: { tax_id: true, name: true, rate: true }
                }
            },
            orderBy: {
                prod_price_id: 'desc'
            }
        });
    }
    static async getPricesByProductId(productId) {
        return await prisma.productprice.findMany({
            where: { product_id: productId },
            include: {
                uom: { select: { uom_id: true, name: true } },
                tax: { select: { tax_id: true, name: true, rate: true } }
            },
            orderBy: { effective_from: 'desc' }
        });
    }
    static async getProductPriceById(id) {
        return await prisma.productprice.findUnique({
            where: { prod_price_id: id },
            include: {
                product: { select: { product_id: true, name: true, sku_code: true } },
                uom: { select: { uom_id: true, name: true } },
                tax: { select: { tax_id: true, name: true, rate: true } }
            }
        });
    }
    static async createProductPrice(data) {
        return await prisma.productprice.create({
            data: {
                product_id: data.product_id,
                price_type: data.price_type,
                currency: data.currency || 'PKR',
                uom_id: parseInt(data.uom_id),
                unit_price: parseFloat(data.unit_price),
                effective_from: new Date(data.effective_from),
                effective_to: data.effective_to ? new Date(data.effective_to) : null,
                tax_id: data.tax_id ? parseInt(data.tax_id) : null,
            },
            include: {
                product: { select: { product_id: true, name: true, sku_code: true } },
                uom: { select: { uom_id: true, name: true } },
                tax: { select: { tax_id: true, name: true, rate: true } }
            }
        });
    }
    static async updateProductPrice(id, data) {
        return await prisma.productprice.update({
            where: { prod_price_id: id },
            data: {
                product_id: data.product_id,
                price_type: data.price_type,
                currency: data.currency,
                uom_id: data.uom_id ? parseInt(data.uom_id) : undefined,
                unit_price: data.unit_price ? parseFloat(data.unit_price) : undefined,
                effective_from: data.effective_from ? new Date(data.effective_from) : undefined,
                effective_to: data.effective_to ? new Date(data.effective_to) : null,
                tax_id: data.tax_id ? parseInt(data.tax_id) : null,
            },
            include: {
                product: { select: { product_id: true, name: true, sku_code: true } },
                uom: { select: { uom_id: true, name: true } },
                tax: { select: { tax_id: true, name: true, rate: true } }
            }
        });
    }
    static async deleteProductPrice(id) {
        return await prisma.productprice.delete({
            where: { prod_price_id: id }
        });
    }
    static async getActivePrice(productId, priceType) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const anyPrice = await prisma.productprice.findFirst({
            where: {
                product_id: productId,
                price_type: priceType,
            },
            orderBy: { effective_from: 'desc' },
            include: {
                product: { select: { name: true } },
                uom: { select: { uom_id: true, name: true } },
                tax: { select: { tax_id: true, name: true, rate: true } }
            }
        });
        if (!anyPrice) {
            throw new Error(`No ${priceType} price entry found for this product. Please add it in Product Price management.`);
        }
        const effectiveFrom = new Date(anyPrice.effective_from);
        effectiveFrom.setHours(0, 0, 0, 0);
        if (effectiveFrom > today) {
            throw new Error(`${priceType} price for "${anyPrice.product?.name}" is not yet effective (starts ${anyPrice.effective_from.toISOString().split('T')[0]}). Please update effective dates in Product Price table.`);
        }
        if (anyPrice.effective_to) {
            const effectiveTo = new Date(anyPrice.effective_to);
            effectiveTo.setHours(0, 0, 0, 0);
            if (effectiveTo < today) {
                throw new Error(`${priceType} price for "${anyPrice.product?.name}" has expired (effective_to: ${anyPrice.effective_to.toISOString().split('T')[0]}). Please update the effective date in Product Price table.`);
            }
        }
        return anyPrice;
    }
}
//# sourceMappingURL=productprice.service.js.map