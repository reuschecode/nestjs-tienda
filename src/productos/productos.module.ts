import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/entities/producto.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
    imports: [TypeOrmModule.forFeature([Producto])],
    controllers: [ProductosController],
    providers: [ProductosService]
})
export class ProductosModule {}
