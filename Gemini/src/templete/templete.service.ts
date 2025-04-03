import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TempleteEntity } from "./templete.entity";
import { CategoryEntity } from "src/category/category.entity";
import { Repository } from "typeorm";
import { CreateTempleteDTO } from "./dto/CreateTempleteDTO";
import { ListTempleteDTO } from "./dto/ListTempleteDTO";
import { UpdateTempleteDTO } from "./dto/UpdateTempleteDTO";
import { ListCategoriesByTempletesDTO } from "./dto/ListCategoriesByTempletesDTO";

@Injectable()
export class TempleteService{

	constructor(

		@InjectRepository(TempleteEntity)
		private readonly templeteRepository: Repository<TempleteEntity>,

		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>

	){}

	async createTemplete(dataTemplete: CreateTempleteDTO){

		const templeteEntity = new TempleteEntity();

		templeteEntity.title = dataTemplete.title;
		templeteEntity.content = dataTemplete.content;

		return await this.templeteRepository.save(templeteEntity);
	}

	async getAllTempletes(){
		
		const saveTempletes = await this.templeteRepository.find();

		const listTempletes = saveTempletes.map(
			
			templete => new ListTempleteDTO(templete.id, templete.title, templete.content)
		);

		return listTempletes;
	}

	async getTempleteById(id: string){

		const saveTemplete = await this.templeteRepository.findOneBy({id: id});

		if(!saveTemplete){

			throw new NotFoundException(`Templete with ${id} not found`);
		}
		
		const getTemplete = new ListTempleteDTO(saveTemplete.id, saveTemplete.title, saveTemplete.content);
		
		return getTemplete;
	}
	
	async getCategoriesByTemplete(templeteId: string){
		
		const templete = await this.templeteRepository.findOne({

			where: {id: templeteId},
			relations: ['categories']
		})

		if(!templete) throw new NotFoundException(`Templete with ${templeteId} not found`);
		
		const categoriesByTempletes = templete.categories.map(
			
			category => new ListCategoriesByTempletesDTO(
				
				category.id, 
				category.name, 
				category.description, 
				[
					new ListTempleteDTO(templete.id,templete.title,templete.content)
				]
			)
		);
		
		return categoriesByTempletes;
		
	}
	
	async updateTemplete(id: string, dateUpdate: UpdateTempleteDTO){
		
		const templete = await this.templeteRepository.findOneBy({id: id});
		
		if(!templete){
			
			throw new NotFoundException(`Templete with ${id} not found`);
		}
		
		await this.templeteRepository.update(id, dateUpdate);
	}
	
	async deleteTemplete(id: string){
		
		const templete = await this.templeteRepository.findOneBy({id: id});
		
		if(!templete){
			
			throw new NotFoundException(`Templete with ${id} not found`);
		}
		
		await this.templeteRepository.delete(id);
	}
	
	async attachCategory(templeteId: string, categoryId: string){

		const templete = await this.templeteRepository.findOneBy({id: templeteId});
		const category = await this.categoryRepository.findOneBy({id: categoryId });

		if(!templete) throw new NotFoundException(`Template with id ${templeteId} not found`)
		if(!category) throw new NotFoundException(`Template with id ${categoryId} not found`)

		if(!templete.categories){

			templete.categories = [];
		}

		templete.categories.push(category);

		return await this.templeteRepository.save(templete);
	}

	async detachCategory(templeteId: string, categoryId: string){

		const templete = await this.templeteRepository.findOne({
			
			where: {id: templeteId},
			relations: ['categories']
		});

		if(!templete) throw new NotFoundException(`Template with id ${templeteId} not found`)
		
		const category = await this.categoryRepository.findOneBy({id: categoryId});

		if(!category) throw new NotFoundException(`Category with id ${categoryId} not found`)

		templete.categories = templete.categories.filter(category => category.id !== categoryId);
		

		return await this.templeteRepository.save(templete);
	}

}