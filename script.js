const perguntas = [
  {
    pergunta: "Qual linguagem define a estrutura de uma página web?",
    opcoes: ["HTML", "CSS", "JavaScript"],
    correta: 0
  },
  {
    pergunta: "Qual linguagem é usada principalmente para estilizar a página?",
    opcoes: ["Python", "CSS", "SQL"],
    correta: 1
  },
  {
    pergunta: "Qual linguagem permite adicionar interatividade à página?",
    opcoes: ["JavaScript", "HTML", "CSS"],
    correta: 0
  }
];

let indiceAtual = 0;
let pontuacao = 0;
let respondeu = false;

const progresso = document.getElementById("progresso");
const pergunta = document.getElementById("pergunta");
const opcoes = document.getElementById("opcoes");
const feedback = document.getElementById("feedback");
const proxima = document.getElementById("proxima");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

function mostrarPergunta() {
  respondeu = false;
  proxima.disabled = true;
  feedback.innerText = "";
  opcoes.innerHTML = "";

  const atual = perguntas[indiceAtual];
  progresso.innerText = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  pergunta.innerText = atual.pergunta;

  atual.opcoes.forEach(function (opcao, indice) {
    const botao = document.createElement("button");
    botao.innerText = opcao;
    botao.className = "opcao";
    botao.addEventListener("click", function () {
      verificarResposta(indice);
    });
    opcoes.appendChild(botao);
  });
}

function verificarResposta(escolha) {
  if (respondeu) return;
  respondeu = true;

  if (escolha === perguntas[indiceAtual].correta) {
    pontuacao++;
    feedback.innerText = "Correto!";
  } else {
    feedback.innerText = `Incorreto! Resposta certa: ${perguntas[indiceAtual].opcoes[perguntas[indiceAtual].correta]}.`;
  }

  proxima.disabled = false;
}

proxima.addEventListener("click", function () {
  indiceAtual++;
  if (indiceAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    quiz.hidden = true;
    resultado.hidden = false;
    resultado.innerHTML = `<h2>Quiz finalizado!</h2><p>Você acertou ${pontuacao} de ${perguntas.length} perguntas.</p>`;
    const reiniciar = document.createElement("button");
    reiniciar.innerText = "Reiniciar";
    reiniciar.addEventListener("click", function () {
      indiceAtual = 0;
      pontuacao = 0;
      resultado.hidden = true;
      quiz.hidden = false;
      mostrarPergunta();
    });
    resultado.appendChild(reiniciar);
  }
});

mostrarPergunta();
