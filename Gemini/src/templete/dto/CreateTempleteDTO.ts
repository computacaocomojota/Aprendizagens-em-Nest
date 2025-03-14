import { 
	
	IsNotEmpty, 
	MaxLength 

} from "class-validator";

export class CreateTempleteDTO{

	@IsNotEmpty({ message: 'Title is required' })
	@MaxLength(255, { message: 'Title is too long' })
	title: string;

	@IsNotEmpty({message: 'Content is required'})
	content: string;
}