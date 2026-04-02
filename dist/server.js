import app from './app.js';
import { prisma } from './lib/prisma.js';
const PORT = process.env.PORT || 4000;
async function bootstrap() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected successfully');
        app.listen(PORT, () => {
            console.log(`🚀 Distribution Backend running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=server.js.map