import { CategoryEntity } from "src/category/category.entity";

export class ListTempleteDTO{

	constructor( 

		readonly id: string, 
		readonly title: string,
		readonly content: string,
		readonly categories: CategoryEntity[]
		
	){}
	
}