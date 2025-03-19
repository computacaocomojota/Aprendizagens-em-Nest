import { 

	Column, 
	CreateDateColumn, 
	DeleteDateColumn, 
	Entity, 
	PrimaryGeneratedColumn, 
	UpdateDateColumn
	
} from "typeorm";

@Entity({name: 'categories '})
export class CategoryEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'name', type: 'varchar', length: 100, nullable: false})
	name: string;

	@Column({name: 'description', type: 'text', nullable: false})
	description: string;

	@CreateDateColumn({name: 'created_at'})
	createdAt: string

	@UpdateDateColumn({name: 'updated_at'})
	updatedAt: string

	@DeleteDateColumn({name: 'deleted_at'})
	deletedAt: string
}