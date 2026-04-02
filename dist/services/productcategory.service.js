import { prisma } from '../lib/prisma.js';
export class ProductCategoryService {
    static async createCategory(data) {
        console.log(data);
        return await prisma.productcategory.create({
            data: {
                category: data.category,
                description: data.description
            }
        });
    }
    static async getAllProductcategory() {
        const prodcategory = await prisma.productcategory.findMany();
        return prodcategory;
    }
    static async getProductcategoryById(id) {
        return await prisma.productcategory.findUnique({
            where: { product_category_id: Number(id) }
        });
    }
    static async updateProductcategory(id, data) {
        return await prisma.productcategory.update({
            where: { product_category_id: Number(id) },
            data: {
                category: data.category,
                description: data.description
            }
        });
    }
    static async deleteProductcategory(id) {
        return await prisma.productcategory.delete({
            where: { product_category_id: Number(id) }
        });
    }
}
//# sourceMappingURL=productcategory.service.js.map