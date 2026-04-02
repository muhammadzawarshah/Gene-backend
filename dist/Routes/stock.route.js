import { Router } from 'express';
import { StockController } from '../controllers/stocks/stock.controller.js';
const router = Router();
router.get('/warehouse/:warehouseId', StockController.getStockByWarehouse);
router.post('/move', StockController.stockTransfer);
export default router;
//# sourceMappingURL=stock.route.js.map