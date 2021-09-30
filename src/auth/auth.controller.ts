import { BadRequestException, Body, ConflictException, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { CrearUsuarioDTO } from 'src/dto/crear-usuario-dto.input';
import { AuthService } from './auth.service';
import { Usuario } from 'src/entities/usuario.entity';
import { TipoDocumentoIdentificacion } from 'src/entities/tipo-documento-identificacion.entity';
import { Tienda } from 'src/entities/tienda.entity';
import { IniciarSesionDTO } from 'src/dto/iniciar-sesion-dto.input';
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() usuarioLogeando: IniciarSesionDTO, @Res({passthrough: true}) res: Response){
        const jwt = await this.authService.login(usuarioLogeando);

        if(jwt === null){
            throw new ConflictException("Email o contraseña incorrectos.");
        }

        res.cookie('access-token', jwt, {httpOnly: true});

        return {message: "Inicio de sesión exitoso."};
    }

    @Post('register')
    async register(@Body() crearUsuario: CrearUsuarioDTO){
        const nuevoUsuario = new Usuario();
        nuevoUsuario.nombres = crearUsuario.nombres;
        nuevoUsuario.apellidos = crearUsuario.apellidos;
        nuevoUsuario.email = crearUsuario.email;
        const tipoDocumentoIdentificacion = new TipoDocumentoIdentificacion();
        tipoDocumentoIdentificacion.id = crearUsuario.tipoDocumentoIdentificacion;
        nuevoUsuario.tipoDocumentoIdentificacion = tipoDocumentoIdentificacion;
        nuevoUsuario.documentoIdentificacion = crearUsuario.documentoIdentificacion;
        nuevoUsuario.password = crearUsuario.password;
        const tienda = new Tienda();
        tienda.id = crearUsuario.tienda;
        nuevoUsuario.tienda = tienda;

        await this.authService.register(nuevoUsuario);

        return {message: "Registro del usuario '"+nuevoUsuario.email+"' exitoso."}
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) res: Response){
        res.clearCookie('access-token');

        return {message: "Se salió de sesión."};
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('protected')
    getHello(): string{
        return 'HOLA QUE PASA? SI PASASTE LA PROTECCIÓN PA!';
    }
}
