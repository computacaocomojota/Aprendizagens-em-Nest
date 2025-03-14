import { UsuarioEntity } from "../../usuarios/usuario.entity";
import { StatusPedido } from "../enum/statuspedido.enum";
import {

	IsEnum,
	IsNotEmpty, 
	IsNumber, 
	IsUUID 
} from "class-validator";

export class CriarPedidoDTO{	
	
	@IsUUID(undefined,{ message: 'ID de usuário inválido' })
	@IsNotEmpty()
	usuario: UsuarioEntity;
	
	@IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
	@IsNotEmpty()
	valorTotal: number;

	@IsEnum(StatusPedido,{message: 'Estado inválido'})
	@IsNotEmpty()
	status: StatusPedido;

}
