import { PartialType } from '@nestjs/mapped-types';
import { CriarProdutoDTO } from './CriarProduto.dto';

export class AtualizarProdutoDTO extends PartialType(CriarProdutoDTO){}