import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Documento } from './documento.entity';
import { TipoDocumentoIdentificacion } from './tipo-documento-identificacion.entity';

@Entity()
export class Proveedor{
    @PrimaryColumn({type: 'char', length: 12})
    documentoIdentificacion: string;

    @ManyToOne(type => TipoDocumentoIdentificacion, tipo_documento_identificacion => tipo_documento_identificacion.clientes, {nullable: false})
    tipoDocumentoIdentificacion: TipoDocumentoIdentificacion;

    @Column({length: 100, nullable: false})
    nombres: string;

    @Column({length: 12, nullable: false})
    telefonoContacto1: string;

    @Column({length: 12})
    telefonoContacto2: string;

    @Column({nullable: false, unique: true})
    email: string;

    @OneToMany(type => Documento, documento => documento.proveedor)
    documentos: Documento[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}