import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from 'src/entities/empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>
    ) { }

    async create(empresa: Empresa): Promise<Empresa> {
        return await this.empresaRepository.save(empresa);
    }

    async existByNombre(nombre: string): Promise<boolean> {
        const existe = await this.empresaRepository.findOne({ where: { nombre: nombre } });
        return existe !== undefined;
    }

    async getByNombre(nombre: string): Promise<Empresa> {
        return this.empresaRepository.findOne({ nombre: nombre });
    }
}
