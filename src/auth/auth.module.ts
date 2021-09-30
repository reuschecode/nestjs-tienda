import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [UsuariosModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService){
        return {
          secret: config.get("JWT_SECRET"),
          signOptions:{
            expiresIn: "16h"
          }
        }
      }
    }),
  ],//PassportModule.register({session: true})
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
