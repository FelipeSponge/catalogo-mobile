import { conectaAPI } from "./conectaApi.js";
const nomeUsuario = document.querySelector(".cabecalho__usuario");
const inputPesquisa = document.querySelector(".cabecalho__pesquisar");
const elementoMenu = document.querySelector(".cabecalho__menu");
const elementoBody = document.querySelector("body");
const elementoMinhaLista = document.querySelector(".minha-lista");
const elementoSecaoLista = document.querySelector(".secao-lista");
const elementoCategoria = document.querySelector(".categorias");
const elementoGenero = document.querySelector(".categoria-conteudo");
const elementoSeriesFilmes = document.querySelector(".filmes-series");
const elementoSeriesFilmesConteudo = document.querySelector(
  ".filmes-series-conteudo"
);
const botoesGeneros = document.querySelectorAll(".categorias__item");
const botaoMenu = document.querySelector(".cabecalho__usuario");
const botaoInicio = document.querySelector(".menu__item--inicio");
const botaoMinhaLista = document.querySelector(".menu__item--lista");
const botaoDeslogar = document.querySelector(".menu__item--sair");
const botaoCategoria = document.querySelector(".menu__item--categorias");

const usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual"));

nomeUsuario.textContent = usuarioAtual.nome;
const idLista = usuarioAtual.id;

function adicionarNaLista(objeto) {
  let listas = JSON.parse(localStorage.getItem("lista"));
  let indexListaAtual = listas.findIndex((lista) => lista.id === idLista);

  listas[indexListaAtual].lista.push(objeto);

  localStorage.setItem("lista", JSON.stringify(listas));
}

function removerDaLista(objeto) {
  let listas = JSON.parse(localStorage.getItem("lista"));
  let indexListaAtual = listas.findIndex((lista) => lista.id === idLista);

  let indexObjeto = listas[indexListaAtual].lista.findIndex(
    (item) => item.nome == objeto.nome
  );

  listas[indexListaAtual].lista.splice(indexObjeto, 1);
  localStorage.setItem("lista", JSON.stringify(listas));
  minhaLista();
}

botaoMenu.addEventListener("click", () => {
  elementoMenu.classList.toggle("hidden");
});
botaoInicio.addEventListener("click", () => {
  document.querySelectorAll(".secoes").forEach((secao) => {
    secao.classList.remove("hidden");
  });
  elementoSecaoLista.classList.add("hidden");
  elementoMenu.classList.add("hidden");
  elementoCategoria.classList.add("hidden");
  elementoGenero.classList.add("hidden");
  elementoSeriesFilmesConteudo.classList.add("hidden");
  page = 1;
});

botaoMinhaLista.addEventListener("click", () => {
  document.querySelectorAll(".secoes").forEach((secao) => {
    secao.classList.add("hidden");
    minhaLista();
  });
  elementoSecaoLista.classList.remove("hidden");
  elementoMenu.classList.add("hidden");
  elementoCategoria.classList.add("hidden");
  elementoGenero.classList.add("hidden");
  elementoSeriesFilmesConteudo.classList.add("hidden");
  page = 1;
});

botaoCategoria.addEventListener("click", () => {
  elementoCategoria.classList.remove("hidden");
  elementoMenu.classList.add("hidden");
  elementoSecaoLista.classList.add("hidden");
  document.querySelectorAll(".secoes").forEach((secao) => {
    secao.classList.add("hidden");
  });
  elementoGenero.classList.add("hidden");
  elementoSeriesFilmesConteudo.classList.add("hidden");
  page = 1;
});

botaoDeslogar.addEventListener("click", () => {
  localStorage.removeItem("usuarioAtual");
  page = 1;
  window.location.href = "../index.html";
});

document.addEventListener("click", (e) => {
  const clickDentroDoMenu =
    elementoMenu.contains(e.target) || botaoMenu.contains(e.target);

  if (!clickDentroDoMenu) {
    elementoMenu.classList.add("hidden");
  }
});

document.querySelector(".cabecalho__titulo").addEventListener("click", () => {
  window.location.href = "../index.html";
});

function organizarLista(lista, nome) {
  const nomeCategoria = nome;
  const listaDeFilmes = lista.results;
  const listaDeFilmesFinal = listaDeFilmes;

  criarSecao(listaDeFilmesFinal, nomeCategoria);
}

async function SeriesEFilmes() {
  const filmesLancamentos = await conectaAPI.buscarFilmesLancamentos();
  const filmesPopular = await conectaAPI.buscarFilmesPopular();
  const filmesBemAvaliados = await conectaAPI.buscarFilmesBemAvaliados();
  const seriesLancamentos = await conectaAPI.buscarSeriesLancamentos();
  const seriesPopular = await conectaAPI.buscarSeriesPopular();
  const seriesBemAvaliados = await conectaAPI.buscarSeriesBemAvaliados();

  organizarLista(filmesLancamentos, "Filmes Lançamentos");
  organizarLista(filmesPopular, "Filmes Populares");
  organizarLista(filmesBemAvaliados, "Filmes Bem Avaliados");
  organizarLista(seriesLancamentos, "Séries No Ar");
  organizarLista(seriesPopular, "Séries Populares");
  organizarLista(seriesBemAvaliados, "Séries Bem Avaliados");
}

function criarSecao(lista, nomeCategoria) {
  const secao = document.createElement("section");
  secao.setAttribute("class", "secoes");

  const titulo = document.createElement("h2");
  titulo.setAttribute("class", "secoes__titulo");
  titulo.textContent = nomeCategoria;

  const swiperContainer = document.createElement("div");
  swiperContainer.setAttribute("class", "swiper-container");

  const swiperWrapper = document.createElement("div");
  swiperWrapper.setAttribute("class", "swiper-wrapper");

  const swiperPagination = document.createElement("div");
  swiperPagination.setAttribute("class", "swiper-pagination");

  secao.append(titulo);
  secao.append(swiperContainer);
  secao.append(swiperPagination);
  swiperContainer.append(swiperWrapper);
  lista.forEach((filmeOuSerie) => {
    const swiperSlide = document.createElement("div");
    swiperSlide.setAttribute("class", "swiper-slide");

    const nome = filmeOuSerie.title || filmeOuSerie.name;
    const slideContent = document.createElement("div");
    slideContent.setAttribute("class", "slide-content");

    const slideNome = document.createElement("h2");
    slideNome.textContent = `${nome}`;

    slideContent.append(slideNome);

    const imagem = filmeOuSerie.poster_path;
    const imageUrl = `https://image.tmdb.org/t/p/w500${imagem}`;
    const imgElemento = document.createElement("img");
    imgElemento.setAttribute("src", imageUrl);

    swiperSlide.append(imgElemento);
    swiperSlide.append(slideContent);

    swiperWrapper.append(swiperSlide);

    const objetoAtual = {
      nome: nome,
      descricao: filmeOuSerie.overview,
      imagem: imageUrl,
      nota: filmeOuSerie.vote_average,
    };

    imgElemento.addEventListener("click", () => {
      criarElementoDescricao(objetoAtual);
      elementoMenu.classList.add("hidden");
      capturarScroll();
    });
  });
  elementoBody.append(secao);
  const swiper = new Swiper(".swiper-container", {
    loop: false, // Permite loop infinito
    slidePerView: 5,
    spaceBetween: -220,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // autoplay: {
    //   delay: 3000, // Tempo de atraso entre os slides em ms
    // },
  });
}

function criarElementoDescricao(item) {
  const descricao = document.createElement("div");
  descricao.setAttribute("class", "descricao");

  const conteudoDescricao = document.createElement("div");
  conteudoDescricao.setAttribute("class", "conteudo__descricao");

  const imgDescricao = document.createElement("img");
  imgDescricao.setAttribute("src", item.imagem);

  const descricaoTitulo = document.createElement("h2");
  descricaoTitulo.setAttribute("class", "conteudo__descricao--titulo");
  descricaoTitulo.textContent = item.nome;

  const nota = document.querySelector("span");
  nota.setAttribute("class", "conteudo__descricao--nota");
  nota.textContent = `Nota: ${item.nota.toFixed(2)}`;

  const descricaoSinopse = document.createElement("p");
  descricaoSinopse.setAttribute("class", "conteudo__descricao--sinopse");
  descricaoSinopse.textContent = item.descricao;

  let listas = JSON.parse(localStorage.getItem("lista"));
  let indexListaAtual = listas.findIndex((lista) => lista.id === idLista);

  let inclusoNaLista = false;

  listas[indexListaAtual].lista.forEach((objeto) => {
    if (objeto.nome == item.nome) {
      inclusoNaLista = true;
    }
  });

  const iconeFavoritar = document.createElement("i");
  iconeFavoritar.setAttribute(
    "class",
    "descricao__icone descricao__icone--desmarcado"
  );

  const imgIconeFavoritar = document.createElement("img");
  imgIconeFavoritar.setAttribute("src", "../img/bookmark.svg");

  iconeFavoritar.append(imgIconeFavoritar);

  imgIconeFavoritar.addEventListener("click", () => {
    adicionarNaLista(item);
    iconeFavoritar.classList.add("hidden");
    iconeFavoritarMarcado.classList.remove("hidden");
  });

  const iconeFavoritarMarcado = document.createElement("i");
  iconeFavoritarMarcado.setAttribute(
    "class",
    "descricao__icone descricao__icone--marcado"
  );

  const imgIconeFavoritarMarcado = document.createElement("img");
  imgIconeFavoritarMarcado.setAttribute("src", "../img/bookmark_added.svg");

  iconeFavoritarMarcado.append(imgIconeFavoritarMarcado);

  imgIconeFavoritarMarcado.addEventListener("click", () => {
    removerDaLista(item);
    iconeFavoritar.classList.remove("hidden");
    iconeFavoritarMarcado.classList.add("hidden");
  });

  if (!inclusoNaLista) {
    iconeFavoritarMarcado.classList.add("hidden");
  } else {
    iconeFavoritar.classList.add("hidden");
  }

  const btVoltar = document.createElement("a");
  btVoltar.classList.add("class", "descricao__botao");
  btVoltar.textContent = "Voltar";

  conteudoDescricao.append(imgDescricao);
  conteudoDescricao.append(descricaoTitulo);
  conteudoDescricao.append(nota);
  conteudoDescricao.append(descricaoSinopse);
  conteudoDescricao.append(iconeFavoritar);
  conteudoDescricao.append(iconeFavoritarMarcado);
  conteudoDescricao.append(btVoltar);
  descricao.append(conteudoDescricao);
  elementoBody.append(descricao);
  btVoltar.addEventListener("click", () => {
    descricao.remove();
  });
}

function minhaLista() {
  elementoMinhaLista.innerHTML = "";

  let listas = JSON.parse(localStorage.getItem("lista"));
  let indexListaAtual = listas.findIndex((lista) => lista.id === idLista);

  const itensMinhaLista = document.createElement("ul");
  itensMinhaLista.setAttribute("class", "minha-lista__items");

  listas[indexListaAtual].lista.forEach((item) => {
    const itemLista = document.createElement("li");
    itemLista.setAttribute("class", "item-lista");

    const itemImagem = document.createElement("img");
    itemImagem.setAttribute("src", item.imagem);

    itemImagem.addEventListener("click", () => {
      criarElementoDescricao(item);
      capturarScroll();
    });

    const itemTitulo = document.createElement("p");
    itemTitulo.setAttribute("class", "item-titulo");
    itemTitulo.textContent = item.nome;

    const iconeFavoritarMarcado = document.createElement("i");
    iconeFavoritarMarcado.setAttribute(
      "class",
      "descricao__icone--marcado--lista "
    );

    const imgIconeFavoritarMarcado = document.createElement("img");
    imgIconeFavoritarMarcado.setAttribute("src", "../img/bookmark_remove.svg");

    const textoFavoritoMarcado = document.createElement("p");
    textoFavoritoMarcado.setAttribute("class", "icone-descricao");
    textoFavoritoMarcado.textContent = "Remover";

    iconeFavoritarMarcado.append(imgIconeFavoritarMarcado);
    iconeFavoritarMarcado.append(textoFavoritoMarcado);

    imgIconeFavoritarMarcado.addEventListener("click", () => {
      removerDaLista(item);
    });

    itemLista.append(itemImagem);
    itemLista.append(itemTitulo);
    itemLista.append(iconeFavoritarMarcado);
    itensMinhaLista.append(itemLista);
  });

  elementoMinhaLista.append(itensMinhaLista);
  elementoSecaoLista.append(elementoMinhaLista);
}

function capturarScroll() {
  const scrollTop = window.scrollY;
  const elemento = document.querySelector(".descricao");
  elemento.style.position = "fixed";
  elemento.style.top = `${scrollTop}`;
  elementoBody.classList.add("no-scroll");
  elemento.style.zIndex = 4;
}

let generoAtual;

botoesGeneros.forEach((botao) => {
  botao.addEventListener("click", () => {
    generoAtual = botao;
    elementoCategoria.classList.add("hidden");
    porCategorias(
      botao.dataset.nome,
      seriesEFilmesPorGenero(botao.id, botao.dataset.nome),
      botao.textContent
    );
  });
});

let page = 1;

async function seriesEFilmesPorGenero(id, tipo) {
  let idAtual = id;
  let tipoAtual = tipo == "filme" ? "movie" : "tv";

  const porGeneros = await conectaAPI.buscarPorGeneros(
    idAtual,
    page,
    tipoAtual
  );

  return porGeneros;
}

async function porCategorias(categoria, items, tipo) {
  let nomeGenero = categoria == "filme" ? "Filmes" : "Séries";

  elementoGenero.innerHTML = "";

  const objetos = await items;

  const listaDeObjetos = objetos.results;

  const generoTitulo = document.createElement("h2");
  generoTitulo.setAttribute("class", "genero__titulo");
  generoTitulo.textContent = nomeGenero;

  const generoTipo = document.createElement("h3");
  generoTipo.setAttribute("class", "genero__tipo");
  generoTipo.textContent = tipo;

  elementoGenero.append(generoTitulo);
  elementoGenero.append(generoTipo);

  listaDeObjetos.forEach((item) => {
    const nome = item.title || item.name;

    const imagem = item.poster_path;
    const imageUrl = `https://image.tmdb.org/t/p/w500${imagem}`;

    const listaCategoria = document.createElement("ul");
    listaCategoria.setAttribute("class", "genero-lista__items");

    const itemCategoria = document.createElement("li");
    itemCategoria.setAttribute("class", "item-genero");

    const itemImagem = document.createElement("img");
    itemImagem.setAttribute("src", imageUrl);

    const objetoDescricao = {
      nome: nome,
      imagem: imageUrl,
      descricao: item.overview,
      nota: item.vote_average,
    };

    itemImagem.addEventListener("click", () => {
      criarElementoDescricao(objetoDescricao);
      capturarScroll();
    });

    const boxTituloNota = document.createElement("div");
    boxTituloNota.setAttribute("class", "genero-box");

    const itemTitulo = document.createElement("p");
    itemTitulo.setAttribute("class", "genero-titulo");
    itemTitulo.textContent = nome;

    const itemNota = document.createElement("p");
    itemNota.setAttribute("class", "genero-nota");
    itemNota.textContent = `Nota: ${item.vote_average.toFixed(2)}`;

    boxTituloNota.append(itemTitulo);
    boxTituloNota.append(itemNota);
    itemCategoria.append(itemImagem);
    itemCategoria.append(boxTituloNota);

    listaCategoria.append(itemCategoria);

    elementoGenero.append(listaCategoria);

    elementoGenero.classList.remove("hidden");
  });

  const botoesProxVolt = document.createElement("div");
  botoesProxVolt.setAttribute("class", "botoesPV");

  const btPaginaProximo = document.createElement("button");
  btPaginaProximo.setAttribute("class", "btPgn btgn-proximo");
  btPaginaProximo.textContent = "Próximo";

  btPaginaProximo.addEventListener("click", () => {
    page += 1;
    porCategorias(
      generoAtual.dataset.nome,
      seriesEFilmesPorGenero(generoAtual.id, generoAtual.dataset.nome),
      generoAtual.textContent
    );
  });

  if (page > 1) {
    const btPaginaVoltar = document.createElement("button");
    btPaginaVoltar.setAttribute("class", "btPgn btgn-anterior");
    btPaginaVoltar.textContent = "Anterior";

    btPaginaVoltar.addEventListener("click", () => {
      page -= 1;
      porCategorias(
        generoAtual.dataset.nome,
        seriesEFilmesPorGenero(generoAtual.id, generoAtual.dataset.nome),
        generoAtual.textContent
      );
    });
    botoesProxVolt.append(btPaginaVoltar);
  }

  botoesProxVolt.append(btPaginaProximo);

  elementoGenero.append(botoesProxVolt);
  console.log(page);
}
inputPesquisa.addEventListener("input", (e) => {
  if (e.target.value == "") {
    document.querySelectorAll(".secoes").forEach((secao) => {
      secao.classList.remove("hidden");
    });
    elementoSecaoLista.classList.add("hidden");
    elementoMenu.classList.add("hidden");
    elementoCategoria.classList.add("hidden");
    elementoGenero.classList.add("hidden");
    elementoSeriesFilmesConteudo.classList.add("hidden");
    page = 1;
  } else {
    buscarNome(e.target.value);
    document.querySelectorAll(".secoes").forEach((secao) => {
      secao.classList.add("hidden");
    });
    elementoSecaoLista.classList.add("hidden");
    elementoMenu.classList.add("hidden");
    elementoCategoria.classList.add("hidden");
    elementoGenero.classList.add("hidden");
    elementoSeriesFilmes.classList.remove("hidden");
  }
});

async function buscarNome(nome) {
  const buscarConteudo = await conectaAPI.buscarPeloNome(nome);
  criarListaDePesquisa(buscarConteudo);
}

function criarListaDePesquisa(listaDeConteudo) {
  const btVoltarInicio = document.querySelector(".filmes-series__botao");
  btVoltarInicio.addEventListener("click", () => {
    document.querySelectorAll(".secoes").forEach((secao) => {
      secao.classList.remove("hidden");
    });
    elementoSecaoLista.classList.add("hidden");
    elementoMenu.classList.add("hidden");
    elementoCategoria.classList.add("hidden");
    elementoGenero.classList.add("hidden");
    elementoSeriesFilmesConteudo.classList.add("hidden");
    page = 1;
  });

  elementoSeriesFilmes.innerHTML = "";
  listaDeConteudo.forEach((item) => {
    const nome = item.title || item.name;
    console.log(item);

    const imagem = item.poster_path;
    const imageUrl = `https://image.tmdb.org/t/p/w500${imagem}`;

    const listaSeriesFilmes = document.createElement("ul");
    listaSeriesFilmes.setAttribute("class", "series-filmes-lista__items");

    const itemSeriesFilmes = document.createElement("li");
    itemSeriesFilmes.setAttribute("class", "item-series-filmes");

    const itemImagem = document.createElement("img");
    itemImagem.setAttribute("src", imageUrl);

    const objetoDescricao = {
      nome: nome,
      imagem: imageUrl,
      descricao: item.overview,
      nota: item.vote_average,
    };

    itemImagem.addEventListener("click", () => {
      criarElementoDescricao(objetoDescricao);
      capturarScroll();
    });

    const boxTituloNota = document.createElement("div");
    boxTituloNota.setAttribute("class", "series-filmes-box");

    const itemTitulo = document.createElement("p");
    itemTitulo.setAttribute("class", "series-filmes-titulo");
    itemTitulo.textContent = nome;

    const itemNota = document.createElement("p");
    itemNota.setAttribute("class", "series-filmes-nota");
    itemNota.textContent = `Nota: ${item.vote_average.toFixed(2)}`;

    boxTituloNota.append(itemTitulo);
    boxTituloNota.append(itemNota);
    itemSeriesFilmes.append(itemImagem);
    itemSeriesFilmes.append(boxTituloNota);

    listaSeriesFilmes.append(itemSeriesFilmes);
    elementoSeriesFilmes.append(listaSeriesFilmes);

    elementoSeriesFilmesConteudo.classList.remove("hidden");
  });
}

SeriesEFilmes();
