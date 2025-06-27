import { Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ResponseTypedApis } from 'src/common/interfaces/api-response-typed.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ApiResponseDataHelper } from 'src/common/helpers/api-response-data.helper';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async login(userObject: LoginAuthDto): Promise<ResponseTypedApis | any> {
    const { username, password } = userObject;

    const alias = this.userRepository.metadata.tableName.toLowerCase();
    const user = await this.userRepository.createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.role`, 'role')
      .where(`${alias}.status = :state`, { state: true })
      .andWhere(`${alias}.username = :username`, { username })
      .getOne();

    if (!user) return ApiResponseDataHelper.sendNotFound();

    const encrypted = await this.encryptPasword(password);

    if (encrypted !== user.password) return ApiResponseDataHelper.sendError('Contraseña incorrecta');

    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
    });

    return ApiResponseDataHelper.sendSuccess({token}, `Bienvenido, ${user.names}. Inicio exitoso.`);
  }

  async encryptPasword(text: string): Promise<string> {
    const algorithm = 'aes-256-ecb';
    const encryptionKey = process.env.ENCRYPTION_KEY ?? '';
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), null);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
}
