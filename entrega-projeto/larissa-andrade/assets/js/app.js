//link da API
const baseURL = "https://api.github.com";

//atribuindo nome do usuario a uma variavel
const input = document.getElementById('input');
const form = document.getElementById('form');


const avatar = document.getElementById('avatar');
const printName = document.getElementById('name');
const printUserName = document.getElementById('user');
const printBio = document.getElementById('bio');
const printFollowers = document.getElementById('followers');
const printRepo = document.getElementById('repo');
const notFound = document.getElementById('notFound');

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
    limparCard();

    fetch(`${baseURL}/users/${userName}`)
    .then((response) => {
            console.log(response)
            if(response.ok===true){
                return response.json();
            }else if(response.status === 404){
                const imgNotFound = document.createElement("IMG");
                imgNotFound.src = "../../../images/not-found.svg";
                notFound.appendChild(imgNotFound);
                throw new Error('user not found');
            }
            })
    .then((user) => {
        console.log('user',user);
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
    avatar.appendChild(img);

    printName.innerText = `${name}`;

    printUserName.innerText = `${login}`;

    printBio.innerText = `${bio}`;

    printFollowers.innerHTML = `<span style="color:#EC9B69" class="material-icons">people_outline</span><p>${followers}</p>`

    printRepo.innerHTML = `<span style="color:#EC9B69" class="material-icons">collections_bookmark</span><p>${public_repos}</p>`

    const mainDiv = document.getElementById("main");
    mainDiv.className = 'show';

}

const limparCard = () => {
    avatar.innerHTML = '';
    notFound.innerHTML = '';
    printName.innerText = '';
    printUserName.innerText = '';
    printBio.innerText = '';
    printFollowers.innerHTML = '';
    printRepo.innerHTML = '';
}
