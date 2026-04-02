import { UserService } from '../../services/user.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'virtue_os_secret_2026';
export class UserController {
    static async register(req, res) {
        try {
            const user = await UserService.register(req.body);
            const userResponse = {
                id: user.user_id,
                email: user.email,
                role: user.role
            };
            return res.status(201).json({
                message: "User registered successfully",
                user: userResponse
            });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    static async login(req, res) {
        try {
            console.log("Login Attempt for:", req.body.email);
            const { email, password } = req.body;
            const user = await UserService.validateUser(email);
            if (!user) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({
                    id: user.user_id,
                    email: user.email,
                    role: user.role
                }, JWT_SECRET, { expiresIn: '7d' });
                return res.status(200).json({
                    success: true,
                    message: "successful",
                    token: token,
                    user: {
                        id: user.user_id,
                        useremail: user.email,
                        role: user.role
                    }
                });
            }
            else {
                return res.status(401).json({ error: "Invalid credentials" });
            }
        }
        catch (error) {
            console.error("Controller Error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
    static async listAll(_req, res) {
        try {
            const users = await UserService.getAll();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async updatePartner(req, res) {
        try {
            const id = req.params.id;
            const updatedUser = await UserService.update(Number(id), req.body);
            res.status(200).json(updatedUser);
        }
        catch (error) {
            console.error("Update Error:", error);
            res.status(500).json({ message: "Failed to update network node" });
        }
    }
    static async getuser(req, res) {
        try {
            const id = req.params.id;
            const updatedUser = await UserService.getuserbyid(Number(id));
            res.status(200).json(updatedUser);
        }
        catch (error) {
            console.error("Update Error:", error);
            res.status(500).json({ message: "Failed to update network node" });
        }
    }
    static async updateProfile(req, res) {
        try {
            const id = req.params.id;
            const { username } = req.body;
            const updated = await UserService.update(Number(id), { username });
            res.status(200).json({ success: true, data: updated });
        }
        catch (error) {
            console.error('Profile Update Error:', error);
            res.status(500).json({ message: 'Failed to update profile' });
        }
    }
    static async changePassword(req, res) {
        try {
            const id = req.params.id;
            const { currentPassword, newPassword } = req.body;
            if (!currentPassword || !newPassword) {
                return res.status(400).json({ message: 'Current and new password are required' });
            }
            await UserService.changePassword(Number(id), currentPassword, newPassword);
            res.status(200).json({ success: true, message: 'Password updated successfully' });
        }
        catch (error) {
            if (error.message === 'CURRENT_PASSWORD_WRONG') {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }
            res.status(500).json({ message: 'Failed to change password' });
        }
    }
}
//# sourceMappingURL=user.controller.js.map