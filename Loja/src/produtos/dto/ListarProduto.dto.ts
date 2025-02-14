class ListarCaracteristicaProdutoDTO{

	nome: string;
	descricao: string;
}

class ListarImagemProdutoDTO{

	url: string;
	descricao: string;
}

export class ListarProdutoDTO{

  constructor(

    readonly id: string,
    readonly nome: string,
    readonly caracteristicas: ListarCaracteristicaProdutoDTO[],
    readonly imagens: ListarImagemProdutoDTO[],

  ){}
}