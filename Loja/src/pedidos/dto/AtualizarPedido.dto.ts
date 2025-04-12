import { UsuarioEntity } from "../../usuarios/usuario.entity";
import { StatusPedido } from "../enum/statuspedido.enum";
import { 
	IsEnum, 
	IsNotEmpty, 
	IsNumber, 
	IsOptional, 
} from "class-validator";
export class AtualizarPedidoDTO{

	@IsEnum(StatusPedido,{message: 'Estado inválido'})
	status: StatusPedido;
}
