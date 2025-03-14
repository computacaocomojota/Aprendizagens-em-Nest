import { 
	
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put 

} from "@nestjs/common";

import { CategoryService } from "./category.service";

@Controller('/api/v1/categories')
export class CategoryController{

	constructor(

		private readonly categoryService: CategoryService
		
	){}

	@Post()
	async createCategory(){}

	@Get()
	async listCategories(){}

	@Get('/:id')
	async getCategory(@Param('id') id: string){}

	@Put('/:id')
	async updateCategory(@Param('id') id: string){}

	@Delete('/:id')
	async deleteCategory(@Param('id') id: string){}
}