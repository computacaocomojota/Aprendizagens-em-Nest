import { StatusPedido } from "../enum/statuspedido.enum";

class ListarItemPedidoDTO{

	id: string;
	quantidade: number;
	precoVenda: number;
}

export class ListarPedidoDTO{

	constructor(

		readonly id: string,
		readonly valorTotal: number,
		readonly status: StatusPedido,
		readonly itensPedido: ListarItemPedidoDTO[],

	){}
}