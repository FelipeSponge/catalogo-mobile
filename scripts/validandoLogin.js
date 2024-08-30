const elementoEmail = document.querySelector(
  ".tela-inicio__campos-input--email"
);
const elementoSenha = document.querySelector(
  ".tela-inicio__campos-input--senha"
);
const formularioEntrar = document.querySelector(".tela-inicio__formulario");
let avisoDeLoginIncorreto = document.querySelector(
  ".tela-inicio__campos--aviso"
);

resetCampos();

let usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

conferindoStatusDeLogin(usuarioAtual);

formularioEntrar.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailRecebido = elementoEmail.value;
  const senhaRecebido = elementoSenha.value;
  const usuarios = JSON.parse(localStorage.getItem("usuarios"));

  let loginBemSucedido = false;

  usuarios.forEach((usuario) => {
    if (emailRecebido == usuario.email && senhaRecebido == usuario.senha) {
      usuarioAtual = usuario;
      window.location.href = "../pages/conteudo.html";
      localStorage.setItem("usuarioAtual", JSON.stringify(usuario));
      resetCampos();
      loginBemSucedido = true;
    }
  });
  if (!loginBemSucedido) {
    avisoDeLoginIncorreto.textContent = "Email ou senha incorretos";
  }
});

function resetCampos() {
  elementoEmail.value = "";
  elementoSenha.value = "";
  avisoDeLoginIncorreto = "";
}

function conferindoStatusDeLogin(usuario) {
  usuario ? (window.location.href = "../pages/conteudo.html") : (usuario = "");
}

export default usuarioAtual;
