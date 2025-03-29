import { CategoryEntity } from "src/category/category.entity";
import { 
	
	Column, 
	CreateDateColumn, 
	DeleteDateColumn, 
	Entity, 
	JoinTable, 
	ManyToMany, 
	PrimaryGeneratedColumn,
	UpdateDateColumn,

} from "typeorm";

@Entity({name: 'templetes'})
export class TempleteEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'title', type: 'varchar', length: 255, nullable: false})
	title: string;

	@Column({name: 'content', type: 'text', nullable: false})
	content: string;

	@CreateDateColumn({name: 'created_at'})
	createdAt: string

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: string

	@DeleteDateColumn({name: 'deleted_at'})
	deletedAt: string

	@ManyToMany(() => CategoryEntity, categoryEntity => categoryEntity.templetes, { cascade: true, eager: true })
	@JoinTable({name: 'templete_categories'})
	categories: CategoryEntity[]
}