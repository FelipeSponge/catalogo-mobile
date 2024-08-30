const apiKey = "f6e08ba8c93bbc9c402fe28d6718bf9c";

async function buscarFilmesPopular() {
  const busca = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR`
  );
  const filmes = await busca.json();
  return filmes;
}
async function buscarFilmesLancamentos() {
  const busca = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR`
  );
  const filmes = await busca.json();
  return filmes;
}
async function buscarFilmesBemAvaliados() {
  const busca = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR`
  );
  const filmes = await busca.json();
  return filmes;
}
async function buscarSeriesPopular() {
  const busca = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`
  );
  const series = await busca.json();
  return series;
}
async function buscarSeriesLancamentos() {
  const busca = await fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=pt-BR`
  );
  const series = await busca.json();
  return series;
}
async function buscarSeriesBemAvaliados() {
  const busca = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR`
  );
  const series = await busca.json();
  return series;
}

async function buscarFilmesPorGeneros(id, page) {
  const busca = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}&page=${page}&language=pt-BR`
  );
  const filmes = await busca.json();
  return filmes;
}

async function buscarPorGeneros(id, page, tipo) {
  const busca = await fetch(
    `https://api.themoviedb.org/3/discover/${tipo}?api_key=${apiKey}&with_genres=${id}&page=${page}&language=pt-BR`
  );
  const series = await busca.json();
  return series;
}

async function buscarPeloNome(nome) {
  const busca = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${nome}`
  );
  const filmes = await busca.json();

  const busca2 = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${nome}`
  );
  const series = await busca2.json();

  const filmesSeries = filmes.results.concat(series.results);

  return filmesSeries;
}

export const conectaAPI = {
  buscarFilmesPopular,
  buscarFilmesLancamentos,
  buscarFilmesBemAvaliados,
  buscarSeriesPopular,
  buscarSeriesLancamentos,
  buscarSeriesBemAvaliados,
  buscarPorGeneros,
  buscarPeloNome,
};
