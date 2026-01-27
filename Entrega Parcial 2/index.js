import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

/* colocar todas as classes aqui */

class Condutor{
    /*tenho que fazer um contador para id para a versão final, no cond e no agt*/
    constructor(id,nome,email,senha){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
}

class Agente{
    constructor(id,nome,matricula,senha){
        this.id = id;
        this.nome = nome;
        this.matricula = matricula;
        this.senha = senha;
    }

}

// SISTEMA , onde vou coletar os dados 

class Sistema{
    constructor(){
        this.condutores=[];
        this.agentes = [];

        this.usuariologado = null;
        this.perfil = null;

        this.rl = readline.createInterface({ input, output });
    }

    /* Aqui eu vejo os controles de acesso*/
    exigirLogin(perfilExigido){
        if(this.usuariologado===null){
        console.log("Você precisa estar logado para ter acesso ao sistema.");
        return false;
        }
    if(perfilExigido && this.perfil!==perfilExigido){
        console.log("Acesso negado. Não é possível acessar.");
        return false;
    }
    return true;
    }

    /* agora, começar a trabalhar nos menus */

    async iniciar(){
        await this.menuInicial();
    }
    async menuInicial(){
    console.log("SISTEMA MULTAS");
    console.log("Digite o número da ação que melhor te descreve:")
    console.log("[1]Login - Agente");
    console.log("[2] Login - Condutor");
    console.log("[3] Cadastrar - Condutor");
    console.log("[4] Cadastrar - Agente");
    console.log("[5] Sair");

    const opcao = await this.rl.question("Digite aqui: ");

    // diferentes casos, declarar esses metodos

    switch(opcao){
        case "1": return this.loginAgente();
        case "2": return this.loginCondutor();
        case "3": return this.cadastrarCondutor();
        case "4": return this.cadastrarAgente();
        case "5": return this.sair();
        default:
            console.log("Opção inválida.")
            return this.menuInicial();
    }

    }
    // menu do agente primeiro
    async menuAgente(){
        console.log(`MENU AGENTE (${this.usuariologado.nome})`);
        console.log("[1]Ver todas as multas");
        console.log("[2]Alterar status da multa");
        console.log("[3]Logout");
// usar decoros para as multas já que por enquanto vai ser só login
        const opcao = await this.rl.question("Escolha:")

        if(opcao===3){
            return this.logout();
        }

        else if(opcao===1){
            if(!this.exigirLogin("AGENTE")){
                return this.menuInicial();}
            console.log("(decoracao) Listagem geral de multas");
            }
        else if(opcao===2){
            if (!this.exigirLogin("AGENTE")) return this.menuInicial();
      console.log("(decoracao) Alterar status da multa.");
        }

        return this.menuAgente();

        }
//final do menu do agente, agora fazer o menu do condutor

// o condutor tem varias acoes, nao esquece de nenhuma
    async menuCondutor(){
        console.log(`MENU CONDUTOR (${this.usuariologado.nome})===`);
        console.log("[1]Ver meus dados");
        console.log("[2] Ver minhas multas");
        console.log("[3] Cadastrar veiculo");
        console.log("[4] Pagar multa");
        console.log("[5] Recorrer multa");
        console.log("[6] Logout");   

        const opcao = await this.rl.question("Escolha: ");

        if (opcao === "6") return this.logout();

    if (opcao === "1") {
      if (!this.exigirLogin("CONDUTOR")) return this.menuInicial();
      console.log(this.usuariologado);
    }

    if (opcao === "2") {
      if (!this.exigirLogin("CONDUTOR")) return this.menuInicial();
      console.log("() Minhas multas.");
    }

    if (opcao === "3") {
      if (!this.exigirLogin("CONDUTOR")) return this.menuInicial();
      console.log("() Cadastro de veiculo.");
    }

    if (opcao === "4") {
      if (!this.exigirLogin("CONDUTOR")) return this.menuInicial();
      console.log("(placeholder) Multa paga.");
    }

    if (opcao === "5") {
      if (!this.exigirLogin("CONDUTOR")) return this.menuInicial();
      console.log("(placeholder) Multa recorrida.");
    }

    return this.menuCondutor();

    }
// SEÇÃO DE LOGIN

    async loginAgente(){
        if(this.usuariologado){
            return this.redirecionarMenu();
            // redirecionando o cara que já fez login
        }
        console.log("LOGIN AGENTE")
    const matricula = await this.rl.question("Matricula:")
const senha = await this.rl.question("Senha: ");

    const agente = this.agentes.find(
      (a) => a.matricula === matricula && a.senha === senha
    );

    if (!agente) {
      console.log("Credenciais invalidas.");
      return this.menuInicial();
    } // mais validação de usuário

    this.usuariologado = agente;
    this.perfil = "AGENTE";
    return this.menuAgente();
  }
  
  async loginCondutor() {
    if (this.usuariologado) return this.redirecionarMenu();

    console.log("\n=== LOGIN CONDUTOR ===");
    const email = await this.rl.question("Email: ");
    const senha = await this.rl.question("Senha: "); // mais uma área de input

    const condutor = this.condutores.find(
      (c) => c.email === email && c.senha === senha
    );

    if (!condutor) {
      console.log("Credenciais invalidas.");
      return this.menuInicial();
    }

    this.usuariologado = condutor;
    this.perfil = "CONDUTOR";
    return this.menuCondutor(); // menu condutor
  }
  redirecionarMenu() {
    if (this.perfil === "AGENTE") return this.menuAgente();
    if (this.perfil === "CONDUTOR") return this.menuCondutor();
    return this.menuInicial();
  }

  logout() {
    this.usuariologado = null;
    this.perfil = null;
    console.log("Logout feito.");
    return this.menuInicial();
  }

  async cadastrarCondutor() { 
    if (this.usuariologado) return this.redirecionarMenu();
    console.log("\n=== CADASTRO CONDUTOR ===");
    const id = await this.rl.question("ID: ");
    const nome = await this.rl.question("Nome: "); // seção de cadastro condutor
    const email = await this.rl.question("Email: ");
    const senha = await this.rl.question("Senha: ");

    }
    }

// o código só cobre a parte do login no momento (quase toda)


const sistema = new Sistema();
await sistema.iniciar();