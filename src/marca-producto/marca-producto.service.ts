import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcaProducto } from 'src/entities/marca-producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarcaProductoService {
    constructor(
        @InjectRepository(MarcaProducto) 
        private readonly marcaProductoRepository: Repository<MarcaProducto>
    ){}

    async getByEmpresaId(idEmpresa: number): Promise<MarcaProducto[]>{
        return await this.marcaProductoRepository.find({where: {empresa: idEmpresa}});
    }

    async getByNombreAndEmpresaId(nombre: string, idEmpresa: number): Promise<MarcaProducto>{
        return await this.marcaProductoRepository.findOne({where: {nombre: nombre, empresa: idEmpresa}});
    }

    async getByIdMarca(idMarca: number): Promise<MarcaProducto>{
        return await this.marcaProductoRepository.findOneOrFail(idMarca);
    }

    async create(marca: MarcaProducto){
        await this.marcaProductoRepository.save(marca);
    }

    async update(marca: MarcaProducto){
        await this.marcaProductoRepository.update(marca.id, marca);
    }

    async existByNombreAndEmpresaId(nombre: string, idEmpresa: number): Promise<boolean>{
        const existe = await this.marcaProductoRepository.findOne({where: {nombre: nombre, empresa: idEmpresa}});
        return existe !== undefined;
    }
}
