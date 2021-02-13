const input = document.querySelector("#user");
const loading = document.querySelector(".loading");
let showMoreButton = document.querySelector(".show-more");

function showMore(ul, repositories) {
  ul.innerHTML = repositories
    .map((repository) => {
      return `<li>
        <a href="${repository.svn_url}">${repository.name}</a>
      </li>`;
    })
    .join("");

  showMoreButton.style.display = "none";
}

async function RenderizeInfo() {
  try {
    loading.innerText = `Carregando...`;
    const inputUser = input.value;

    let ul = document.querySelector(".ul");
    let inputRepo = input.value;

    let url = await fetch(`https://api.github.com/users/${inputRepo}/repos`);
    let repositories = await url.json();

    showMoreButton.style.display = "block";

    ul.innerHTML = repositories
      .map((repository, index) => {
        if (index < 10) {
          return `<li>
              <a href="${repository.svn_url}">${repository.name}</a>
            </li>`;
        }
      })
      .join("");

    showMoreButton.addEventListener("click", () => showMore(ul, repositories));

    //---------------------------//

    let numRepo = repositories.length;

    const response = await fetch(`https://api.github.com/users/${inputUser}`);
    const user = await response.json();
    let boxUser = document.querySelector(".box-user");

    let name = document.querySelector(".name");
    let repo = document.querySelector(".container-info .repo");
    let seguidores = document.querySelector(".container-info .seguidores");
    let seguindo = document.querySelector(".container-info .seguindo");
    let githubLink = document.querySelector(".github-link");
    githubLink.setAttribute("href", `https://github.com/${inputUser}`);
    let imgUser = document.querySelector(".img-user");
    imgUser.style.backgroundImage = `url(${user.avatar_url})`;

    boxUser.style.display = "flex";
    name.innerHTML = `Nome: <span style="color:#04D361;">${user.name}</span>`;

    repo.innerHTML = `Repositórios: <span style="color:#04D361;">${numRepo}</span>`;
    seguidores.innerHTML = `Seguidores: <span style="color:#04D361;">${user.followers}</span>`;
    seguindo.innerHTML = `Seguindo: <span style="color:#04D361;">${user.following}</span>`;
  } catch (err) {
    loading.innerText = `Ops... Parece que o usuário não existe.`;
    showMoreButton.style.display = "none";
    throw new Error(err);
  }
  loading.innerText = ``;
  input.value = ``;
}
