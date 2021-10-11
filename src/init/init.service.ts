import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { EmpresaService } from 'src/empresa/empresa.service';
import { Empresa } from 'src/entities/empresa.entity';
import { Rol } from 'src/entities/rol.entity';
import { Tienda } from 'src/entities/tienda.entity';
import { TipoDocumentoIdentificacion } from 'src/entities/tipo-documento-identificacion.entity';
import { RolService } from 'src/rol/rol.service';
import { TiendaService } from 'src/tienda/tienda.service';
import { TipoDocumentoIdentificacionService } from 'src/tipo-documento-identificacion/tipo-documento-identificacion.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class InitService {
    constructor(
        private readonly empresaService: EmpresaService,
        private readonly tiendaService: TiendaService,
        private readonly authService: AuthService,
        private readonly usuarioService: UsuariosService,
        private readonly rolService: RolService,
        private readonly tipoDocumentoIdentificacionService: TipoDocumentoIdentificacionService
    ) {
        this.init();
    }

    async init() {
        let roles: Rol[] = [];
        let empresa: Empresa = null;
        let tienda: Tienda = null;
        let tipoDocumentoIdentificacion: TipoDocumentoIdentificacion = null;
        console.log("========INICIALIZANDO NESTJS TIENDA REUSCHECODE 2021==========");
        if (!await this.empresaService.existByNombre("ReuscheCode Corp")) {
            empresa = await this.empresaService.create({
                id: null, nombre: "ReuscheCode Corp", urlImagen: null, activo: true,
                createdAt: new Date(), updatedAt: new Date(), marcaProductos: null,
                productos: null, ruc: "000000000000", tiendas: null, tipoProductos: null
            });
        }
        if (!await this.tiendaService.existByNombre("ReuscheCode")) {
            tienda = await this.tiendaService.create({
                id: null, nombre: "ReuscheCode", activo: true,
                createdAt: new Date(), updatedAt: new Date(), departamentoTienda: "Cloud",
                direccionTienda: "Cloud", distritoTienda: "Cloud", provinciaTienda: "Cloud",
                empresa: empresa,
                productosTienda: null, urlImagen: null, usuarios: null
            });
        }
        if (!await this.rolService.existByNombre("USUARIO DE TIENDA")) {
            const rol = await this.rolService.create({ nombre: "USUARIO DE TIENDA", id: null, usuarios: null });
            roles.push(rol);
        }
        if (!await this.rolService.existByNombre("ADMINISTRADOR DE TIENDA")) {
            const rol = await this.rolService.create({ nombre: "ADMINISTRADOR DE TIENDA", id: null, usuarios: null });
            roles.push(rol);
        }
        if (!await this.rolService.existByNombre("ADMINISTRADOR DE EMPRESA")) {
            const rol = await this.rolService.create({ nombre: "ADMINISTRADOR DE EMPRESA", id: null, usuarios: null });
            roles.push(rol);
        }
        if (!await this.rolService.existByNombre("SUPERVISOR DE TIENDA")) {
            const rol = await this.rolService.create({ nombre: "SUPERVISOR DE TIENDA", id: null, usuarios: null });
            roles.push(rol);
        }
        if (!await this.tipoDocumentoIdentificacionService.existByNombre("DNI")) {
            tipoDocumentoIdentificacion = await this.tipoDocumentoIdentificacionService.create({ id: null, nombre: "DNI", clientes: null, proveedores: null, usuarios: null });
        }
        if (!await this.usuarioService.existsByEmail("reusche488@gmail.com")) {
            await this.authService.register({ id: null, email: "reusche488@gmail.com", activo: true, apellidos: "Reusche Sáenz", nombres: "Eduardo Julio", createdAt: new Date(), updatedAt: new Date(), documentoIdentificacion: "70868712", documentos: null, password: process.env.PASSWORD_ADMIN, roles: roles, tienda: tienda, tipoDocumentoIdentificacion: tipoDocumentoIdentificacion });
        }
        console.log("========INSERCIÓN DE CONFIGURACION INICIAL TERMINADA==========");
    }
}
