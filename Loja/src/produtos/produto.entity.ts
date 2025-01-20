import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagem.entity";

import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column,
	CreateDateColumn, 
} from "typeorm";


@Entity({name: 'produtos'})
export class ProdutoEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'usuario_id', length: 100, nullable: false})
	usuarioId: string;

	@Column({name: 'nome', length: 100, nullable: false})
	nome: string;

	@Column({name: 'valor', nullable: false})
	valor: number;

	@Column({name: 'quantidade', nullable: false})
	quantidade: number;

	@Column({name: 'descricao', length: 255, nullable: false})
	descricao: string;

	@Column({name: 'categoria', length: 100, nullable: false})
	categoria: string;

	
	// caracteristicas: ProdutoCaracteristicaEntity[];
	// imagens: ProdutoImagemEntity[];

	@CreateDateColumn({name: 'created_at'})
	created_at: string;

	@CreateDateColumn({name: 'updated_at'})
	updated_at: string;

	@CreateDateColumn({name: 'deleted_at'})
	deleted_at: string;
}