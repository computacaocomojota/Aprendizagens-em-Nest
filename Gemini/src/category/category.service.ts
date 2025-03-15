import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { CreateCategoryDTO } from "./dto/CreateCategoryDTO";
import { ListCategoryDTO } from "./dto/ListCategoryDTO";
import { UpdateCategoryDTO } from "./dto/UpdateCategoryDTO";
import { ConnectableObservable } from "rxjs";

@Injectable()
export class CategoryService {

	constructor(

		@InjectRepository(CategoryEntity)
		private readonly categoryRepository: Repository<CategoryEntity>

	){}

	async createCategory(dateCategory: CreateCategoryDTO){

		const categoryEntity = new CategoryEntity();
		
		categoryEntity.name = dateCategory.name;
		categoryEntity.description = dateCategory.description;

		return await this.categoryRepository.save(categoryEntity);
	}

	async listCategories(){

		const saveCategories = await this.categoryRepository.find();

		const listCategories = saveCategories.map(
			
			category => new ListCategoryDTO(category.id, category.name, category.description)
		)


		return listCategories;
	}

	async getCategory(id:string){

		const saveCategory = await this.categoryRepository.findOne({ where: { id } });

		if(!saveCategory){

			throw new Error(`Category with ${id} not found`);
		}

		const getCategory = new ListCategoryDTO(saveCategory.id, saveCategory.name, saveCategory.description);

		return getCategory;
	}

	async updateCategory(id:string, dateUpdate: UpdateCategoryDTO){

		await this.categoryRepository.update(id, dateUpdate);
	}

	async deleteCategory(id:string){

		await this.categoryRepository.delete(id);
	}
}