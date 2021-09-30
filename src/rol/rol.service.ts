import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepositorio: Repository<Rol>)
    {
        this.create({nombre: "USUARIO DE TIENDA", id: null, usuarios: null})
        this.create({nombre: "ADMINISTRADOR DE TIENDA", id: null, usuarios: null})
        this.create({nombre: "ADMINISTRADOR DE EMPRESA", id: null, usuarios: null})
        this.create({nombre: "SUPERVISOR DE TIENDA", id: null, usuarios: null})
    }

    async create(rol: Rol){
        const flag = await this.existByNombre(rol.nombre);
        if(!flag){
            const rolCreado = await this.rolRepositorio.save(rol);
        }
    }

    async existByNombre(nombre: string): Promise<boolean>{
        const existe = await this.rolRepositorio.findOne({where: {nombre: nombre}});
        return existe !== undefined;
    }
}
