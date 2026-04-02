import { Router } from 'express';
import { FinanceService } from '../services/finance.service.js';
const router = Router();
router.get('/receivables', async (req, res, next) => {
    try {
        const data = await FinanceService.getReceivables();
        res.json(data);
    }
    catch (e) {
        next(e);
    }
});
router.get('/pending-payments', async (req, res, next) => {
    try {
        const data = await FinanceService.getPendingPayments();
        res.json(data);
    }
    catch (e) {
        next(e);
    }
});
router.get('/history', async (req, res, next) => {
    try {
        const data = await FinanceService.getPaymentHistory();
        res.json(data);
    }
    catch (e) {
        next(e);
    }
});
router.post('/verify-payment', async (req, res, next) => {
    try {
        res.json({ success: true, message: "Payment verified" });
    }
    catch (e) {
        next(e);
    }
});
router.post('/reverse-transaction', async (req, res, next) => {
    try {
        res.json({ success: true, message: "Transaction reversed" });
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=accounts.routes.js.map