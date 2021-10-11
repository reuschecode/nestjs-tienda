import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tienda } from 'src/entities/tienda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(Tienda)
        private readonly tiendaRepository: Repository<Tienda>
    ) { }

    async create(tienda: Tienda): Promise<Tienda> {
        return await this.tiendaRepository.save(tienda);
    }

    async existByNombre(nombre: string): Promise<boolean> {
        const existe = await this.tiendaRepository.findOne({ where: { nombre: nombre } });
        return existe !== undefined;
    }
}
