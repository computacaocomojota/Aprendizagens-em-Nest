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
@Controller('templetes')
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
			),

			message: 'Templete created successfully'
		}
	}

	
	@Get()
	async getAllTempletes(){
		
		return await this.templeteService.getAllTempletes();
	}
	
	@Get('/:id')
	async getTempleteById(@Param('id') id: string){
		
		return await this.templeteService.getTempleteById(id);
	}
	
	@Get('/:templeteId/categories')
	async getCategoriesByTemplete(@Param('templeteId') templeteId: string){

		return await this.templeteService.getCategoriesByTemplete(templeteId)
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
	
	@Post('/:templeteId/categories/:categoryId')
	async attachCategory(@Param('templeteId') templeteId: string, @Param('categoryId') categoryId: string){

		const attachCategory = await this.templeteService.attachCategory(templeteId, categoryId);

		return{

			attachCategory: new ListTempleteDTO(attachCategory.id, attachCategory.title, attachCategory.content, attachCategory.categories),
			message: 'Category added to templete successfully'
		}
	}

	@Delete('/:templeteId/categories/:categoryId')
	async datachCategory(@Param('templeteId') templeteId: string, @Param('categoryId') categoryId: string){

		const datachCategory = await this.templeteService.detachCategory(templeteId, categoryId);

		return{

			datachCategory: new ListTempleteDTO(datachCategory.id, datachCategory.title, datachCategory.content, datachCategory.categories),
			message: 'Category removed to templete successfully'
		}
	}
}