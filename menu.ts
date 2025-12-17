import readlinesync = require("readline-sync");
import { Smartphone } from "./src/model/smartphone";
import { colors } from './src/util/Colors';
import { produtoController } from "./src/controller/produtoController";
import { Acessorio } from "./src/model/acessorio";

export function main() {

    let opcao: number;
    
    const controller: produtoController = new produtoController();

    // TESTE
    const s1 = new Smartphone(controller.gerarId(), "iPhone 15 Pro", 8999.00, 10, "15 Pro", 256);
    controller.cadastrar(s1);

    const s2 = new Smartphone(controller.gerarId(), "iPhone 14", 4999.00, 5, "14", 128);
    controller.cadastrar(s2);

    while (true) {

        console.log(colors.bg.black, colors.fg.yellow, 
                    "*****************************************************");
        console.log("                                                     ");
        console.log("👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑");
        console.log("                                                     ");
        console.log("        PRINCESA CELL - CONTROLE DE ESTOQUE          ");
        console.log("                                                     ");
        console.log("👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑 👑");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("                                                     ");
        console.log("            1 - Cadastrar Produto                    ");
        console.log("            2 - Listar todos os Produtos             ");
        console.log("            3 - Atualizar Dados do Produto           ");
        console.log("            4 - Deletar Produto                      ");
        console.log("            5 - Sair                                 ");
        console.log("                                                     ");
        console.log("*****************************************************", 
        colors.reset);

        console.log("Entre com a opção desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao == 5) {
            console.log(colors.fg.yellowstrong, 
                "\nSistema Finalizado");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                
            console.log(colors.fg.whitestrong, 
                "\n\nCadastrar Produto\n\n", colors.reset);
                
            let tipoProduto: number = readlinesync.questionInt(colors.fg.yellowstrong +
                "Digite o Tipo do Produto (1 - Smartphone | 2 - Acessorio): " + colors.reset);

            let nome: string;
            let preco: number;
            let quantidade: number;

            nome = readlinesync.question("Digite o Nome do Produto: ");
            preco = readlinesync.questionFloat("Digite o Preco: ");
            quantidade = readlinesync.questionInt("Digite a Quantidade em Estoque: ");

            if (tipoProduto === 1) {
                
                let modelo: string;
                let armazenamento: number;
                
                modelo = readlinesync.question("Digite o Modelo (Ex: 16 Pro Max): ");
                armazenamento = readlinesync.questionInt("Digite o Armazenamento (em GB): ");
                
                let novoSmartphone = new Smartphone(
                    controller.gerarId(),
                    nome,
                    preco,
                    quantidade,
                    modelo,
                    armazenamento
                );
                
            controller.cadastrar(novoSmartphone);
            } else if (tipoProduto === 2) {
                let tipo: string = readlinesync.question(
                "Digite o Tipo do Acessorio (Ex: Capinha, Fone, Carregador): "
             );
            
            let novoAcessorio = new Acessorio(
            controller.gerarId(),
            nome,
            preco,
            quantidade,
            tipo
             );
             
             controller.cadastrar(novoAcessorio);
            } else {
                console.log(colors.fg.red, "\nTipo de produto inválido!", colors.reset);
            }
            
            keyPress();
             break;

            case 2:
                console.log(colors.fg.whitestrong, 
                    "\n\nListar todos os Produtos\n\n", colors.reset);
                
                controller.listarTodas();
                keyPress()
                break;

            case 3:
                console.log(colors.fg.whitestrong, 
                    "\n\nAtualizar Dados do Produto\n\n", colors.reset);
                    
                let id: number = readlinesync.questionInt(
                    "Digite o ID do Produto que deseja Atualizar: "
                );
                
                let produtoEncontrado = controller.buscarNoArray(id);
                
                if (produtoEncontrado != null) {
                    let nomeAtualizado = readlinesync.question("Digite o Novo Nome: ");
                    let precoAtualizado = readlinesync.questionFloat("Digite o Novo Preco: ");
                    let quantidadeAtualizada = readlinesync.questionInt("Digite a Nova Quantidade: ");

                if (produtoEncontrado instanceof Smartphone) {
                    let modeloAtualizado = readlinesync.question("Digite o Novo Modelo: ");
                    let armazenamentoAtualizado = readlinesync.questionInt(
                        "Digite o Novo Armazenamento (GB): "
                    );
                    let smartphoneAtualizado = new Smartphone(
                        id,
                        nomeAtualizado,
                        precoAtualizado,
                        quantidadeAtualizada,
                        modeloAtualizado,
                        armazenamentoAtualizado
                    );
                    controller.atualizar(smartphoneAtualizado);
                } else if (produtoEncontrado instanceof Acessorio) {
                    let tipoAtualizado = readlinesync.question(
                        "Digite o Novo Tipo do Acessorio: "
                    );
                    
                    let acessorioAtualizado = new Acessorio(
                        id,
                        nomeAtualizado,
                        precoAtualizado,
                        quantidadeAtualizada,
                        tipoAtualizado
                    );
                    controller.atualizar(acessorioAtualizado);
                }

                } else {
                console.log(colors.fg.red,
                    "\nO Produto com o ID " + id + " não foi encontrado!",
                    colors.reset
                );
                }
                keyPress();
                break;
                 
            case 4:
                console.log(colors.fg.whitestrong, 
                    "\n\nDeletar Produto\n\n", colors.reset);
                
                let idDeletar: number = readlinesync.questionInt("Digite o ID do Produto a ser Deletado: ");
                controller.deletar(idDeletar);
                
                keyPress()
                break;

            default:
                console.log(colors.fg.redstrong, 
                    "\nOpção Inválida!\n", colors.reset);

                keyPress()
                break;
        }
    }
}

function sobre(): void {
    console.log("\n******************************************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Alissia Sousa - alissiasuelen@hotmail.com");
    console.log("https://github.com/alissasousadev/sistema-controle-de-estoque_projeto_generation");
    console.log("********************************************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();