import "dotenv/config";
import { PrismaPg } from '../../node_modules/@prisma/adapter-pg/dist/index.js';
export declare const prisma: import("@prisma/client/runtime/client").DynamicClientExtensionThis<import("@prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/client").InternalArgs & {
    result: {};
    model: {};
    query: {};
    client: {};
}, {}>, import("@prisma/client").Prisma.TypeMapCb<{
    adapter: PrismaPg;
}>, {
    result: {};
    model: {};
    query: {};
    client: {};
}>;
