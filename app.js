let = listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Exibe a Mensagem na tela se o usuário acertou ou não
function exibirMensagemNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Exibe a Mensagem inicial do Jogo
function exibirMensagemInicial() {
    exibirMensagemNaTela('h1', 'Jogo do Número Secreto');
    exibirMensagemNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

// Faz a validação do chute com o número secreto para exibir a mensagem de acerto em tela e 
// habilita o campo novo jogo para jogar denovo
function verificarChute() {    
    let chute = document.querySelector('input').value;    
    if (chute == numeroSecreto){
        exibirMensagemNaTela('h1', 'Acertou!');
        let palavraTentativa =  tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirMensagemNaTela(`p`, mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirMensagemNaTela('p', 'O número secreto é menor');
        } else{
            exibirMensagemNaTela('p', 'O número secreto é maior');
        }
        tentativas++
        limparCampo();
    }
}

// Faz a geração do número aleatorio e valida se já existe o número dentro do Array, para que não seja
// repetito. Importante validar o tamanho da lista para comparar em uma variavel com o número limite para
// jogar
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdNumerosNaLista = listaNumerosSorteados.length;

    if (qtdNumerosNaLista == numeroLimite) {
        listaNumerosSorteados = [];
    }

    if  (listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();

    } else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados)
        return numeroEscolhido;
    }
}

// Limpa o campo do chute 
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Reinicia o jogo para jogar novamente, desabilitando o botão novo jogo e reiciando as tentativas e novo
//numero secreto
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}





