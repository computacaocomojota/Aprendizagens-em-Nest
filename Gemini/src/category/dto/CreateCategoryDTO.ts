import { 
	
	IsNotEmpty, 
	IsString, 
	Max,
	MaxLength

} from "class-validator";

export class CreateCategoryDTO{

	@IsNotEmpty({ message: 'Name is required' })
	@IsString()
	@MaxLength(50, { message: 'Name must be less than 50 characters' })
	name: string;

	@IsNotEmpty({ message: 'Description is required' })
	@IsString()
	description: string;
}