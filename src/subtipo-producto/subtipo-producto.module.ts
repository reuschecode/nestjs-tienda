import { Module } from '@nestjs/common';
import { SubtipoProductoService } from './subtipo-producto.service';
import { SubtipoProductoController } from './subtipo-producto.controller';
import { SubtipoProducto } from 'src/entities/subtipo-producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SubtipoProducto])],
  providers: [SubtipoProductoService],
  controllers: [SubtipoProductoController]
})
export class SubtipoProductoModule {}
