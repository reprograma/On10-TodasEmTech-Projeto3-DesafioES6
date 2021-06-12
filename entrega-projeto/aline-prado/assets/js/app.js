const username = document.getElementById('username');
const btn = document.getElementById('submit');
const form = document.getElementById('search');
const profile = document.getElementById('profile');

btn.addEventListener('click', function TextAreaValidation(event){
    event.preventDefault();

    if (username.value.trim() === '') {
        alert('Campo Obrigatorio')
    } else {
        return getUsuario(username.value)
    }

    form.reset()
})

const getUsuario = async (username) => {
    try {
        const request = await fetch(`https://api.github.com/users/${username}`);
        if(request.status === 404){
            throw new Error();
        }
        const userInfo = await request.json();
        profile.innerHTML = createCardUser(userInfo)
        console.log(userInfo)
    } catch {
        profile.innerHTML = userNotFound();
    }
}

const createCardUser = username => {
    const { login, name, bio, followers, public_repos, avatar_url } = username;
    form.reset()
    return `
        <picture class="image__user">
            <img class="user__image" src="${avatar_url}" alt="" />
        </picture>

        <div class="user__card">
        <h2 class="user__name spacing">${name}</h2>
        <p class="user__username paragraph spacing">${login}</p>
        <p class="user__bio paragraph spacing">${bio}</p>
        <ul class="badges spacing">
            <li class="badge">
                <span class="material-icons icon__profile">people_outline</span>
                <p>${followers}</p>
            </li>
            <li class="badge">
                <span class="material-icons icon__profile">class</span>
                <p>${public_repos}</p>
            </li>
        </ul>
        </div>
    `
}

const userNotFound = () => {
    form.reset()
    return `
    <div class="not-found">
        <h1 class="title">Usuário não encontrado :(</h1>
        <h2 class="subtitle">Pesquise novamente</h2>
        <picture class="image__user-not-found">
            <img class="not-found__image" src="../../../images/not-found.svg" />
        </picture>
    </div>
    `
}

