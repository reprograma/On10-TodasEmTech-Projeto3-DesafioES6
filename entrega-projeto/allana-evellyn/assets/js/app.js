
const form = document.querySelector('form');
const input = document.getElementById('search');

//elementos para o card de usuário
const imgUser = document.getElementById('image')
const userName = document.getElementById('name')
const userUsername = document.getElementById('username')
const userDescription = document.getElementById('description')
const userFollowers = document.getElementById('followers')
const userRepositories = document.getElementById('repositories')



//evento de busca
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const usuario = input.value.trim();

  if(usuario){
    return getUsuario(usuario)
  }
    return alert('informe o usuário')
});


//consumindo a API
const getUsuario = async (usuario) => {
  
  const requisicao = await fetch(`https://api.github.com/users/${usuario}`)
    
    if(requisicao.status === 404) {
      alert('Usuário não encontrado!')
    } else{

      const infosUser = await requisicao.json()
      const dados = infosUser[0];

      //criando card com as informações cedidas pela api
      createCard(infosUser.avatar_url, infosUser.name, infosUser.login, infosUser.bio, infosUser.followers, infosUser.public_repos)
      
    }
}



//card de usuário
const createCard = (image, name, username, description, followers, repositories) => {
  imgUser.setAttribute('src', image);
  userName.innerText = name;
  userUsername.innerText = username;
  userDescription.innerText = description;
  userFollowers.innerText = followers;
  userRepositories.innerText = repositories;
}