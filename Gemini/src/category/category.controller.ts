import { 
	
	Body,
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put 

} from "@nestjs/common";

import { CategoryService } from "./category.service";
import { ListCategoryDTO } from "./dto/ListCategoryDTO";
import { CreateCategoryDTO } from "./dto/CreateCategoryDTO";
import { UpdateCategoryDTO } from "./dto/UpdateCategoryDTO";

@Controller('categories')
export class CategoryController{

	constructor(private readonly categoryService: CategoryService){}

	@Post()
	async createCategory(@Body() dateCategories: CreateCategoryDTO){

		const createCategory = await this.categoryService.createCategory(dateCategories);

		return {

			category: new ListCategoryDTO(
				
				createCategory.id, 
				createCategory.name, 
				createCategory.description,
				createCategory.templetes
			),

			message: 'Category created successfully'
		}
	}

	@Get()
	async getAllCategories(){

		return await this.categoryService.getAllCategories();
	}

	@Get('/:id')
	async getCategoryById(@Param('id') id: string){

		return await this.categoryService.getCategoryById(id);
	}

	@Get('/:categoryId/templetes')
	async getTempleteByCategory(@Param('categoryId') categoryId: string){

		return await this.categoryService.getTempleteByCategory(categoryId)
	}

	@Put('/:id')
	async updateCategory(@Param('id') id: string, @Body() dateUpdate: UpdateCategoryDTO){

		const updateCategory = await this.categoryService.updateCategory(id, dateUpdate);

		return {

			updateCategory: updateCategory,
			message: 'Category updated successfully'
		}
	}

	@Delete('/:id')
	async deleteCategory(@Param('id') id: string){

		const deleteCategory = await this.categoryService.deleteCategory(id);

		return {

			deleteCategory: deleteCategory,
			message: 'Category deleted successfully'
		}
	}
}