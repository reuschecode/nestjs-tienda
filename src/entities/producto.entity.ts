import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Detalle } from './detalle.entity';
import { Empresa } from './empresa.entity';
import { MarcaProducto } from './marca-producto.entity';
import { ProductosTienda } from './productos-tienda.entity';
import { SubtipoProducto } from './subtipo-producto.entity';

@Entity()
export class Producto{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({nullable: false, length: 45})
    nombre: string;

    @Column({type: 'decimal', precision: 15, scale: 2, nullable: false})
    precio: number

    @Column({nullable: true, length: 100})
    urlImagen: string;

    @Column({nullable: false, default: true})
    activo: boolean;

    @ManyToOne(type => Empresa, empresa => empresa.productos, {nullable: false})
    empresa: Empresa;

    @ManyToOne(type => SubtipoProducto, subtipo => subtipo.productos)
    subtipoProducto: SubtipoProducto;

    @ManyToOne(type => MarcaProducto, marca_producto => marca_producto.productos)
    marcaProducto: MarcaProducto;

    @OneToMany(type => Detalle, detalle => detalle.producto)
    detalles: Detalle[];

    @OneToMany(type => ProductosTienda, productos_tienda => productos_tienda.producto)
    productosTienda: ProductosTienda[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}