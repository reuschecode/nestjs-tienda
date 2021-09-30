import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/entities/rol.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosService } from './usuarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Rol])],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
