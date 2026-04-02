import { ReportService } from '../../services/report.service.js';
export const getInventoryDashboard = async (req, res, next) => {
    try {
        const data = await ReportService.getStockSummary();
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
};
export const getFinancialReport = async (req, res, next) => {
    try {
        const { start, end } = req.query;
        const data = await ReportService.getSalesReport(new Date(start), new Date(end));
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=report.controller.js.map