import { DeliveryService } from '../../services/delivery.service.js';
export const postDelivery = async (req, res, next) => {
    try {
        const { soId } = req.params;
        const { warehouse_id, discount, transportCharges, totalAmount, products } = req.body;
        console.log(req.body);
        if (!soId || !warehouse_id) {
            return res.status(400).json({
                success: false,
                message: "Sales Order ID and Warehouse ID are required."
            });
        }
        const deliveryNote = await DeliveryService.shipOrder(Number(soId), Number(warehouse_id), discount, transportCharges, totalAmount, products);
        res.status(201).json({
            success: true,
            message: "Delivery processed successfully and stock updated.",
            data: deliveryNote
        });
    }
    catch (error) {
        next(error);
    }
};
export const listDelivery = async (req, res, next) => {
    try {
        const disl = await DeliveryService.deliverylist();
        res.status(200).json({ data: disl });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateDelivery = async (req, res, next) => {
    try {
        const { delv_note_id, lines, status, remarks } = req.body;
        if (!delv_note_id || !lines) {
            return res.status(400).json({ message: "Delivery Note ID and Lines are required" });
        }
        const disl = await DeliveryService.updateDelivery(Number(delv_note_id), lines, remarks);
        res.status(200).json({
            success: true,
            message: "Delivery updated and synchronized successfully",
            data: disl
        });
    }
    catch (error) {
        console.error("Error in updateDelivery Controller:", error);
        next(error);
    }
};
export const getspecificDelivery = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.params);
        const disl = await DeliveryService.getDeliveryDetails(id);
        console.log(disl);
        res.status(200).json({
            success: true,
            message: "Delivery updated and synchronized successfully",
            data: disl
        });
    }
    catch (error) {
        console.error("Error in updateDelivery Controller:", error);
        next(error);
    }
};
//# sourceMappingURL=delivery.controller.js.map