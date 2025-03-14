import { 
	
	Column, 
	Entity, 
	PrimaryGeneratedColumn,

} from "typeorm";

@Entity({name: 'templetes'})
export class TempleteEntity{

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({name: 'title', type: 'varchar', length: 255, nullable: false})
	title: string;

	@Column({name: 'content', type: 'text', nullable: false})
	content: string;
}