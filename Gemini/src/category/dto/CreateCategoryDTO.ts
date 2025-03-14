import { 
	
	IsNotEmpty, 
	IsString 

} from "class-validator";

export class CreateCategoryDTO{

	@IsNotEmpty({ message: 'Name is required' })
	@IsString()
	name: string;

	@IsNotEmpty({ message: 'Description is required' })
	@IsString()
	description: string;
}