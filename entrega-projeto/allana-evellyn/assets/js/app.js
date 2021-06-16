//LINK API
//const baseURL = 'https://api.github.com/';
const form = document.querySelector('form');
const input = document.getElementById('search');

//user's card elements
const imgUser = document.getElementById('image')
const userName = document.getElementById('name')
const userUsername = document.getElementById('username')
const userDescription = document.getElementById('description')
const userFollowers = document.getElementById('followers')
const userRepositories = document.getElementById('repositories')



//search event
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const usuario = input.value.trim();

  if(usuario){
    return getUsuario(usuario)
  }
    return alert('informe o usuário')
});

const getUsuario = async (usuario) => {
  
  const requisicao = await fetch(`https://api.github.com/users/${usuario}`)
  
  const infosUser = await requisicao.json()
    const dados = infosUser[0];

    console.log(dados.login)


  if(requisicao.status === 404) {
    alert('Usuário não encontrado!')
  }
}



//user card
const createCard = (image, name, username, description, followers, repositories) => {
  imgUser.setAttribute('src', image);
  userName.innerText = name;
  userUsername.innerText = username;
  userDescription.innerText = description;
  userFollowers.innerText = followers;
  userRepositories.innerText = repositories;
}