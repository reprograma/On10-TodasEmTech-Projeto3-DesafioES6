//link da API
const baseURL = "https://api.github.com";

//atribuindo nome do usuario a uma variavel
const input = document.getElementById('input');
const form = document.getElementById('form');

//pegando nome do usuario
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(input.value.trim() === ''){
        alert("Informe o nome do usuário!");
    }else{
        console.log(input.value.trim());
        getUser(input.value.trim());
    }
})

//buscando dados do usuario
const getUser = (userName) => {
    fetch(`${baseURL}/users/${userName}`)
    .then((response) => {
            if(response.ok===true){
                return response.json();
            }else if(response.status === 404){
                const imgNotFound = document.createElement("IMG");
                imgNotFound.src = "../../../images/not-found.svg";
                document.getElementById('notFound').appendChild(imgNotFound);
                throw new Error('user not found');
            }
            })
    .then((user) => {
        console.log(user);
        const userInfo = user;
        const {avatar_url, name, login, bio, followers, public_repos} = userInfo;
        createCard(avatar_url, name, login, bio, followers, public_repos);
    })
    .catch((e)=>console.log(e.message))
}


//exibindo infos na tela
const createCard = (avatar_url, name, login, bio, followers, public_repos) => {
    const img = document.createElement("IMG");
    img.src = avatar_url;
    document.getElementById('avatar').appendChild(img);

    const printName = document.getElementById('name');
    printName.innerText = `${name}`;

    const printUserName = document.getElementById('user');
    printUserName.innerText = `${login}`;

    const printBio = document.getElementById('bio');
    printBio.innerText = `${bio}`;

    const printFollowers = document.getElementById('followers');
    printFollowers.innerHTML = `<span style="color:#EC9B69" class="material-icons">people_outline</span><p>${followers}</p>`

    const printRepo = document.getElementById('repo');
    printRepo.innerHTML = `<span style="color:#EC9B69" class="material-icons">collections_bookmark</span><p>${public_repos}</p>`
}

// fetch(`${baseURL}/characters?name=${nomeModificado}`)
// .then((resposta) => resposta.json())
// .then((dados) => {
//   mensagemErro.textContent = '';
//   if(dados.length > 0){

//   const personagem = dados[0];
//   const { img, nickname, birthday, name } = personagem;
//   criarCard(img, nickname, birthday, name)
//   } else {
//     throw new Error()
//   }
// }).catch(() => {
//   limparCard();
//   mensagemErro.textContent = 'Personagem não encontrado';
// })