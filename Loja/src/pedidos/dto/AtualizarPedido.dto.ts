import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './CriarPedido.dto';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) { }
