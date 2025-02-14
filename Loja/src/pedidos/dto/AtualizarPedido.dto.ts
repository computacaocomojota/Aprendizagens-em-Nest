import { PartialType } from '@nestjs/mapped-types';
import { CriarPedidoDto } from './CriarPedido.dto';

export class AtualizarPedidoDto extends PartialType(CriarPedidoDto) {}
