import { Router } from 'express';
import { getDistrictsByProvince, getAllDistricts } from '../controllers/district/district.controller.js';
const router = Router();
router.get('/', getDistrictsByProvince);
router.get('/all', getAllDistricts);
export default router;
//# sourceMappingURL=district.route.js.map