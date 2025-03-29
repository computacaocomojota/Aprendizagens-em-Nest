import { 
	
	IsNotEmpty, 
	IsOptional, 
	MaxLength 

} from "class-validator";

import { CategoryEntity } from "src/category/category.entity";

export class CreateTempleteDTO{

	@IsNotEmpty({ message: 'Title is required' })
	@MaxLength(255, { message: 'Title is too long' })
	title: string;

	@IsNotEmpty({message: 'Content is required'})
	content: string;

	@IsOptional()
	categories: CategoryEntity[]
}