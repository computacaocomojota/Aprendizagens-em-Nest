import { 

	IsEnum, 
	
} from "class-validator";

import { StatusPedido } from "../enum/statuspedido.enum";
export class AtualizarPedidoDTO{

	@IsEnum(StatusPedido,{message: 'Estado inválido'})
	status: StatusPedido;
}
