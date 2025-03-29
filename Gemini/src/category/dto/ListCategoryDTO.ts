import { TempleteEntity } from "src/templete/templete.entity";

export class ListCategoryDTO{
	
	constructor(

		readonly id: string,
		readonly name: string,
		readonly description: string,
		readonly templetes: TempleteEntity[]

	){}
}