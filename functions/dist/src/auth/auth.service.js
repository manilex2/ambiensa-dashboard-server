"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async login(user) {
        return {
            token: this.jwtService.sign({
                user: {
                    ...user,
                },
            }),
        };
    }
    async getUser(data) {
        let user;
        try {
            user = {
                clave: 'Hola-123',
                email: 'prueba@ambiensa.com',
                nombres: 'Prueba Ambiensa',
                usuario: 'ambiensa',
            };
            if (user) {
                const passwordMatch = await this.comparePasswords(data.clave.trim(), user.clave.trim());
                if (passwordMatch) {
                    user.usuario = user.usuario.trim();
                    delete user.clave;
                    return user;
                }
                else {
                    throw new common_1.HttpException('Usuario no autorizado. Verifique usuario y contraseña', common_1.HttpStatus.FORBIDDEN);
                }
            }
        }
        catch (error) {
            throw new common_1.HttpException('Usuario no autorizado. Verifique usuario y contraseña', common_1.HttpStatus.FORBIDDEN);
        }
        if (user === null) {
            throw new common_1.HttpException('Usuario no autorizado. Verifique usuario y contraseña', common_1.HttpStatus.FORBIDDEN);
        }
    }
    async obtenerTokenAcceso(oAuth2Client) {
        const tokenInfo = await oAuth2Client.getAccessToken();
        if (tokenInfo.expiry_date - Date.now() < 5 * 60 * 1000) {
            const newTokenInfo = await oAuth2Client.refreshAccessToken();
            return newTokenInfo.token;
        }
        return tokenInfo.token;
    }
    async comparePasswords(plainTextPassword, hashedPassword) {
        const isHashed = /^\$2[ayb]\$[0-9]{2}\$.{53}$/.test(hashedPassword);
        if (!isHashed) {
            return plainTextPassword.toString() === hashedPassword.toString();
        }
        return bcrypt.compare(plainTextPassword, hashedPassword);
    }
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map