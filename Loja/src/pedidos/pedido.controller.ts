import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { CriarPedidoDto } from './dto/CriarPedido.dto';
import { AtualizarPedidoDto } from './dto/AtualizarPedido.dto';

@Controller('/pedidos')
export class PedidosController {

  constructor(private readonly pedidosService: PedidosService) { }

  @Post()
  create(@Body() createPedidoDto: CriarPedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: AtualizarPedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}
