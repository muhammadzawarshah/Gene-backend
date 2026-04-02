import { FinanceService } from '../../services/finance.service.js';
export const postInvoice = async (req, res, next) => {
    try {
        const deliveryId = req.params['deliveryId'];
        const { narration, userId } = req.body;
        const invoice = await FinanceService.createInvoice(deliveryId, narration, userId);
        res.status(201).json({ success: true, data: invoice });
    }
    catch (err) {
        next(err);
    }
};
export const postPayment = async (req, res, next) => {
    try {
        const payment = await FinanceService.processPayment(req.body);
        res.status(201).json({ success: true, data: payment });
    }
    catch (err) {
        next(err);
    }
};
export const grnInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { narration, userId } = req.body;
        const invoice = await FinanceService.createInvoiceFromGRN(Number(id), narration, userId);
        res.status(201).json({ success: true, data: invoice });
    }
    catch (err) {
        next(err);
    }
};
export const getinvoice = async (req, res, next) => {
    try {
        const invoice = await FinanceService.getinvoice();
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const getspecificinvoice = async (req, res, next) => {
    try {
        const invoice = await FinanceService.specificinvoice(Number(req.params.id));
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const getpayments = async (req, res, next) => {
    try {
        const invoice = await FinanceService.payments();
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const getpurchaseinvoices = async (req, res, next) => {
    try {
        const invoice = await FinanceService.purchaseInvoiceList();
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const createpurchasepayment = async (req, res, next) => {
    try {
        const invoice = await FinanceService.processPurchasePayment(req.body);
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const specificpurchaseinvoice = async (req, res, next) => {
    try {
        const invoice = await FinanceService.specificPurchaseInvoice(Number(req.params.id));
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const specificcustomerinvoice = async (req, res, next) => {
    try {
        const invoice = await FinanceService.specificinvoice(Number(req.params.id));
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const getcustomerinvoices = async (req, res, next) => {
    try {
        const invoices = await FinanceService.custinvoice(Number(req.params.id));
        res.status(200).json({ success: true, data: invoices });
    }
    catch (error) {
        next(error);
    }
};
export const specificcustomerpayment = async (req, res, next) => {
    try {
        console.log(req.params);
        const invoice = await FinanceService.custpayment(Number(req.params.id));
        res.status(201).json({ success: true, data: invoice });
    }
    catch (error) {
        next(error);
    }
};
export const getLedger = async (_req, res, next) => {
    try {
        const data = await FinanceService.getLedger();
        res.json({ success: true, data });
    }
    catch (e) {
        next(e);
    }
};
export const getLedgerLines = async (req, res, next) => {
    try {
        const data = await FinanceService.getLedgerLines(Number(req.params['id']));
        res.json({ success: true, data });
    }
    catch (e) {
        next(e);
    }
};
export const getAccountBalances = async (_req, res, next) => {
    try {
        const data = await FinanceService.getAccountBalances();
        res.json({ success: true, data });
    }
    catch (e) {
        next(e);
    }
};
export const getPaymentAllocations = async (_req, res, next) => {
    try {
        const data = await FinanceService.getPaymentAllocations();
        res.json({ success: true, data });
    }
    catch (e) {
        next(e);
    }
};
export const getAccountsDashboard = async (_req, res, next) => {
    try {
        const data = await FinanceService.getAccountsDashboard();
        res.json({ success: true, ...data });
    }
    catch (e) {
        next(e);
    }
};
export const getPartySummary = async (req, res, next) => {
    try {
        const { type } = req.params;
        const summary = await FinanceService.getPartyLedgerSummary(type);
        res.status(200).json(summary);
    }
    catch (err) {
        next(err);
    }
};
export const getPartyLedger = async (req, res, next) => {
    try {
        const partyId = req.params['partyId'];
        const ledger = await FinanceService.getPartyLedgerDetails(partyId);
        res.status(200).json(ledger);
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=finance.controller.js.map