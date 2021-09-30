import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Documento } from './documento.entity';
import { TipoDocumentoIdentificacion } from './tipo-documento-identificacion.entity';

@Entity()
export class Cliente{
    @PrimaryColumn({type: 'char', length: 12})
    documentoIdentificacion: string;

    @ManyToOne(type => TipoDocumentoIdentificacion, tipo_documento_identificacion => tipo_documento_identificacion.clientes, {nullable: false})
    tipoDocumentoIdentificacion: TipoDocumentoIdentificacion;

    @Column({length: 100})
    nombres: string;
    
    @OneToMany(type => Documento, documento => documento.cliente)
    documentos: Documento[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}