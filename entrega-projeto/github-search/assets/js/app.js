const urlBase = "https://api.github.com/users/"
const input = document.querySelector('#nomeUsuario');
const button = document.querySelector('.btn');

const imgUsuario = document.querySelector('#avatar_url');
const tagNameUsuario = document.querySelector('.name');
const tagLoginUsuario = document.querySelector('.login');
const tagBioUsuario = document.querySelector('.bio');
const tagImgSeguidores = document.querySelector('#people');
const tagNumeroSeguidores = document.querySelector('#followers');
const tagImgRepositorios = document.querySelector('#class');
const tagNumeroRepositorios = document.querySelector('#public_repos');

const tituloUserNotFound = document.querySelector('.title_not_found');
const subtituloUserNotFound = document.querySelector('.subtitle_not_found');
const imgUserNotFound = document.querySelector('.img_not_found');

const cardUsuarioEncontrado = document.querySelector('.off');

button.addEventListener('click',(event) => {
  event.preventDefault()
  const loginUser = input.value.trim();
  if (loginUser){
    console.log(loginUser);
    cleanCard();
    fetchUser (loginUser)

  }else {
    alert('Digiete o nome do usuário')
  }

} )

const fetchUser = (loginUser) => {
  const parseLogin = loginUser.toLowerCase();
  fetch(urlBase + parseLogin)
    .then(response => response.json())
    .then(objeto => {
      const objetoUsuario = objeto;
      if(objetoUsuario.message){
         throw new Error ();

      }else{
        console.log(objetoUsuario)
        const {bio, name, login, avatar_url, followers, public_repos} = objetoUsuario;
        cardUsuario(bio, name, login, avatar_url, followers, public_repos);
      }
      
    })
    .catch(error => {
      userNotFound ();
    })
}


const cardUsuario = (bio, name, login, avatar_url, followers , public_repos)=>{
  cardUsuarioEncontrado.classList.replace('off', 'card');
  imgUsuario.src=avatar_url;
  tagNameUsuario.innerHTML = name;
  tagLoginUsuario.innerHTML = login;
  tagBioUsuario.innerHTML = bio;
  tagImgSeguidores.src= "";
  tagNumeroSeguidores.innerHTML = followers; 
  tagImgRepositorios.src= "";
  tagNumeroRepositorios.innerHTML= public_repos;
}


const cleanCard = ()=> {
  imgUsuario.src=" ";
  tagNameUsuario.innerHTML =" ";
  tagLoginUsuario.innerHTML = "";
  tagBioUsuario.innerHTML = "";
  tagImgSeguidores.src= "";
  tagNumeroSeguidores.innerHTML = ""; 
  tagImgRepositorios.src= "";
  tagNumeroRepositorios.innerHTML= "";
  tituloUserNotFound.innerHTML = '';
  subtituloUserNotFound.innerHTML = '';
  imgUserNotFound.src ="";
}


const userNotFound = () => {
    cardUsuarioEncontrado.classList.replace('card', 'off')
    tituloUserNotFound.innerHTML = 'Usuário não encontrado :(';
    subtituloUserNotFound.innerHTML = 'Pesquisar novamente!';
    imgUserNotFound.src ="../../img/not-found.svg";
}