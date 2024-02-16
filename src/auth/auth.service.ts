import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user/userDTO';
import { AmbiensaUser } from 'src/users/models';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(
    user: AmbiensaUser,
  ): Promise<object> {
    return {
      token: this.jwtService.sign({
        user: {
          ...user,
        },
      }),
    };
  }

  async getUser(
    data: UserDto,
  ): Promise<AmbiensaUser> {
    let user: AmbiensaUser;
    try {
      user = {
        clave: "Hola-123",
        email: "prueba@ambiensa.com",
        nombres: "Prueba Ambiensa",
        usuario: "ambiensa"
      };
      if (user) {
        const passwordMatch = await this.comparePasswords(
          data.clave.trim(),
          user.clave.trim(),
        );
        if (passwordMatch) {
          user.usuario = user.usuario.trim();
          delete user.clave;
          return user;
        } else {
          throw new HttpException(
            'Usuario no autorizado. Verifique usuario y contraseña',
            HttpStatus.FORBIDDEN,
          );
        }
      }
    } catch (error) {
      throw new HttpException(
        'Usuario no autorizado. Verifique usuario y contraseña',
        HttpStatus.FORBIDDEN,
      );
    }
    if (user === null) {
      throw new HttpException(
        'Usuario no autorizado. Verifique usuario y contraseña',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async obtenerTokenAcceso(oAuth2Client: any): Promise<string> {
    const tokenInfo = await oAuth2Client.getAccessToken();
    // Verificar si el token está próximo a expirar (por ejemplo, en los próximos 5 minutos)
    if (tokenInfo.expiry_date - Date.now() < 5 * 60 * 1000) {
      // Refrescar el token si está próximo a expirar
      const newTokenInfo = await oAuth2Client.refreshAccessToken();
      return newTokenInfo.token;
    }
    return tokenInfo.token;
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    // Verificar si la contraseña almacenada está hasheada

    const isHashed = /^\$2[ayb]\$[0-9]{2}\$.{53}$/.test(hashedPassword);

    if (!isHashed) {
      // La contraseña almacenada no está hasheada, realizar una comparación directa
      return plainTextPassword.toString() === hashedPassword.toString();
    }

    // La contraseña almacenada está hasheada, utilizar bcrypt para compararlas
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
