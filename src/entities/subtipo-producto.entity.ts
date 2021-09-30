import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';
import { TipoProducto } from './tipo-producto.entity';

@Entity()
export class SubtipoProducto{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({nullable: false, length: 45})
    nombre: string;

    @ManyToOne(type => TipoProducto, tipo_producto => tipo_producto.subtipoProductos, {nullable: false})
    tipoProducto: TipoProducto;

    @OneToMany(type => Producto, producto =>  producto.subtipoProducto)
    productos: Producto[];
}