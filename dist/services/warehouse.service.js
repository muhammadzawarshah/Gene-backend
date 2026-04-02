import { prisma } from '../lib/prisma.js';
export class WarehouseService {
    static async createWarehouse(data) {
        const lastWarehouse = await prisma.warehouse.findFirst({
            orderBy: { warehouse_id: 'desc' },
            select: { warehouse_id: true }
        });
        const nextId = (lastWarehouse?.warehouse_id || 0) + 1;
        console.log(`Creating Warehouse: ${data.name} with ID: ${nextId}`);
        return await prisma.warehouse.create({
            data: {
                warehouse_id: nextId,
                name: data.name,
                location: Number(data.locationId),
                district_id: data.districtId ? Number(data.districtId) : null,
                type: data.type && data.type.trim() !== "" ? data.type : "GENERAL"
            }
        });
    }
    static async listWarehouses() {
        return await prisma.warehouse.findMany({
            include: {
                province: true,
                district: true,
                _count: { select: { stockitem: true } }
            },
            orderBy: { warehouse_id: 'asc' }
        });
    }
    static async updateWarehouse(id, data) {
        const existing = await prisma.warehouse.findUnique({
            where: { warehouse_id: id }
        });
        if (!existing) {
            throw new Error(`Warehouse with ID ${id} not found.`);
        }
        return await prisma.warehouse.update({
            where: { warehouse_id: id },
            data: {
                name: data.name !== undefined ? data.name : existing.name,
                location: data.locationId !== undefined ? Number(data.locationId) : existing.location,
                district_id: data.districtId !== undefined ? Number(data.districtId) : existing.district_id,
                type: data.type !== undefined ? data.type : existing.type
            }
        });
    }
    static async deleteWarehouse(id) {
        const stock = await prisma.stockitem.count({ where: { warehouse_id: id } });
        if (stock > 0)
            throw new Error("WAREHOUSE_NOT_EMPTY");
        return await prisma.warehouse.delete({ where: { warehouse_id: id } });
    }
}
//# sourceMappingURL=warehouse.service.js.map