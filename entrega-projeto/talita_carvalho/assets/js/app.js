const urlBase = "https://api.github.com/users/";
const button = document.querySelector(".btn");
const input = document.querySelector("#nomeUsuario");

const cardUserFound = document.querySelector(".card");
const avatarUrl = document.querySelector("#avatar_url");
const nameUsuario = document.querySelector(".name");
const loginUsuario = document.querySelector(".login");
const bioUsuario = document.querySelector(".bio");
const seguidores = document.querySelector("#people");
const followersUsuario = document.querySelector("#followers");
const publicRepos = document.querySelector("#public_repos");
const repositorios = document.querySelector("#class");

const titleNotFound = document.querySelector(".title_not_found");
const subtitleNotFound = document.querySelector(".subtitle_not_found");
const imgNotFound = document.querySelector(".img_not_found");
const articleRepositorios = document.querySelector("#array_repositorios");

button.addEventListener("click", (event) => {
  event.preventDefault();
  const name = input.value.trim();
  if (name) {
    CleanCard();
    getUserName(name);
  } else {
    alert("Digite o username do usuário!!");
  }
});

const getUserName = (nome) => {
  let nameModificado = nome.toLowerCase();

  fetch(urlBase + nameModificado)
    .then((response) => response.json())
    .then((object) => {
      const array = object;
      if (array.message) {
        throw new Error();
      } else {
        console.log(array);
        const { name, login, avatar_url, bio, public_repos, followers } = array;
        cardFound(name, login, avatar_url, bio, public_repos, followers);
        repos(login, name);
      }
    })
    .catch(() => {
      console.log("usuario não existe");
      userNotFound();
    });
};

const cardFound = (name, login, avatar_url, bio, public_repos, followers) => {
  cardUserFound.classList.replace("off", "card");
  avatarUrl.src = avatar_url;
  nameUsuario.innerHTML = name;
  loginUsuario.innerHTML = login;
  bioUsuario.innerHTML = bio;
  followersUsuario.innerHTML = followers;
  publicRepos.innerHTML = public_repos;
  seguidores.src = "./img/people_outline.png";
  repositorios.src = "./img/Vector.png";
};

const repos = (login, nameUser) => {
  fetch(`https://api.github.com/users/${login}/repos`)
    .then((response) => response.json())
    .then((repositorios) => {
      const arrayRepositorios = repositorios;
      if (arrayRepositorios.length > 0) {
        console.log(arrayRepositorios);
        const array = arrayRepositorios
          .map((repositorio) => {
            const { name, deion, language, stargazers_count } = repositorio;
            let parseDeion = !deion ? "-" : deion;
            let parseLanguage = !language ? "-" : language;
            return `
                <div class="card-repositorios">
                    <div>
                        <h5 class="title_repositorio">${name}</h5>
                        <p class="descricao_repositorio">${parseDeion}</p>
                    </div>
                    <div class="card_rodape">
                        <div class="linguagem">
                            <span class="material-icons ${parseLanguage} circle">fiber_manual_record</span>
                            <p class="tipo_linguagem">${parseLanguage}</p>
                        </div>
                        <div class="estrelas">
                            <span class="material-icons star">star_border</span>
                            <p class="qtd_estrelas">${stargazers_count}</p>
                        </div>
                    </div>
                </div>
                
                `;
          })
          .join("");
        articleRepositorios.innerHTML = array;
      } else {
        anyRepositorios(login, nameUser);
      }
    });
};

const anyRepositorios = (login, nameUser) => {
  if (!nameUser) {
    articleRepositorios.innerHTML = `<p>${login} não tem repositórios públicos ainda</p>`;
  } else {
    articleRepositorios.innerHTML = `<p>${nameUser} não tem repositórios públicos ainda</p>`;
  }
};

const CleanCard = () => {
  avatarUrl.src = "";
  nameUsuario.innerHTML = "";
  loginUsuario.innerHTML = "";
  bioUsuario.innerHTML = "";
  followersUsuario.innerHTML = "";
  publicRepos.innerHTML = "";
  seguidores.src = "";
  repositorios.src = "";
  titleNotFound.innerHTML = "";
  subtitleNotFound.innerHTML = "";
  imgNotFound.src = "";
};

const userNotFound = () => {
  cardUserFound.classList.replace("card", "off");
  titleNotFound.innerHTML = "Usuário não encontrado :(";
  subtitleNotFound.innerHTML = "Pesquisar novamente";
  imgNotFound.src = "./img/not-found.svg";
};
