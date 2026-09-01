import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from "../lib/prisma.js";
import type { User } from "../generated/prisma/client.js";

import { type RegisterDTO } from '../dto/create-user.dto.js';
import { type LoginDTO } from '../dto/login-user.dto.js';
import { type CurrentUserDTO } from '../dto/current-user.dto.js'

type AuthResult = {
    user: Omit<User, "passwordHash">
    accessToken: string
}

interface JwtPayload {
    userId: string;
}

export class AuthService {
    private readonly jwtSecret: string;
    private readonly saltRounds = 10;

    constructor(jwtSecret: string) {
        this.jwtSecret = jwtSecret
    }

    async register(data: RegisterDTO): Promise<AuthResult> {
        const existingUser = await prisma.user.findUnique({
            where: {email: data.email}
        })

        if (existingUser) {
            throw new Error('User is already exist')
        }

        const passwordHash = await bcrypt.hash(data.password, this.saltRounds);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash
            }
        });

        const token = this.generateToken(user.id);

        const { passwordHash: _, ...safeUser } = user;

        return {
            user: safeUser,
            accessToken: token,
        };
    }

    async login(data: LoginDTO): Promise<AuthResult> {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            }
        })

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
            data.password,
            user.passwordHash
        )

        if (!isPasswordValid) {
            throw new Error('Wrong password')
        }

        const token = this.generateToken(user.id)

        const {
            passwordHash: _, ...safeUser 
        } = user

        return {
            user: safeUser,
            accessToken: token
        }
    }

    static verifyToken(token: string): { userId: string } {
        try {
            return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        } catch {
            throw new Error('Invalid token')
        }
    }

    private generateToken(userId: string): string {
        return jwt.sign(
        { userId },
        this.jwtSecret,
        { expiresIn: "7d" }
        );
    }

    static async getCurrentUser(
    userId: string,
  ): Promise<CurrentUserDTO | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    return user
  }


}
