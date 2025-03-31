import {

	ArrayMinSize,
	IsArray,
	IsInt,
	ValidateNested
	
} from "class-validator";

import { Type } from "class-transformer";

class ItemPedidoDTO{

	@IsInt()
	quantidade: number;
}
export class CriarPedidoDTO{	
	
	@ValidateNested()
	@IsArray()
	@ArrayMinSize(1)
	@Type(()=> ItemPedidoDTO)
	itensPedido: ItemPedidoDTO[];
}
