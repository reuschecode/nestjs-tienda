import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from 'src/entities/empresa.entity';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  providers: [EmpresaService],
  exports: [EmpresaService]
})
export class EmpresaModule { }
