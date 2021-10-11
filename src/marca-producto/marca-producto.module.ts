import { Module } from '@nestjs/common';
import { MarcaProductoService } from './marca-producto.service';
import { MarcaProductoController } from './marca-producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcaProducto } from 'src/entities/marca-producto.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MarcaProducto]), AuthModule],
  providers: [MarcaProductoService],
  controllers: [MarcaProductoController]
})
export class MarcaProductoModule { }
