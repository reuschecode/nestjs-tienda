import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tienda } from 'src/entities/tienda.entity';
import { TiendaService } from './tienda.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tienda])],
  providers: [TiendaService],
  exports: [TiendaService]
})
export class TiendaModule { }
