import { PedidoEntity } from "src/pedidos/pedido.entity";

export class ListarUsuarioDTO {

	constructor(
		
		readonly id: string, 
		readonly nome: string,
	){}
	
}