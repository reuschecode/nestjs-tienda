import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MarcaProducto } from './marca-producto.entity';
import { Producto } from './producto.entity';
import { Tienda } from './tienda.entity';
import { TipoProducto } from './tipo-producto.entity';

@Entity()
export class Empresa{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 45})
    nombre: string;

    @Column({nullable: true, length: 100})
    urlImagen: string;

    @Column({length: 45})
    ruc: string

    @Column({nullable: false, default: true})
    activo: boolean;

    @OneToMany(type => Tienda, tienda => tienda.empresa)
    tiendas: Tienda[];

    @OneToMany(type => Producto, producto => producto.empresa)
    productos: Producto[];

    @OneToMany(type => TipoProducto, tipo_producto => tipo_producto.empresa)
    tipoProductos: TipoProducto[];

    @OneToMany(type => MarcaProducto, marca_producto => marca_producto.empresa)
    marcaProductos: MarcaProducto[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}