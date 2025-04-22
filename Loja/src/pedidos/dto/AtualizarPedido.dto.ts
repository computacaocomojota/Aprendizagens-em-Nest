import { PartialType } from "@nestjs/mapped-types";
import { CriarPedidoDTO } from "./CriarPedido.dto";

export class AtualizarPedidoDTO extends PartialType(CriarPedidoDTO){}
