const form = document.querySelector('form'); 
const input = document.querySelector('.input');
const profile = document.querySelector('.profile');
const search_off = document.querySelector('.search_off')
const home = document.querySelector('.home');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const user = input.value.trim();

    if(user) {
        getUser(user)
        getRepos(user)
    } else {
        alert("Digite o usuário...")
    }
})

const getUser = async (user) => {

    try {
        const requisicao = await fetch(`https://api.github.com/users/${user}`);
        if (requisicao.ok === false) {
            throw new Error();
        }
        const userInfos = await requisicao.json();
        home.remove();
        profile.innerHTML = createCard(userInfos);
        // console.log(createCard(userInfos));
        // console.log(userInfos)
    } catch {
        profile.remove();
        home.remove();
        search_off.innerHTML = notFound();
    }

    input.value = '';

/* Alternativa usando o fetch:
    fetch(`https://api.github.com/users/${user}`)
    .then(resposta => resposta.json())
    .then(jsonBody)
*/
}

const createCard = (user) => {
    const { login, name, bio, followers, public_repos, avatar_url} = user;
    return `
    <picture>
        <img class="foto" src="${avatar_url}" alt="" />
    </picture>
    <div>
        <h2 class="nome">${name}</h2>
        <p class="login">@${login}</p>
        <p class="bio">"${bio}"</p>
        <ul class="ul">
            <li class="li">
                <span class="material-icons icons">people_outline</span>
                <p>${followers}</p>
            </li>
            <li class="li">
                <span class="material-icons icons">class</span>
                <p>${public_repos}</p>
            </li>
        </ul>
    </div>
    `
}

const notFound = () => {
    return `
        <div>
            <h1 class="nome mensagem_erro"> Usuário não encontrado ☹️ </h1>
            <h3 class="mensagem"> Por favor, pesquise novamente </h3>
        </div>
        <picture>
            <img class="imagem_notFound" src="../../../images/not-found.svg"
        </picture>
    `
}

const getRepos = (user) => {
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    .then(repos)
    //console.log(response)
}