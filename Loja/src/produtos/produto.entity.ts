import { UsuarioEntity } from "src/usuarios/usuario.entity";
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
	ManyToOne,
} from "typeorm";


@Entity({name: 'produtos'})
export class ProdutoEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => UsuarioEntity, 
		
		(usuarioEntity) => usuarioEntity.produtos,
		{ orphanedRowAction: 'delete',onDelete: 'CASCADE', onUpdate: 'CASCADE' }
	)
	usuario: UsuarioEntity;

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

	@OneToMany(() => ProdutoCaracteristicaEntity, 
		
		(produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto, 
		{ cascade: true, eager: true }
	)
	caracteristicas: ProdutoCaracteristicaEntity[];

	@OneToMany(() => ProdutoImagemEntity, 
	
		(produtoImagemEntity) => produtoImagemEntity.produto,
		{ cascade: true, eager: true }
	)
	imagens: ProdutoImagemEntity[];

	@CreateDateColumn({name: 'created_at'})
	created_at: string;
	
	@UpdateDateColumn({name: 'updated_at'})
	updated_at: string;
	
	@DeleteDateColumn({name: 'deleted_at'})
	deleted_at: string;

}