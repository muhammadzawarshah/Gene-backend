import { SalesService } from '../../services/sales.service.js';
export const createSalesOrder = async (req, res, next) => {
    try {
        console.log(req.body);
        const order = await SalesService.createOrder(req.body);
        res.status(201).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
export const createCusOrder = async (req, res, next) => {
    try {
        const order = await SalesService.createCusOrder(req.body);
        res.status(201).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
export const listsales = async (req, res, next) => {
    try {
        const order = await SalesService.listorder();
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
export const specificsales = async (req, res, next) => {
    try {
        console.log(req.params);
        const id = req.params.id;
        const order = await SalesService.getSalesOrderById(id);
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
export const listcustsales = async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await SalesService.listcustorder(String(id));
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        next(error);
    }
};
export const getDashboardStats = async (req, res) => {
    try {
        const { id } = req.params;
        const stats = await SalesService.getDashboardOverview(id);
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getFinancialLedger = async (req, res) => {
    try {
        const { id } = req.params;
        const ledger = await SalesService.getFinancialLedger(id);
        return res.status(200).json(ledger);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getBillingSyncStatus = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Secure Node ID (User ID) is required."
            });
        }
        const data = await SalesService.getBillingSyncStatus(String(id));
        return res.status(200).json({
            success: true,
            ...data
        });
    }
    catch (error) {
        console.error("Billing Sync Controller Error:", error);
        if (error.message === "PARTY_NOT_FOUND") {
            return res.status(404).json({ message: "Identity verification failed for this node." });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Encryption Error",
            error: error.message
        });
    }
};
export const updateSalesOrder = async (req, res, next) => {
    try {
        console.log(req.body);
        const orderId = Number(req.params.id);
        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Valid Order ID is required"
            });
        }
        const updatedOrder = await SalesService.updateOrder(orderId, req.body);
        return res.status(200).json({
            success: true,
            data: updatedOrder
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=sales.controller.js.map