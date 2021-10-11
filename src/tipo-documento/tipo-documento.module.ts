import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumento } from 'src/entities/tipo-documento.entity';
import { TipoDocumentoService } from './tipo-documento.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumento])],
  providers: [TipoDocumentoService],
  exports: [TipoDocumentoService]
})
export class TipoDocumentoModule { }
