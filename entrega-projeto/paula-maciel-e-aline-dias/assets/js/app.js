const form = document.querySelector("form");
const input = document.querySelector("#usuario");
const retornoHtml = document.querySelector("#retornaHTML")
const userNotFound = document.querySelector("#usuarioNotFound")



form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nomeUsuario = input.value.trim();

    if (nomeUsuario) {
    getUsuario(nomeUsuario)
    getUsuarioRepos(nomeUsuario)
    } else {
        alert('Informe o usuário')
    }  
})


const getUsuario = async (nomeUsuario) => {
    try {
        const rotaApi = await fetch(`https://api.github.com/users/${nomeUsuario}`)
        form.reset();
        if (rotaApi.status === 404) {
        throw new Error();
        }
        const informacoesDoUsuario = await rotaApi.json();
        retornoHtml.innerHTML = criarCardUsuario(informacoesDoUsuario)
    } catch {
        retornoHtml.innerHTML = criarCardUsuarioNaoEncontrado();
        console.log(criarCardUsuarioNaoEncontrado)
    }
    }

    const criarCardUsuarioNaoEncontrado = (userNotFound) => {
        return `
        <div> 
            <h1 class="tituloNaoEncontrado">Usuário Não Encontrado :(</h1>
            <p class="pesquiseNovamente">Pesquisa novamente</p>
            <img class="imagemNaoEncontrado" src="../../../../images/not-found.svg" alt="imagen de erro">
        </div>
    `;
    
    }
    


const criarCardUsuario = (nomeUsuario) => {

    const { login, name, bio, followers, public_repos, avatar_url } = nomeUsuario;
    return `
    <div class="card__user">
    <picture class="image__user">
        <img class="user__image" src="${avatar_url}" alt="" />
    </picture>
    <div class="user__card"> 
    <h2 class="user__name spacing">${name ? name : ' '}</h2>
    <p class="user__username paragraph spacing">${login}</p>
    <p class="user__bio paragraph spacing">${bio ? bio : ' '}</p>
    <div class="followersRepos">
    <div class="badges spacing">
    <div class="badge followers">
    <span class="material-icons icon__profile">people_outline</span>
    <p>${followers}</p>
    </div>
    <div class="badge userRepos">
    <span class="material-icons icon__profile">class</span>
    <p>${public_repos}</p>
    </div>
    </div>
    </div>
    </div>
    </div>
`;
}
const getUsuarioRepos = async (nomeUsuario) => {
    try {
        const rotaApi = await fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
        if (rotaApi.status === 404) {
        throw new Error();
        }
        const informacoesDoUsuario = await rotaApi.json();
        retornoHtml.innerHTML += criarListaReposUsuario(informacoesDoUsuario)
    } catch {
        retornoHtml.innerHTML = 'Usuario não encontrado';
    }
    }

    const criarListaReposUsuario = (value) => {
    let htmlRepo = '';
    if (value.length != 0) {
        htmlRepo += '<div class="cards">';
        for (let i = 0; i < value.length; i++) {
        htmlRepo += `<div class="card__repo">
                        <h1 class="tituloRepo">${value[i].name}</h1>
                        <p class="descricaoRepo">${value[i].description ? value[i].description : ' '}</p>
                    <div class="bolinha">${value[i].language ? value[i].language : ' '}</div>
                    <div class="estrelinha">
                    <span class="material-icons corEstrelinha">star_border</span>
                    ${value[i].forks}</div>
                </div>`;
        }
        htmlRepo += '</div>';
        return htmlRepo;
    } else {
        htmlRepo += `<p>Não tem repositórios públicos ainda.</p>`
        return htmlRepo;
    }
    }