import { Router } from 'express';
import { ProductPriceController } from '../controllers/productprice/productprice.controller.js';
const router = Router();
router.get('/', ProductPriceController.list);
router.get('/product/:productId', ProductPriceController.listByProduct);
router.get('/lookup', ProductPriceController.lookup);
router.get('/:id', ProductPriceController.getOne);
router.post('/', ProductPriceController.create);
router.put('/:id', ProductPriceController.update);
router.delete('/:id', ProductPriceController.remove);
export default router;
//# sourceMappingURL=productprice.route.js.map