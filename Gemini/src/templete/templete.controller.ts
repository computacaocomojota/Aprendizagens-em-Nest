import { 

	Body,
	Controller, 
	Delete, 
	Get, 
	Param, 
	Post, 
	Put,

} from "@nestjs/common";

import { TempleteService } from "./templete.service";
import { ListTempleteDTO } from "./dto/ListTempleteDTO";
import { CreateTempleteDTO } from "./dto/CreateTempleteDTO";
import { UpdateTempleteDTO } from "./dto/UpdateTempleteDTO";
@Controller('/api/v1/templetes')
export class TempleteController{

	constructor(private readonly templeteService: TempleteService){}

	@Post()
	async createTemplete(@Body() dataTempletes: CreateTempleteDTO){

		const createTemplete = await this.templeteService.createTemplete(dataTempletes);

		return {

			templete: new ListTempleteDTO(

				createTemplete.id, 
				createTemplete.title, 
				createTemplete.content,
				createTemplete.categories
			),

			message: 'Templete created successfully'
		}
	}

	@Post('/:templeteId/categories/:categoryId')
	async addCategoryToTemplete(@Param('templeteId') templeteId: string, @Param('categoryId') categoryId: string){

		const addCategoryToTemplete = await this.templeteService.addCategoryToTemplete(templeteId, categoryId);

		return{

			addCategoryToTemplete: addCategoryToTemplete,
			message: 'Category added to templete successfully'
		}
	}

	@Get()
	async listTempletes(){

		return await this.templeteService.listTempletes();
	}

	@Get('/:id')
	async getTemplete(@Param('id') id: string){

		return this.templeteService.getTemplete(id);
	}

	@Put('/:id')
	async updateTemplete(@Param('id') id: string,@Body() dateUpdate: UpdateTempleteDTO){

		const updateTemplete = await this.templeteService.updateTemplete(id, dateUpdate);

		return {

			updateTemplete: updateTemplete,
			message: 'Templete updated successfully'
		}
	}

	@Delete('/:id')
	async deleteTemplete(@Param('id') id: string){

		const deleteTemplete = await this.templeteService.deleteTemplete(id);

		return {

			deleteTemplete: deleteTemplete,
			message: 'Templete deleted successfully'
		}
	}

	@Delete('/:templeteId/categories/:categoryId')
	async removeCategoryToTemplete(@Param('templeteId') templeteId: string, @Param('categoryId') categoryId: string){

		const removeCategoryToTemplete = await this.templeteService.removeCategoryToTemplete(templeteId, categoryId);

		return{

			removeCategoryToTemplete: removeCategoryToTemplete,
			message: 'Category removed to templete successfully'
		}
	}
}