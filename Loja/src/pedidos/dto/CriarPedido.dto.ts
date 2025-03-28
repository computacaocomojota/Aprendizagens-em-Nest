import {

	IsNotEmpty, 
	IsNumber, 
	IsUUID 
	
} from "class-validator";

import { UsuarioEntity } from "../../usuarios/usuario.entity";

export class CriarPedidoDTO{	
	
	@IsUUID(undefined,{ message: 'ID de usuário inválido' })
	@IsNotEmpty()
	usuario: UsuarioEntity;
	
	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	@IsNotEmpty()
	valorTotal: number;

}
