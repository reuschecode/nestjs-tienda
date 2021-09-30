import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Documento } from './documento.entity';
import { Producto } from './producto.entity';

@Entity()
export class Detalle{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(type => Documento, documento => documento.detalles, {nullable: false})
    documento: Documento;

    @ManyToOne(type => Producto, producto => producto.detalles, {nullable: false})
    producto: Producto;

    @Column({type: 'decimal', precision: 15, scale: 2, nullable: false})
    precioProducto: number;

    @Column({type: 'bigint'})
    cantidadProducto: number;
}