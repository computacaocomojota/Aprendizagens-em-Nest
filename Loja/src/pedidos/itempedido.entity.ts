import { 
	
	Column, 
	Entity, 
	ManyToOne, 
	PrimaryGeneratedColumn 
	
} from "typeorm";

import { PedidoEntity } from "./pedido.entity";
import { ProdutoEntity } from "src/produtos/produto.entity";

@Entity({name: 'itens_pedidos'})
export class ItemPedidoEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'quantidade', nullable: false})
	quantidade: number;

	@Column({name: 'preco_venda', nullable: false})
	precoVenda: number;

	@ManyToOne(() => PedidoEntity, (pedidoEntity) => pedidoEntity.itensPedido, 
	{orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
	pedido: PedidoEntity;

	@ManyToOne((() => ProdutoEntity), (produtoEntity) => produtoEntity.itensPedido,
	{cascade:['update'], orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
	produto: ProdutoEntity;
	
}