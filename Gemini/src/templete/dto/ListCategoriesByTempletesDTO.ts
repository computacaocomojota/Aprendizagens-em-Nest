import { ListTempleteDTO } from "./ListTempleteDTO";

export class ListCategoriesByTempletesDTO{

	constructor(

		readonly id: string,
		readonly name: string,
		readonly description: string,
		readonly templetes: ListTempleteDTO[],
		
	){}
}