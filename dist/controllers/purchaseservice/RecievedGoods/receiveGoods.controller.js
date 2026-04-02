import { GrnService } from '../../../services/grn.service.js';
import mqEmitter from '../../../utils/eventEmitter.js';
export const receiveGoods = async (req, res, next) => {
    try {
        console.log(req.body);
        const { poId, warehouseId, items, discount, transportCharges, netTotal } = req.body;
        if (!poId || !warehouseId || !items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "PO ID, Warehouse ID, and Items list are required."
            });
        }
        const grn = await GrnService.processGRN(poId, warehouseId, items, discount, transportCharges, netTotal);
        mqEmitter.emit('GRN_COMPLETED', {
            grnId: grn.grn_id,
            timestamp: new Date()
        });
        res.status(201).json({
            success: true,
            message: "Goods Received Note (GRN) created successfully. Inventory updated.",
            data: grn
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const listgrn = async (req, res, next) => {
    try {
        const grn = await GrnService.listgrn();
        res.status(200).send(grn);
    }
    catch (error) {
        next(error);
    }
};
export const getSingleGRN = async (req, res, next) => {
    try {
        const { id } = req.params;
        const grn = await GrnService.getGRNById(id);
        if (!grn) {
            return res.status(404).json({
                success: false,
                message: "GRN not found!"
            });
        }
        res.status(200).json({
            success: true,
            data: grn
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=receiveGoods.controller.js.map