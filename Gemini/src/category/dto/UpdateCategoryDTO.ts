import { 
	
	IsNotEmpty, 
	IsOptional, 
	IsString 

} from "class-validator";

export class UpdateCategoryDTO{

	@IsOptional()
	@IsNotEmpty({ message: 'Name is required' })
	@IsString()
	name: string;

	@IsOptional()
	@IsNotEmpty({ message: 'Description is required' })
	@IsString()
	description: string;
}