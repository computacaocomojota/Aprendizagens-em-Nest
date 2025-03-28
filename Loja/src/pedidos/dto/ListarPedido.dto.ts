import { StatusPedido } from "../enum/statuspedido.enum";

export class ListarPedidoDTO{

	constructor(

		readonly id: string,
		readonly usuarioId: string,
		readonly valorTotal: number,
		readonly status: StatusPedido
		
	){}
}