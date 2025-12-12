import { Produto } from "../model/produto";
import { produtoRepository } from "../repository/produtoRepository";
import { colors } from "../util/Colors";

export class produtoController implements produtoRepository {

    private listaProdutos: Array<Produto> = new Array<Produto>();
    id: number = 0

    procurarPorId(id: number): void {
        let buscarId = this.buscarNoArray(id);

        if (buscarId  != null){
            buscarId.visualizar();
        } else
            console.log(colors.fg.red, "\n Id nao encontrado", colors.reset);
    }

    listarTodas(): void {
        for (let produto of this.listaProdutos) {
            produto.visualizar();
        }
    }

    public gerarId(): number {
    return ++ this.id;
    }

     public buscarNoArray(id: number): Produto | null {
        for (let produto of this.listaProdutos){
            if (produto.id === id)
                return produto
        }

        return null;
    }
    
    cadastrar(produto: Produto): void {
        this.listaProdutos.push(produto);
        console.log(colors.fg.green, "\n O produto: " + produto.id + 
            " foi cadastrado com sucesso!", colors.reset);
    }

    deletar(id: number): void {
        let buscarId = this.buscarNoArray(id);
        if (buscarId != null){
            this.listaProdutos.splice(this.listaProdutos.indexOf(buscarId), 1);
            console.log(colors.fg.green, "\n O produto do Id: " + id + "foi apagado com sucesso!", 
                colors.reset);
        } else 
            console.log(colors.fg.red, "O produto do Id: " + id + "nao foi encontrado.",
                colors.reset);
    }

    atualizar(produto: Produto): void {
        let buscarId = this.buscarNoArray(produto.id);
        if (buscarId != null){
            this.listaProdutos[this.listaProdutos.indexOf(buscarId)] = produto;
            console.log(colors.fg.green, "\n O produto: " +produto.id + 
                "foi atualizado com sucesso!", colors.reset);
    } else 
        console.log(colors.fg.red, "\n O produto:" + produto.id +
            "não foi encontrado!", colors.reset);
        }
    }
