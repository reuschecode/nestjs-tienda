import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UsuariosService } from "src/usuarios/usuarios.service";
import { IJwtPayload } from "./jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usuarioService: UsuariosService
    ){
        super({
            jwtFromRequest: (req) => {
                if(!req || !req.cookies) return null;
                return req.cookies['access-token'];
            },
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: IJwtPayload){
        const usuario = await this.usuarioService.getByEmail(payload.email);

        if(!usuario){
            throw new UnauthorizedException('Volver a iniciar sesión');
        }

        return payload;
    }
}