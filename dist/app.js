import express from 'express';
import cors from 'cors';
import v1Router from './Routes/index.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', v1Router);
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map