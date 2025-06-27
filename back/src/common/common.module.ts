import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
    providers: [JwtStrategy]
})
export class CommonModule { }
