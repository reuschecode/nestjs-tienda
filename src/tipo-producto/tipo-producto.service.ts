import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoProducto } from 'src/entities/tipo-producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoProductoService {
    constructor(
        @InjectRepository(TipoProducto) 
        private readonly tipoProductosRepository: Repository<TipoProducto>
    ){}

    async getByIdEmpresa(idEmpresa: number): Promise<TipoProducto[]>{
        return await this.tipoProductosRepository.find({where: {empresa: idEmpresa}});
    }

    async getByNombreAndEmpresaId(nombre: string, idEmpresa: number): Promise<TipoProducto>{
        return await this.tipoProductosRepository.findOne({where: {nombre: nombre, empresa: idEmpresa}});
    }

    async create(tipoProducto: TipoProducto){
        await this.tipoProductosRepository.save(tipoProducto);
    }

    async update(tipoProducto: TipoProducto){
        await this.tipoProductosRepository.update(tipoProducto.id, tipoProducto);
    }

    async existByNombreAndEmpresaId(nombre: string, idEmpresa: number): Promise<boolean>{
        const existe = await this.tipoProductosRepository.findOne({where: {nombre: nombre, empresa: idEmpresa}});
        return existe !== undefined;
    }

}
