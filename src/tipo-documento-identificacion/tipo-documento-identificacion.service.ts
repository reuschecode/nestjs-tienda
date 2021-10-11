import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDocumentoIdentificacion } from 'src/entities/tipo-documento-identificacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoDocumentoIdentificacionService {
    constructor(
        @InjectRepository(TipoDocumentoIdentificacion)
        private readonly tipoDocumentoIdentificacionRepository: Repository<TipoDocumentoIdentificacion>
    ) { }

    async create(tipoDocumento: TipoDocumentoIdentificacion): Promise<TipoDocumentoIdentificacion> {
        return await this.tipoDocumentoIdentificacionRepository.save(tipoDocumento);
    }

    async existByNombre(nombre: string): Promise<boolean> {
        const existe = await this.tipoDocumentoIdentificacionRepository.findOne({ where: { nombre: nombre } });
        return existe !== undefined;
    }

    async getByNombre(nombre: string): Promise<TipoDocumentoIdentificacion> {
        return this.tipoDocumentoIdentificacionRepository.findOne({ nombre: nombre });
    }
}
