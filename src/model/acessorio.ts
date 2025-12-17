import { Produto } from "./produto";

export class Acessorio extends Produto {

    private _tipo: string;

    constructor(id: number, nome: string, preco: number, quantidade: number, tipo: string) {
        super(id, nome, preco, quantidade);
        this._tipo = tipo;
    }

    public get tipo(): string {
        return this._tipo;
    }

    public set tipo(tipo: string) {
        this._tipo = tipo;
    }

    public visualizar(): void {
        super.visualizar();
        console.log("Tipo do Acessório: " + this._tipo);
    }
}