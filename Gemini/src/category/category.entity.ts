import { 

	Column, 
	Entity, 
	PrimaryGeneratedColumn 
	
} from "typeorm";

@Entity({name: 'categories '})
export class CategoryEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'name', type: 'varchar', length: 100, nullable: false})
	name: string;

	@Column({name: 'description', type: 'text', nullable: false})
	description: string;
}