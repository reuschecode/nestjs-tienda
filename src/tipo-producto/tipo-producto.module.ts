import { Module } from '@nestjs/common';
import { TipoProductoService } from './tipo-producto.service';
import { TipoProductoController } from './tipo-producto.controller';
import { TipoProducto } from 'src/entities/tipo-producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProducto]), AuthModule],
  providers: [TipoProductoService],
  controllers: [TipoProductoController],
})
export class TipoProductoModule { }
