import { Router } from 'express';
import { InventoryController } from '../controllers/inventory/inventory.controller.js';
const router = Router();
router.get('/ledger', InventoryController.getLedger);
router.delete('/ledger/delete/:id', InventoryController.deleteEntry);
export default router;
//# sourceMappingURL=inventory.route.js.map