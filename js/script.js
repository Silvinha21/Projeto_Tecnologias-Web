

  function midiaAnimal(animal){
    if (animal.imagem) {
      return `<img src="${animal.imagem}" alt="Foto de ${animal.nome}" style="width:100%;height:100%;object-fit:cover;">`;
    }
    return `<div class="img-placeholder">Foto de ${animal.nome}</div>`;
  }

  function cardAnimal(animal){
    const tags = (animal.temperamento || []).map(t => `<span>${(t)}</span>`).join("");
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
        <li> <img class="icon-card" src="data/img/coracao.png"> ${animal.porte}</li>
        <li> <img class="icon-card" src="data/img/mais.png" alt="Relógio"> ${animal.saude}</li>
        <div class="card-tags">${tags}</div>
        <div class="card-footer">
          <a href="#" class="btn-adotar">Quero adotar</a>
        </div>
      </div>
    </article>`;
  }

  function renderAnimais(dados){
    const grid = document.getElementById('grid');
    if (!grid) return;
    grid.innerHTML = (dados.animais || []).map(cardAnimal).join("");
  }

  fetch('data/animais.json')
    .then(res => { if(!res.ok) throw new Error('Falha ao carregar animais.json'); return res.json(); })
    .then(renderAnimais)