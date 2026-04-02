import { prisma } from '../lib/prisma.js';
export class ProvinceService {
    static async createProvince(data) {
        return await prisma.province.create({
            data: {
                province_id: data.id,
                name: data.name
            }
        });
    }
    static async listProvinces() {
        return await prisma.province.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: { select: { warehouse: true } }
            }
        });
    }
    static async deleteProvince(id) {
        const linkedWarehouses = await prisma.warehouse.count({ where: { location: id } });
        if (linkedWarehouses > 0) {
            throw new Error("CANNOT_DELETE: This province is linked to active warehouses.");
        }
        return await prisma.province.delete({ where: { province_id: id } });
    }
}
//# sourceMappingURL=province.service.js.map