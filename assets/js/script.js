let numero_jogadores = 0;
let cartelas = ['maca', 'abacaxi', 'caqui', 'pimenta']; 
let jogadores = {}; 
let jogador_atual = 1;
let num_cesta_atual = 0;
let numero_cartelas_no_jogo = 0;

document.body.onload = () => {
    document.getElementById("container-regras").style.display = "none";
    document.getElementById("container-formulario").style.display = "flex";
    document.getElementById("jogo").style.display = "none";
    embaralharCartoes();
}

function mostrar_regras() {
    document.getElementById("jogo").style.display = "none";
    document.getElementById("container-formulario").style.display = "none";
    document.getElementById("container-regras").style.display = "flex";
}

document.getElementById("botao-regras-sair").addEventListener("click", () => {
    document.getElementById("container-regras").style.display = "none";
    document.getElementById("jogo").style.display = "flex";
    sortear_cartelas();
    mostrar_cesta(jogadores[`Jogador ${jogador_atual}`][num_cesta_atual]);
})

document.getElementById("botao-enviar").addEventListener("click", function(event) {
    event.preventDefault(); 
    numero_jogadores = document.getElementById("usuarios").value;
    if (validar_numero_jogadores()) {
        mostrar_regras();
    }
});

document.getElementById("icone_info").addEventListener("click", () => {
    mostrar_regras();
})

document.getElementById("botao-regras-sair").addEventListener("click", () => {
    document.getElementById("container-regras").style.display = "none";
})

function validar_numero_jogadores() {
    if (numero_jogadores <= 1 || numero_jogadores > 4) {
        alert("Número de jogadores inválido. Tente novamente.")
        return 0
    }
    return 1
}

function numero_cartelas_por_jogador() {
    if (!validar_numero_jogadores()) return 0;
    return Math.ceil(cartelas.length / numero_jogadores);
}

function sortear_cartelas() {

    for (let i = 1; i <= numero_jogadores; i++) {
        jogadores[`Jogador ${i}`] = [];
    }

    for (let i = 0; i < 2; i++) { 
        for (let j = 1; j <= numero_jogadores; j++) {

            let cartelaIndex = Math.floor(Math.random() * cartelas.length);
            let cartelaSorteada = cartelas.splice(cartelaIndex, 1)[0];
            jogadores[`Jogador ${j}`].push(cartelaSorteada);
        }
    }

    console.log(jogadores);
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var element = document.getElementById(data);
    if (element) {
        ev.target.appendChild(element);
        trocar_jogador_atual();
    }
}


function trocar_jogador_atual() {

    jogador_atual++;

    if (jogador_atual > numero_jogadores) {
        jogador_atual = 1;

        if (numero_jogadores == 2) {
            num_cesta_atual = (num_cesta_atual === 0) ? 1 : 0;
        }
    }

    let cesta = jogadores[`Jogador ${jogador_atual}`][num_cesta_atual];
    mostrar_cesta(cesta);
}

function virar_cartao(id) { 
    let elemento_atual = document.getElementById(id);
    let outro_lado = id.includes("frente") 
        ? id.replace("frente", "verso") 
        : id.replace("verso", "frente");

    if (elemento_atual.style.display === "block" || elemento_atual.style.display === "") {
        elemento_atual.style.display = "none";
        document.getElementById(outro_lado).style.display = "block";
    } else {
        elemento_atual.style.display = "block";
        document.getElementById(outro_lado).style.display = "none";
    }
}

function embaralharCartoes() {
    const containerBloco = document.getElementById('container-bloco-cartoes');
    const linhasCartoes = Array.from(containerBloco.getElementsByClassName('container-linha-cartoes'));

    // Armazena todos os cartões de todas as linhas em um único array
    let todosCartoes = [];
    linhasCartoes.forEach(linha => {
        const cartoes = Array.from(linha.getElementsByClassName('container-img-cartao'));
        todosCartoes = todosCartoes.concat(cartoes);
    });

    // Embaralha o array de cartões usando o algoritmo Fisher-Yates
    for (let i = todosCartoes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todosCartoes[i], todosCartoes[j]] = [todosCartoes[j], todosCartoes[i]];
    }

    // Limpa o container e recria as linhas
    containerBloco.innerHTML = '';
    let index = 0;
    linhasCartoes.forEach(linha => {
        linha.innerHTML = '';  // Limpa a linha atual
        // Adiciona três cartões embaralhados em cada linha
        for (let i = 0; i < 3; i++) {
            linha.appendChild(todosCartoes[index++]);
        }
        containerBloco.appendChild(linha);  // Reinsere a linha no container
    });
}

function mostrar_cesta(cesta) {
    let id_cesta = `cesta_${cesta}`;
    console.log(id_cesta);

    let sacolas = document.getElementsByClassName('sacolas');
    for (let i = 0; i < sacolas.length; i++) {
        sacolas[i].style.display = "none";
    }

    document.getElementById(id_cesta).style.display = "block";
}

