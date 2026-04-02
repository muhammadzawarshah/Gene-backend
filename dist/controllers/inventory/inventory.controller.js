import { InventoryService } from '../../services/inventory.service.js';
export class InventoryController {
    static async getLedger(req, res, next) {
        try {
            const data = await InventoryService.getStockLedger();
            res.status(200).json(data);
        }
        catch (error) {
            console.error("Ledger Error:", error);
            res.status(500).json({ success: false, message: "Handshake Failed" });
        }
    }
    static async deleteEntry(req, res) {
        res.status(200).json({ success: true, message: "Entry Purged from UI" });
    }
}
//# sourceMappingURL=inventory.controller.js.map