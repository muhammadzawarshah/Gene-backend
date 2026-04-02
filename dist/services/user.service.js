import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
export class UserService {
    static async register(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        return await prisma.user.create({
            data: {
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
                role: userData.role || 'STAFF',
            },
            select: {
                user_id: true,
                username: true,
                email: true,
                role: true
            }
        });
    }
    static async validateUser(email) {
        return await prisma.user.findUnique({
            where: { email }
        });
    }
    static async getAll() {
        return await prisma.user.findMany({
            select: { user_id: true, username: true, email: true, role: true, is_active: true }
        });
    }
    static async update(id, data) {
        return await prisma.user.update({
            where: { user_id: id },
            data: {
                username: data.username,
                email: data.email,
                is_active: data.is_active,
            },
            select: { user_id: true, username: true, email: true, role: true, is_active: true }
        });
    }
    static async getuserbyid(id) {
        return prisma.user.findUnique({
            where: {
                user_id: id
            },
            select: { user_id: true, username: true, email: true, role: true, is_active: true }
        });
    }
    static async changePassword(id, currentPassword, newPassword) {
        const user = await prisma.user.findUnique({ where: { user_id: id } });
        if (!user)
            throw new Error('User not found');
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch)
            throw new Error('CURRENT_PASSWORD_WRONG');
        const hashed = await bcrypt.hash(newPassword, 10);
        return await prisma.user.update({
            where: { user_id: id },
            data: { password: hashed },
            select: { user_id: true, username: true, email: true, role: true }
        });
    }
}
//# sourceMappingURL=user.service.js.map