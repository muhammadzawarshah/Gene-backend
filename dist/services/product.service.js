import { prisma } from '../lib/prisma.js';
import { v4 as uuidv4 } from 'uuid';
export class ProductService {
    static async createProduct(data) {
        const batchc = await prisma.batch.findFirst({
            where: {
                batch_number: data.batch_number
            }
        });
        const finalProductId = data.productId || uuidv4();
        return await prisma.product.create({
            data: {
                product_id: finalProductId,
                sku_code: data.sku,
                name: data.name,
                description: data.description,
                product_cat_id: data.category_id ? parseInt(data.category_id) : null,
                uom_id: parseInt(data.unit_id),
                hsn_code: data.hsn_code,
                brand: data.brand_name,
                productprice: {
                    create: [
                        {
                            price_type: 'RETAIL',
                            unit_price: data.product_price,
                            currency: 'PKR',
                            uom_id: parseInt(data.unit_id),
                            effective_from: new Date(),
                        }
                    ]
                }
            }
        });
    }
    static async getAllProducts() {
        const products = await prisma.product.findMany({
            include: {
                uom: true,
                productcategory: true,
                productprice: true,
                _count: {
                    select: { stockitem: true }
                }
            }
        });
        return products;
    }
    static async getProductById(id) {
        return await prisma.product.findUnique({
            where: { product_id: id },
            include: {
                uom: true,
                productcategory: true,
                productprice: {
                    where: { effective_to: null }
                },
                batchitem: { include: { batch: true } }
            }
        });
    }
    static async getProductcategory(id) {
        return await prisma.product.findMany({
            where: {
                product_cat_id: Number(id)
            },
            include: {
                uom: true,
                productcategory: true,
                productprice: {
                    where: { effective_to: null }
                },
                batchitem: { include: { batch: true } }
            }
        });
    }
    static async updateProduct(id, data) {
        return await prisma.product.update({
            where: { product_id: id },
            data: {
                sku_code: data.skuCode,
                name: data.name,
                description: data.description,
                product_cat_id: data.categoryId,
                uom_id: data.uomId,
                hsn_code: data.hsnCode,
                brand: data.brand,
            }
        });
    }
    static async getExpiredStock() {
        const today = new Date();
        return await prisma.grnline.findMany({
            where: {
                expiry_date: {
                    lt: today,
                    not: null
                }
            },
            include: {
                product: {
                    select: {
                        name: true,
                        sku_code: true,
                        brand: true
                    }
                },
                batch: {
                    select: {
                        batch_number: true,
                        manufacturing_date: true
                    }
                },
                grn: {
                    select: {
                        grn_number: true,
                        received_date: true
                    }
                }
            },
            orderBy: {
                expiry_date: 'asc'
            }
        });
    }
    static async deleteProduct(id) {
        return await prisma.$transaction(async (tx) => {
            await tx.productprice.deleteMany({ where: { product_id: id } });
            return await tx.product.delete({ where: { product_id: id } });
        });
    }
}
//# sourceMappingURL=product.service.js.map