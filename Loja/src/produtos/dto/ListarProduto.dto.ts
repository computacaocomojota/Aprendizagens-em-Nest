class ListarCaracteristicaProdutoDTO{

	nome: string;
	descricao: string;
}

class ListarImagemProdutoDTO{

	url: string;
	descricao: string;
}

export class ListarProdutoDTO{

	id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  categoria: string;
  caracteristicas: ListarCaracteristicaProdutoDTO[];
  imagens: ListarImagemProdutoDTO[];

}