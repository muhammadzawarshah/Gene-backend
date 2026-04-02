import { Router } from 'express';
import { BatchController } from '../controllers/batch/batch.controller.js';
const router = Router();
router.get('/', BatchController.list);
router.get('/:id', BatchController.getOne);
router.post('/', BatchController.create);
router.put('/:id', BatchController.update);
router.delete('/:id', BatchController.remove);
export default router;
//# sourceMappingURL=batch.route.js.map