import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Detalle } from './detalle.entity';
import { Proveedor } from './proveedor.entity';
import { TipoDocumento } from './tipo-documento.entity';
import { TipoPago } from './tipo-pago.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Documento{
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @ManyToOne(type => Usuario, usuario => usuario.documentos, {nullable: false})
    usuario: Usuario;

    @ManyToOne(type => Proveedor, proveedor => proveedor.documentos)
    proveedor: Proveedor;

    @ManyToOne(type => Cliente, cliente => cliente.documentos)
    cliente: Cliente;

    @ManyToOne(type => TipoPago, tipo_pago => tipo_pago.documentos, {nullable: false})
    tipoPago: TipoPago;

    @ManyToOne(type => TipoDocumento, tipo_documento => tipo_documento.documentos, {nullable: false})
    tipoDocumento: TipoDocumento;

    @OneToMany(type => Detalle, detalle => detalle.documento)
    detalles: Detalle[];

    @Column({type: 'decimal', precision: 15, scale: 2, nullable: false})
    totalPago: number;

    @Column({type: 'text'})
    observacion: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}