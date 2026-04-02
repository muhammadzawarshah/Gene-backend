import mqEmitter from '../utils/eventEmitter.js';
import { prisma } from '../lib/prisma.js';
mqEmitter.on('GRN_COMPLETED', async (payload) => {
    const { grnId } = payload;
    const grnLines = await prisma.grnline.findMany({ where: { grn_id: grnId } });
    for (const line of grnLines) {
        await prisma.$executeRaw `
      INSERT INTO stock_summary_daily (product_id, date, total_received)
      VALUES (${line.product_id}, CURRENT_DATE, ${line.received_qty})
      ON CONFLICT (product_id, date) 
      DO UPDATE SET total_received = stock_summary_daily.total_received + ${line.received_qty}
    `;
    }
    console.log(`[REPORTING WORKER]: Stock Summary updated for GRN ${grnId}`);
});
//# sourceMappingURL=reporting.worker.js.map