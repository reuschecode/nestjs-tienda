import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumentoIdentificacion } from 'src/entities/tipo-documento-identificacion.entity';
import { TipoDocumentoIdentificacionService } from './tipo-documento-identificacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumentoIdentificacion])],
  providers: [TipoDocumentoIdentificacionService],
  exports: [TipoDocumentoIdentificacionService]
})
export class TipoDocumentoIdentificacionModule { }
