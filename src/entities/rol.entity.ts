import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Rol{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    nombre: string;

    @ManyToMany(type => Usuario, usuario => usuario.roles)
    usuarios: Usuario[]
}