import {  Module } from '@nestjs/common';
import { GeminiModule } from './gemini/gemini.module';
import { TempleteModule } from './templete/templete.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';

@Module({
  
  imports: [

    GeminiModule,
    TempleteModule,
    CategoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
