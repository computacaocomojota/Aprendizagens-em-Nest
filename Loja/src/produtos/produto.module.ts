import { Module } from '@nestjs/common';
import { UsuarioModule } from 'src/usuarios/usuario.module';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { ProdutoEntity } from './produto.entity';
import { UsuarioEntity } from 'src/usuarios/usuario.entity';

@Module({

	imports: [UsuarioModule,TypeOrmModule.forFeature([ProdutoEntity,UsuarioEntity])],
	controllers: [ProdutoController],
	providers: [ProdutoService],
})
export class ProdutoModule {}