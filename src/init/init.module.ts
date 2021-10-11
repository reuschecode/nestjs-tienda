import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EmpresaModule } from 'src/empresa/empresa.module';
import { Empresa } from 'src/entities/empresa.entity';
import { Rol } from 'src/entities/rol.entity';
import { Tienda } from 'src/entities/tienda.entity';
import { TipoDocumentoIdentificacion } from 'src/entities/tipo-documento-identificacion.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { RolModule } from 'src/rol/rol.module';
import { TiendaModule } from 'src/tienda/tienda.module';
import { TipoDocumentoIdentificacionModule } from 'src/tipo-documento-identificacion/tipo-documento-identificacion.module';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { InitService } from './init.service';

@Module({
  imports: [EmpresaModule, TiendaModule, UsuariosModule, RolModule, AuthModule, TipoDocumentoIdentificacionModule
  /* TypeOrmModule.forFeature([Empresa, Tienda, Usuario, Rol, TipoDocumentoIdentificacion]) */],
  providers: [InitService]
})
export class InitModule { }
