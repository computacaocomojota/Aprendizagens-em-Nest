import { ProdutoEntity } from "src/produtos/produto.entity";
import { 
	Entity, 
	PrimaryGeneratedColumn, 
	Column, 
	CreateDateColumn, 
	UpdateDateColumn,
	DeleteDateColumn,
	OneToMany, 
} from "typeorm";

@Entity({name: 'usuarios'})
export class UsuarioEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'nome', length: 100, nullable: false})
	nome: string;

	@Column({name: 'email', length: 100, nullable: false})
	email: string;

	@Column({name: 'senha', length: 100, nullable: false})
	senha: string;

	@OneToMany(() => ProdutoEntity, (produtoEntity) => produtoEntity.usuario,{ cascade: true, eager: true })
	produtos: ProdutoEntity[];

	@CreateDateColumn({name: 'created_at'})
	created_at: string;

	@UpdateDateColumn({name: 'updated_at'})
	updated_at: string;

	@DeleteDateColumn({name: 'deleted_at'})
	deleted_at: string;
}