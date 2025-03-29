import { 
	
	IsNotEmpty, 
	IsOptional, 
	IsString, 
	MaxLength

} from "class-validator";

import { TempleteEntity } from "src/templete/templete.entity";

export class CreateCategoryDTO{

	@IsNotEmpty({ message: 'Name is required' })
	@IsString()
	@MaxLength(50, { message: 'Name must be less than 50 characters' })
	name: string;

	@IsNotEmpty({ message: 'Description is required' })
	@IsString()
	description: string;

	@IsOptional()
	templetes: TempleteEntity[];

}