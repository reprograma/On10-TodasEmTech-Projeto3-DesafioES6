// URL da API
const baseURL = "https://www.breakingbadapi.com/api";

const form = document.querySelector('form');
const input = document.querySelector('#nomePersonagem');

const imgPersonagem = document.querySelector('#imagem');
const nomePersonagem = document.querySelector('#nome');
const apelidPersonagem = document.querySelector('#apelido');
const niverPersonagem = document.querySelector('#niver');
const mensagemErro = document.querySelector('.messagemErro');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = input.value.trim();

    if (nome) {
        getPersonagem(nome)
    } else {
        alert('Informe o nome do personagem');
    }
})

function replaceNome(nome) {
    let nomeModificado = ''

    if (nome.includes(' ')) {
        nomeModificado = nome.replace(' ', '+')
    } else {
        nomeModificado = nome;
    }

    return nomeModificado.toLocaleLowerCase();
}

const getPersonagem = (nome) => {

    const nomeModificado = replaceNome(nome)

    fetch(`${baseURL}/characters?name=${nomeModificado}`)
        .then((resposta) => resposta.json())
        .then((dados) => {
            mensagemErro.textContent = '';
            if (dados.length > 0) {

                const personagem = dados[0];
                const { img, nickname, birthday, name } = personagem;
                criarCard(img, nickname, birthday, name)
            } else {
                throw new Error()
            }
        }).catch(() => {
            limparCard();
            mensagemErro.textContent = 'Personagem não encontrado';
        })

}

const criarCard = (img, nome, apelido, niver) => {
    imgPersonagem.setAttribute('src', img);
    // imgPersonagem.src = img
    nomePersonagem.textContent = nome;
    // nomePersonagem.innerText = nome;

    apelidPersonagem.textContent = `Apelido: ${apelido}`;
    niverPersonagem.textContent = `Aniversário: ${niver}`;
}

const limparCard = () => {
    imgPersonagem.src = ' ';
    nomePersonagem.textContent = '';
    apelidPersonagem.textContent = '';
    niverPersonagem.textContent = '';
}

/*
const exemploPokemon = () => {
  fetch('https://pokeapi.co/api/v2/pokemon/banana')
  .then((resposta) => {

  
   // if(resposta.ok === false){
     throw new Error();
    }
  //

    if (!resposta.ok) {
      throw new Error();
    } 
  
    return resposta.json();
  })
  .then(json => console.log(json))
  .catch(() => console.log('Pokemon não encontrado'));
}

exemploPokemon();
*/