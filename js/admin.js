const tabelaAnimais = document.querySelector("#tabelaAnimais");
const quantidadeAnimais = document.querySelector("#quantidadeAnimais");
const mensagem = document.querySelector("#mensagem");

async function carregarAnimais() {

    try {

        const resposta = await fetch("data/animais.json");

        if (!resposta.ok) {
            throw new Error("Erro ao carregar o arquivo JSON.");
        }

        const dados = await resposta.json();

        const animais = dados.animais;

        quantidadeAnimais.textContent = animais.length;

        tabelaAnimais.innerHTML = animais.map(animal => {

            return `
                <tr>

                    <td>
                        <span class="nome-animal">
                            ${animal.nome}
                        </span>
                    </td>

                    <td>
                        <span class="especie">
                            ${animal.especie}
                        </span>
                    </td>

                    <td>
                        <span class="status">
                            ${animal.status}
                        </span>
                    </td>

                    <td>
                        ${animal.idade}
                    </td>

                    <td>
                        ${animal.raca}
                    </td>

                    <td>
                        ${animal.sexo}
                    </td>

                    <td>
                        ${animal.porte}
                    </td>

                    <td>
                        ${animal.saude}
                    </td>

                    <td>
                        ${animal.localizacao}
                    </td>

                    <td>
                        <span class="temperamento">
                            ${animal.temperamento.join(", ")}
                        </span>
                    </td>

                </tr>
            `;

        }).join("");

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Não foi possível carregar os animais.";

    }

}

carregarAnimais();