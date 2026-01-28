var requisicao = require('readline-sync');
/*var idade = requisicao.question("idade:")
console.log(`idade: ${idade}`)*/

// as classes que não são o sistema nao tem métodos, só atributos

class Veiculo{
    constructor(placa,modelo,marca,cor){
        this.placa = placa,
        this.modelo = modelo,
        this.marca = marca,
        this.cor = cor
        }
}
// vou fazer contadores para servirem como ID para quem precisa de um ID próprio


class Condutor{
    constructor(ID_condutor, nome_condutor, cpf_condutor, data_de_nascimento_condutor, email_condutor,senha_condutor){
        this.ID_condutor= ID_condutor,
        this.nome_condutor = nome_condutor,
        this.cpf_condutor = cpf_condutor,
        this.data_de_nascimento_condutor = data_de_nascimento_condutor,
        this.email_condutor = email_condutor
        this.senha_condutor = senha_condutor
    }
}

class Agente{
    constructor(ID_agente, nome_agente, cpf_agente, data_de_nascimento_agente, email_agente, senha_agente, num_de_matricula){

        this.ID_agente=ID_agente,
        this.nome_agente =nome_agente,
        this.data_de_nascimento_agente = data_de_nascimento_agente,
        this.cpf_agente=cpf_agente,
        this.email_agente=email_agente,
        this.senha_agente = senha_agente
        this.num_de_matricula = num_de_matricula // o usuário vai ter um núm de matricula eu acho(perguntar isso)
    }
}

class Multa{
    constructor(ID_multa,ID_condutor, tipo_infração, valor_multa, data_multa, status_multa){
        this.ID_multa = ID_multa,
        this.ID_condutor = ID_condutor,
        this.tipo_infração = tipo_infração,
        this.valor_multa = valor_multa,
        this.data_multa = data_multa,
        this.status_multa = status_multa
    }
}

//com isso feito, preciso fazer a class sistema, que é onde vão ter todos os métodos

class Sistema{

    constructor(){
        this.condutores=[]
        this.veiculos = []
        this.multas = []
        this.agentes= []
        this.usuariologado= null;
        this.perfil = null;
        this.proximoidmulta = 1;
    }

// primeira interface: o login com o usuário do sistema
    fazerLogin(){
        console.log("SEGUE O FLUXO CONCESSIONÁRIA")
        console.log("SISTEMA DE CONTROLE DE MULTAS")
        console.log("Digite o número que representa a ação que deseja realizar")
        console.log("[1]-Condutor - Login \n [2]-Condutor-Cadastro \n [3]-Agente-Login \n [4]-Agente-Cadastro \n [5]-Sair" 
        )
        var opcao = requisicao.question("Digite aqui:")
// ele vai redirecionar de acordo com a escolha, ou seja, vai executar uma função diferente
        if(opcao==="1"){
            this.loginCondutor();
        }

        else if(opcao==="2"){
            this.cadastroCondutor();
        }

        else if(opcao==="3"){
            this.loginAgente();
        }

        else if(opcao==="4"){
            this.cadastroAgente();
        }

        else if(opcao==="5"){
            this.sairDoSisitema();
        }

        else{
            console.log("Opção inválida. Programa encerrado.")
        }
    }

    // agora eu tenho que fazer as funções que eu defini

    // primeiro os cadastros, depois os logins

// não vou fazer os debuggins agora (ex: verificar se a idade é um número inteiro), se der tempo faço isso

    cadastroCondutor(){
        console.log("Seção de cadastro - Condutor")
        var nome_condutor = requisicao.question("Nome:")
        var cpf_condutor = requisicao.question("CPF:")
        var data_de_nascimento_condutor = requisicao.question("Data de nascimento (XX/XX/XXXX):")
        var email_condutor_cadastro = requisicao.question("email:")
        var senha_condutor_cadastro = requisicao.question("senha:")
        const ID_condutor = this.condutores.length +1;
        const condutor = new Condutor(ID_condutor,nome_condutor, cpf_condutor, data_de_nascimento_condutor, email_condutor_cadastro, senha_condutor_cadastro)
        this.condutores.push(condutor)
        Condutor.isCadastrado= true;

        if(typeof nome_condutor!=="string" && nome_condutor.trim().lenght >0){
            console.log("Nome inválido. O nome deve ser composto por caracteres e não pode ser vazio")
            return
        }

        if(cpf_condutor.length!==11){
            console.log("CPF inválido. O CPF deve conter 11 dígitos")
            return
        }

        if(data_de_nascimento_condutor.length!==8){
            console.log("A data de nascimento deve conter 8 numero [DD//MM//AAAA]")
            return
        }

        if(!email_condutor_cadastro.includes("@")){
            console.log(`Email inválido. Emails devem conter o caracter @`)
            return
        }

        // verificar o fato de uns caras ai terem que ser números

        // agora, com o cadastro feito, eu tenho que redirecionar o usuário para o login

        var opcao = requisicao.question("digite [1] para seguir para o login:")
        if(opcao==="1"){
            this.loginCondutor();
        }
        else{
            console.log("Programa finalizado.")
            this.sairDoSisitema();
        }
    }

// começar a sessão de reconhecimento do agente agora

    cadastroAgente(){
        console.log("Seção de cadastro - Agente")
         var nome_agente = requisicao.question("Nome:")
        var cpf_agente = requisicao.question("CPF:")
        var data_de_nascimento_agente = requisicao.question("Data de nascimento (XX/XX/XXXX):")
        var email_agente_cadastro = requisicao.question("email:")
        var senha_agente_cadastro = requisicao.question("senha:")
        var num_de_matricula = requisicao.question("numero de matricula:")

        if(typeof nome_agente!=="string" && nome_agente.trim().lenght >0){
            console.log("Nome inválido. O nome deve ser composto por caracteres e não pode ser vazio")
            return
        }

        if(cpf_agente.length!==11){
            console.log("CPF inválido. O CPF deve conter 11 dígitos")
            return
        }

        if(data_de_nascimento_agente.length!==8){
            console.log("A data de nascimento deve conter 8 numero [DD//MM//AAAA]")
            return
        }

        if(!email_condutor_cadastro.includes("@")){
            console.log(`Email inválido. Emails devem conter o caracter @`)
            return
        }

        // falta verificar se tudo isso é número ou não (menos o nome)

        
// pronto, aqui peguei os dados do agente
        const ID_agente = this.agentes.length+1;
        const agente = new Agente(ID_agente, nome_agente, cpf_agente, data_de_nascimento_agente, email_agente_cadastro, senha_agente_cadastro, num_de_matricula )
        this.agentes.push(agente)
        Agente.isCadastrado = true;
// outro redirecionamento
        var opcao = requisicao.question("digite [1] para seguir para o login")

        if(opcao==="1"){
            this.loginAgente();
        }

        else{
            console.log("Programa finalizado.")
            this.sairDoSisitema();
        }
    }

// você precisa consertar essa bagunça que você fez no cadastro (PS:foi consertada)

// agora começar a trabalhar nos logins de condutor e agente

    loginCondutor(){
        if (Condutor.isCadastrado === true){
        var email_login_condutor = requisicao.question("email:")
        var senha_login_condutor = requisicao.question("senha:")
        const condutor = this.condutores.find(c => c.email_condutor === email_login_condutor && c.senha_condutor === senha_login_condutor);
        if (!condutor) {
        console.log("Email ou senha incorretos.");
        return;
    }

// comparação com os dados do cadastro feita

        this.usuariologado = condutor;
        this.perfil = "condutor"
        console.log("Você está logado no sistema como CONDUTOR") // e ai preciso colocar tudo o que o condutor pode fazer (e guiar o usuário)
        console.log("Pressione o número relativo à ação que deseja realisar")
         var opcao= requisicao.question("[1]- Ver Meus Dados \n [2]- Ver minhas multas \n [3] cadastrar veículo \n [4]- Pagar multa \n [5]- Recorrer multa")

// essas opções vão ser recorrentes ao longo do código, foi meu modo de deixar o uso mais intuitivo

                if(opcao==="1"){
                this.verMeusDadosCondutor(); // tenho que fazer todas essas funções ainda
                }

                else if(opcao==="2"){
                this.verMinhasMultas();
                }

                else if(opcao==="3"){
                this.cadastrarVeiculo();
                }

                else if(opcao==="4"){
                this.pagarMulta();
                }

                else if(opcao==="5"){
                this.recorrerMulta();
                }

                else{
                console.log("opcao invalida")
                this.sairDoSisitema();
                }

            }
            else{
                console.log("você não está cadastrado")
                this.cadastroCondutor();
            }
        }

// mesmo procedimento, agora com as mudanças pro agente

    loginAgente(){
        if(Agente.isCadastrado===true){
            var email_login_agente = requisicao.question("email:")
            var senha_login_agente = requisicao.question("senha:")
            const agente = this.agentes.find(a=>a.email_agente === email_login_agente && a.senha_agente=== senha_login_agente)
            if(!agente){
                console.log("Email ou senha incorretos.")
                return;
                // perguntar se eu tenho que botar um this.fazerLogin() aqui 
            }
            this.usuariologado = agente;
            this.perfil = "agente";
                console.log("Você está logado como AGENTE")
                // e a partir daqui listar tudo que o agente pode fazer
                console.log("Digite o número que melhor corresponde à ação que deseja realizar:")
                console.log("[1]- Ver meus dados \n [2]- Ver lista de veículos \n [3]-Ver lista de condutores\n [4]-Aplicar multa  \n [5]-Ver todas as multas \n [6]-Alterar status da multa")
                var opcao = requisicao.question("Digite aqui:")
                if(opcao=="1"){
                    // de novo, vou ter que declarar essas funções todas
                    this.verMeusDadosAgente();
                }
                else if(opcao==="2"){
                    this.verListaDeVeiculos();
                }

                else if(opcao==="3"){
                    this.verListaDeCondutores();
                }

                else if(opcao==="4"){
                    this.aplicarMulta();
                }

                else if(opcao==="5"){
                    this.verTodasAsMultas();
                }

                else if(opcao==="6"){
                    this.alterarStatusDaMulta();
                }

                else{
                    console.log("opcao invalida")
                    this.sairDoSisitema()
                }
            }
        else{
            console.log("você não está logado. vamos te redirecionar para o cadastro")
            this.cadastroAgente();
        }
        }

    
    /* funções que eu preciso (ainda) declarar => att: status : 12/12
    
    verMeusDadosCondutor
    verMinhasMultas
    cadastrarVeiculo
    pagarMulta
    recorrerMulta
    sairDoSisitema
    verMeusDadosAgente
    verListaDeVeiculos
    verListaDeCondutores
    aplicarMulta
    verTodasAsMultas
    alterarStatusDaMulta

    */

// usar os dados coletados do cadastro
    verMeusDadosCondutor(){
        console.log("SEÇÃO DE DADOS - CONDUTOR")
        console.log(`ID: ${this.usuariologado.ID_condutor}`)
        console.log(`Nome: ${this.usuariologado.nome_condutor}`)
        console.log(`CPF: ${this.usuariologado.cpf_condutor}`)
        console.log(`Data de nascimento : ${this.usuariologado.data_de_nascimento_condutor}`)
        console.log(`email: ${this.usuariologado.email_condutor}`)
    }

// filtrar multas por usuário
    verMinhasMultas(){
        console.log("SUAS MULTAS")

        var multasDoCondutor = this.multas.filter((multadada)=> multadada.ID_condutor === this.usuariologado.ID_condutor
    )
        if(multasDoCondutor.lenght === 0){
            console.log("Você não possui multas.")
        }

        multasDoCondutor.forEach((multadada)=> {
            console.log(`ID: ${multadada.ID_multa} | Tipo: ${multadada.tipo_infração} | Status: ${multadada.status_multa}`)
        })
    }

// filtrar multa por usuário

    cadastrarVeiculo(){

        console.log("SEÇÃO DE CADASTRO DE VEÍCULO")
        var placa = requisicao.question("Placa:")
        var modelo = requisicao.question("Modelo:")
        var marca = requisicao.question("Marca:")
        var cor = requisicao.question("Cor:")
        this.veiculos.push(new Veiculo(placa,modelo,marca,cor))


    } 

// pagamento de multa (voltar nesse mais pro final)

    pagarMulta(){
        console.log("Área de pagamento de multa") 
        var multasDoCondutor = this.multas.filter((multadada)=> multadada.ID_condutor === this.usuariologado.ID_condutor
        );

        // ver se o usuário sequer tem uma multa

        if(multasDoCondutor.lenght === 0){
            console.log("Você não possui multas a serem pagas")
        }

        multasDoCondutor.forEach((multadada)=> {
            console.log(`ID: ${multadada.ID_multa} | Tipo: ${multadada.tipo_infração}`)
        })

        var ident_multa = id_texto

        var id_texto = requisicao.question("Digite o ID da multa que deseja pagar:")

        var multa = this.multas.find((multaitem) => multaitem.ID_multa === ident_multa && multaitem.ID_condutor === this.usuariologado.ID_condutor);
// encontrando a multa desejada

        if(!multa){
            console.log("Multa não encontrada ou não pertencente ao condutor")
            return;
        }

        if(multa.status_multa=== "paga"){
            console.log("Esta multa já está paga")
            return;
        }

        // agora, mudar o status da multa

        var opcao = requisicao.question("Digite [1] para pagar a multa: ")

        if(opcao ==="1"){
            console.log("O status da multa mudou para: PAGA")
            multa.status_multa = "paga"
        }

        else{
            console.log("você optou por não pagar a multa")
        }

    }

    // fazer um processo parecido com o de pagar, mas agora para recorrer

    recorrerMulta(){
        console.log("Recorra aqui")
        var multasDoCondutor = this.multas.filter((multadada)=> multadada.ID_condutor === this.usuariologado.ID_condutor)


        if(multasDoCondutor.length === 0){
            console.log("Você não tem multas a recorrer")
        }
        multasDoCondutor.forEach((multadada)=> {
            console.log(`ID: ${multadada.ID_multa} | Tipo: ${multadada.tipo_infração}`)
        })

        // filtro por ID

        var id_texto = requisicao.question("Digite o ID da multa que deseja :")

        var multa = this.multas.find((multaitem) => multaitem.ID_multa === ident_multa && multaitem.ID_condutor === this.usuariologado.ID_condutor);


        if(!multa){
            console.log("Multa não encontrada ou não pertencente ao condutor")
        }

        if(multa.status_multa=== "paga"){
            console.log("Esta multa já está paga")
            this.sairDoSisitema()
        }

        var opcao = requisicao.question("Digite [1] para recorrer a multa: ")

        // mudando o status da multa

        if(opcao ==="1"){
            console.log("O status da multa mudou para: RECORRIDA")
            multa.status_multa = "recorrida"
        }

        else{
            console.log("você optou por não recorrer à multa")
        }

    }

    // pesquisar uma função exit

    sairDoSisitema(){
        console.log("Saindo do sistema...")
        process.exit(0);
    }


    // amostragem de dados agora do agente

    verMeusDadosAgente(){
        console.log('DADOS DO AGENTE DE TRÂNSITO')
        console.log(`ID: ${this.ID_count_agente}`)
        console.log(`Nome: ${this.nome_agente}`)
        console.log(`CPF: ${this.cpf_agente}`)
        console.log(`Data de nascimento: ${this.data_de_nascimento_agente}`)
        console.log(`email: ${this.email_agente}`)
    }

    // mostrar dados gerais para o agente, não apenas um específico como no usuário

    verListaDeVeiculos(){
        this.veiculos.forEach(veiculo=>
        {
            console.log(veiculo);
        }
        ) // this.veiculos =[]
    }

    verListaDeCondutores(){
        this.condutores.forEach(condutor=>{
            console.log(condutor);
        })
    }

    // aplicação de multa(fazer depois)

    aplicarMulta(){
        console.log("SEÇÃO - APLICAR MULTA")
        var email_condutor = requisicao.question("Email do condutor multado:")
        var condutor = this.condutores.find((condutormulta)=> condutormulta.email_condutor === email_condutor)

        if(!condutor){
            console.log("Condutor não encontrado.")
            return;
        }


        var tipo_infração = requisicao.question("Tipo de infração:")
        var valor_multa_texto = requisicao.question("Valor da multa:")
        var valor_multa = Number(valor_multa_texto)

        var data_multa = requisicao.question("data da multa: ")
        var status_multa = "pendente"

        this.multas.push(new Multa(this.proximoidmulta, condutor.ID_condutor, tipo_infração, valor_multa, data_multa, status_multa ))

    }

    // mais displays de conteúdo

    verTodasAsMultas(){
        this.multas.forEach(multa=>{
            console.log(multa);
        })
    }

    alterarStatusDaMulta(){
        console.log("Página de alteração de status de multa")
        var ident_multa= requisicao.question("Digite o ID da multa:")
        var multa = this.multas.find((multadada)=> multadada.ID_multa === ident_multa)

        if(!multa){
            console.log("multa não encontrada")
            return;
        }

        var opcao = requisicao.question("Digite a tecla correspondente para o novo status desejado da multa: \n [1]-pendente \n [2]-paga \n [3]-recorrida")

        if(opcao==="1"){
            console.log("O status da multa agora é PENDENTE")
            multa.status_multa = "pendente"
        }

        else if(opcao==="2"){
            console.log("O status da multa agora é PAGA")
            multa.status_multa ="paga"
        }

        else if(opcao==="3"){
            console.log("O status da multa agora é RECORRIDA")
            multa.status_multa = "recorrida"
        }

        else{
            console.log("Opção inválida")
        }
    }
}

/*  personal note - dar o commit no github
    git status (ver se aparece main)
    git add .
    git commit -m "mensagem do commit"
    git push
    git status(de novo só pra ver se a branch tá up to date com 'origin/main')
 */

const sistema = new Sistema();
sistema.fazerLogin();
