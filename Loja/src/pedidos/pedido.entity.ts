
import { UsuarioEntity } from "../usuarios/usuario.entity";
import { StatusPedido } from "./enum/statuspedido.enum";
import { 
	Column, 
	CreateDateColumn, 
	DeleteDateColumn, 
	Entity, 
	ManyToOne, 
	PrimaryGeneratedColumn, 
	UpdateDateColumn 
} from "typeorm";

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

	@ManyToOne(() => UsuarioEntity, (usuarioEntity) => usuarioEntity.pedidos)
	usuario: UsuarioEntity;
}
