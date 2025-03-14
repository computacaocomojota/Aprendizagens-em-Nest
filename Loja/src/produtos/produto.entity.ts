import { ProdutoCaracteristicaEntity } from "./produto-caracteristica.entity";
import { ProdutoImagemEntity } from "./produto-imagem.entity";

import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column,
	CreateDateColumn, 
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany,
} from "typeorm";


@Entity({name: 'produtos'})
export class ProdutoEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'nome', length: 100, nullable: false})
	nome: string;

	@Column({name: 'valor', nullable: false})
	valor: number;

	@Column({name: 'quantidade_disponivel', nullable: false})
	quantidadeDisponivel: number;

	@Column({name: 'descricao', length: 255, nullable: false})
	descricao: string;

	@Column({name: 'categoria', length: 100, nullable: false})
	categoria: string;

	@CreateDateColumn({name: 'created_at'})
	created_at: string;
	
	@UpdateDateColumn({name: 'updated_at'})
	updated_at: string;
	
	@DeleteDateColumn({name: 'deleted_at'})
	deleted_at: string;

	@OneToMany(() => ProdutoCaracteristicaEntity,(produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto, { 

		cascade: true, eager: true 
	})
	caracteristicas: ProdutoCaracteristicaEntity[];

	@OneToMany(() => ProdutoImagemEntity,(produtoImagemEntity) => produtoImagemEntity.produto,{ 
		
		cascade: true, eager: true 
	})
	imagens: ProdutoImagemEntity[];

}