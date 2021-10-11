import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepositorio: Repository<Rol>) {
    }

    async create(rol: Rol): Promise<Rol> {
        return await this.rolRepositorio.save(rol);
    }

    async existByNombre(nombre: string): Promise<boolean> {
        const existe = await this.rolRepositorio.findOne({ where: { nombre: nombre } });
        return existe !== undefined;
    }

    async getByNombre(nombre: string): Promise<Rol> {
        return this.rolRepositorio.findOneOrFail({ where: { nombre: nombre } });
    }

    async getAll(): Promise<Rol[]> {
        return this.rolRepositorio.find();
    }
}
