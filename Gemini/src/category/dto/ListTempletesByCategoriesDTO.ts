import { ListCategoryDTO } from "./ListCategoryDTO";

export class ListTempletesByCategoriesDTO {

	constructor(

		readonly id: string,
		readonly title: string,
		readonly content: string,
		readonly categories: ListCategoryDTO[],
		
	){}
}