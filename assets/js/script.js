let numero_jogadores = 0

document.body.onload = () => {
    document.getElementById("container-regras").style.display = "none";
    document.getElementById("container-formulario").style.display = "flex";
    document.getElementById("jogo").style.display = "none";
}

function mostrar_regras() {
    document.getElementById("jogo").style.display = "none";
    document.getElementById("container-formulario").style.display = "none";
    document.getElementById("container-regras").style.display = "flex";
}

document.getElementById("botao-regras-sair").addEventListener("click", () => {
    document.getElementById("container-regras").style.display = "none";
    document.getElementById("jogo").style.display = "flex";
})

document.getElementById("botao-enviar").addEventListener("click", function(event) {
    event.preventDefault();  // Previna o comportamento padrão do formulário
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
    validar_numero_jogadores();
    return Math.ceil(4 / numero_jogadores);
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
    ev.target.appendChild(document.getElementById(data));
}
