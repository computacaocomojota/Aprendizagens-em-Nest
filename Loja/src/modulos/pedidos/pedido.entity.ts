import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";

import { UsuarioEntity } from "../usuarios/usuario.entity";
import { StatusPedido } from "./enum/statuspedido.enum";
import { ItemPedidoEntity } from "./itempedido.entity";

@Entity({ name: 'pedidos' })
export class PedidoEntity {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'valor_total', nullable: false })
	valorTotal: number;

	@Column({ name: 'status', enum: StatusPedido, nullable: false })
	status: StatusPedido;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: string;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: string;

	@OneToMany(() => ItemPedidoEntity, (itemPedidoEntity) => itemPedidoEntity.pedido,
		{ cascade: true, eager: true })
	itensPedido: ItemPedidoEntity[];

	@ManyToOne(() => UsuarioEntity, (usuarioEntity) => usuarioEntity.pedidos,
		{ orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE' })
	usuario: UsuarioEntity;
}
