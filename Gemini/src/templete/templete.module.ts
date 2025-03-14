import { Module } from "@nestjs/common";
import { TempleteService } from "./templete.service";
import { TempleteController } from "./templete.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TempleteEntity } from "./templete.entity";

@Module({

	imports: [TypeOrmModule.forFeature([TempleteEntity])],
	controllers: [TempleteController],
	providers: [TempleteService],
})
export class TempleteModule {}