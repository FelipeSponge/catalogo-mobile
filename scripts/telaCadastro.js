const elementoNome = document.querySelector(
  ".tela-cadastro__campos-input--nome"
);
const elementoEmail = document.querySelector(
  ".tela-cadastro__campos-input--email"
);
const elementoSenha = document.querySelector(
  ".tela-cadastro__campos-input--senha"
);
const formularioCadastro = document.querySelector(".tela-cadastro__formulario");
const avisoCadastroEfetuado = document.querySelector(
  ".tela-cadastro__campos--efetuado"
);

const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const lista = JSON.parse(localStorage.getItem("lista")) || [];
avisoCadastroEfetuado.textContent = "";

function cadastro() {
  const usuarioDados = {
    nome: elementoNome.value,
    email: elementoEmail.value,
    senha: elementoSenha.value,
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
  };

  usuarios.push(usuarioDados);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  const listaUsuario = {
    id: usuarioDados.id,
    lista: [],
  };

  lista.push(listaUsuario);

  localStorage.setItem("lista", JSON.stringify(lista));
}

function resetCampos() {
  elementoNome.value = "";
  elementoEmail.value = "";
  elementoSenha.value = "";
}

formularioCadastro.addEventListener("submit", (e) => {
  e.preventDefault();
  cadastro();
  resetCampos();
  avisoCadastroEfetuado.textContent = "Cadastro efetuado";
});
