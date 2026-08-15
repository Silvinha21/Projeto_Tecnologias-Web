let animaisData = [];

const filtros = {
  busca: '',
  especie: 'todos',
  porte: 'todos',
  idade: 'todos'
};

function midiaAnimal(animal) {
  if (animal.imagem) {
    return `<img src="${animal.imagem}" alt="Foto de ${animal.nome}" style="width:100%;height:100%;object-fit:cover;">`;
  }
  return `<div class="img-placeholder">Foto de ${animal.nome}</div>`;
}

function cardAnimal(animal) {
  const tags = (animal.temperamento || []).map(t => `<span>${t}</span>`).join("");
  return `
  <article class="card ${animal.especie === 'gato' ? 'gato' : 'cao'}">
    <div class="card-media" style="${animal.imagem ? 'padding:0;' : ''}">
      <span class="status-tag">${animal.status}</span>
      ${midiaAnimal(animal)}
    </div>
    <div class="card-body">
      <div class="card-name-row"><h3>${animal.nome}</h3><span class="card-age">${animal.idade}</span></div>
      <p class="card-breed">${animal.raca} - ${animal.sexo}</p>
      <ul class="card-facts">
        <li><img class="icon-card" src="data/img/coracao.png"> ${animal.porte}</li>
        <li><img class="icon-card" src="data/img/mais.png" alt="Saúde"> ${animal.saude}</li>
      </ul>
      <div class="card-tags">${tags}</div>
      <div class="card-footer">
        <a href="#" class="btn-adotar">Quero adotar</a>
      </div>
    </div>
  </article>`;
}

// --- Helpers de classificação para os filtros ---

function parsePorte(porteStr) {
  const s = (porteStr || '').toLowerCase();
  if (s.includes('pequeno')) return 'pequeno';
  if (s.includes('médio') || s.includes('medio')) return 'medio';
  if (s.includes('grande')) return 'grande';
  return 'outro';
}

function parseIdadeCategoria(idadeStr) {
  const s = (idadeStr || '').toLowerCase();
  const match = s.match(/(\d+)/);
  const numero = match ? parseInt(match[1], 10) : 0;

  if (s.includes('mês') || s.includes('meses')) {
    return numero < 12 ? 'filhote' : 'adulto';
  }
  // assume anos
  if (numero < 1) return 'filhote';
  if (numero <= 6) return 'adulto';
  return 'senior';
}

// --- Filtro combinado ---

function animalCorresponde(animal) {
  const buscaOk = filtros.busca === '' ||
    (animal.raca || '').toLowerCase().includes(filtros.busca.toLowerCase());

  const especieOk = filtros.especie === 'todos' || animal.especie === filtros.especie;
  const porteOk = filtros.porte === 'todos' || parsePorte(animal.porte) === filtros.porte;
  const idadeOk = filtros.idade === 'todos' || parseIdadeCategoria(animal.idade) === filtros.idade;

  return buscaOk && especieOk && porteOk && idadeOk;
}

function renderAnimais(lista) {
  const grid = document.getElementById('grid');
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = `<p class="sem-resultados">Nenhum animal encontrado com esses filtros.</p>`;
    return;
  }

  grid.innerHTML = lista.map(cardAnimal).join("");
}

function aplicarFiltros() {
  const filtrados = animaisData.filter(animalCorresponde);
  renderAnimais(filtrados);
}

// --- Listeners ---

document.getElementById('busca-raca').addEventListener('input', (e) => {
  filtros.busca = e.target.value;
  aplicarFiltros();
});

document.getElementById('filtro-porte').addEventListener('change', (e) => {
  filtros.porte = e.target.value;
  aplicarFiltros();
});

document.getElementById('filtro-idade').addEventListener('change', (e) => {
  filtros.idade = e.target.value;
  aplicarFiltros();
});

document.querySelectorAll('input[name="filtro"]').forEach((radio) => {
  radio.addEventListener('change', (e) => {
    if (e.target.id === 'f-todos') filtros.especie = 'todos';
    if (e.target.id === 'f-caes') filtros.especie = 'cao';
    if (e.target.id === 'f-gatos') filtros.especie = 'gato';
    aplicarFiltros();
  });
});

// --- Carregamento inicial ---

fetch('data/animais.json')
  .then(res => { if (!res.ok) throw new Error('Falha ao carregar animais.json'); return res.json(); })
  .then(dados => {
    animaisData = dados.animais || [];
    aplicarFiltros();
  })
  .catch(err => {
    console.error(err);
    const grid = document.getElementById('grid');
    if (grid) grid.innerHTML = `<p class="sem-resultados">Não foi possível carregar os animais.</p>`;
  });