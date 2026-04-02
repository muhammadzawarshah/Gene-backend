import { WarehouseService } from '../../services/warehouse.service.js';
export const createWarehouse = async (req, res) => {
    try {
        console.log(req.body);
        const { name, locationId, type, districtId } = req.body;
        const result = await WarehouseService.createWarehouse({ name, locationId, type, districtId });
        res.status(201).json({ success: true, data: result });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};
export const getWarehouses = async (_req, res) => {
    try {
        const result = await WarehouseService.listWarehouses();
        res.json({ success: true, data: result });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        await WarehouseService.deleteWarehouse(Number(id));
        res.json({ success: true, message: "Warehouse purged successfully." });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
export const updateWarehouse = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, locationId, type, districtId } = req.body;
        if (!id) {
            return res.status(400).json({ success: false, message: "Warehouse ID is required" });
        }
        const updated = await WarehouseService.updateWarehouse(Number(id), {
            name,
            locationId,
            type,
            districtId
        });
        res.status(200).json({
            success: true,
            message: "Warehouse updated successfully",
            data: updated
        });
    }
    catch (error) {
        console.error("Update Error:", error.message);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update warehouse"
        });
    }
};
//# sourceMappingURL=warehouse.controller.js.map