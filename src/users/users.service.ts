import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user/userDTO';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor() {}
}
