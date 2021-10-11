import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Producto } from 'src/entities/producto.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Producto]), AuthModule],
    controllers: [ProductosController],
    providers: [ProductosService]
})
export class ProductosModule { }
