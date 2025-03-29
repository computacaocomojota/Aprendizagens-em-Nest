import { 
	
	IsNotEmpty, 
	IsOptional, 
	IsString 

} from "class-validator";

export class UpdateTempleteDTO{

	@IsOptional()
	@IsNotEmpty({ message: 'Title is required' })
	@IsString()
	title: string;

	@IsOptional()	
	@IsNotEmpty({message: 'Content is required'})
	@IsString()
	content: string;

	category: string;
}