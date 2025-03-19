import { 
	
	Column, 
	CreateDateColumn, 
	DeleteDateColumn, 
	Entity, 
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
}