import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDocumento } from 'src/entities/tipo-documento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoDocumentoService {
    constructor(
        @InjectRepository(TipoDocumento)
        private readonly tipoDocumentoRepository: Repository<TipoDocumento>
    ) { }

    async create(tipoDocumento: TipoDocumento): Promise<TipoDocumento> {
        return await this.tipoDocumentoRepository.save(tipoDocumento);
    }

    async existByNombre(nombre: string): Promise<boolean> {
        const existe = await this.tipoDocumentoRepository.findOne({ where: { nombre: nombre } });
        return existe !== undefined;
    }

    async getByNombre(nombre: string): Promise<TipoDocumento> {
        return this.tipoDocumentoRepository.findOne({ nombre: nombre });
    }
}
