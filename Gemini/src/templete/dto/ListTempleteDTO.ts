import { ListCategoryDTO } from "src/category/dto/ListCategoryDTO";

export class ListTempleteDTO{

	constructor( 

		readonly id: string, 
		readonly title: string,
		readonly content: string,
		readonly categories?: ListCategoryDTO[],
	){}
	
}