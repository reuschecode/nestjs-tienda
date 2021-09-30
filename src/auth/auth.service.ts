import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { IniciarSesionDTO } from 'src/dto/iniciar-sesion-dto.input';

@Injectable()
export class AuthService {
    constructor(
        private usuarioServicio: UsuariosService, private jwtService: JwtService
    ){}

    async validarUsuario(email: string, password: string): Promise<any>{
        const usuario = await this.usuarioServicio.getByEmail(email);

        if(usuario && usuario.password === password){
            const {password, email, ...rest} = usuario;
            return rest;
        }

        return null;
    }

    async login(usuarioLogeando: IniciarSesionDTO): Promise<string | null>{
        const usuario = await this.usuarioServicio.getByEmail(usuarioLogeando.email);

        if(usuario && await bcrypt.compare(usuarioLogeando.password, usuario.password)){
            const jwt = await this.jwtService.sign({
                id: usuario.id, nombres: usuario.apellidos + ", "+ usuario.nombres, email: usuario.email
            });
            console.log("TOKEN:" ,jwt);
            return jwt;
        }
        return null;
    }
    
    async usuario(jwt: string){
        const data = await this.jwtService.verifyAsync(jwt);

        if(!data){
            throw new UnauthorizedException("Porfavor, vuelve a iniciar sesión");
        }
        console.log(data);

        return data;
    }

    async register(usuario: Usuario){
        usuario.password = await bcrypt.hash(usuario.password, 12);
        await this.usuarioServicio.create(usuario);
    }
}
