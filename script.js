const ts = '1632930187';
const pubKey = '11aa273f5c4270c525f00be181996a08';
const md5 = 'c0eda2d9576eebaacbf278f887766ee7';
const baseUrl = 'https://gateway.marvel.com:443/v1/public';
const queryParam = `?ts=${ts}&apikey=${pubKey}&hash=${md5}`;
const herosList = document.getElementById('herosList');
const sectionPages = document.getElementById('btnPages');
const loading = document.querySelector('.loading');

function showLoadingIcon() {
  loading.style.display = 'block';
}

function hideLoadingIcon() {
  loading.style.display = 'none';
}

function requestApi(offset = 0) {
  return fetch(`${baseUrl}/characters${queryParam}&offset=${offset}`)
    .then((response) => response.json())
    .then((data) => {
     hideLoadingIcon(); 
     console.log(data); 
     return data.data.results;
    });
}

function redirectToWiki([urls]) {
  window.location.href = `${urls.url}`;
}

function createHeroItem({ name, thumbnail, urls }) {
  const section = document.createElement('section');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const div = document.createElement('div');
  section.className = 'hero';
  section.addEventListener('click', () => {
    redirectToWiki(urls);
  });
  img.src = `${thumbnail.path}.${thumbnail.extension}`;
  p.innerText = name;
  p.title = name;
  div.className = 'pContainer';
  div.appendChild(p);
  section.appendChild(img);
  section.appendChild(div);
  herosList.appendChild(section);  
}

function showHeros(herosArray) {
  herosArray.forEach((hero) => {
    createHeroItem(hero);
  });
}

function clearList() {
  herosList.innerHTML = '';
}

async function requestManager({ target }) {
  const number = parseInt(target.innerText, 10);
  const offsetValue = (number - 1) * 20;
  clearList();
  showLoadingIcon();
  const herosArray = await requestApi(offsetValue);
  showHeros(herosArray);
}

function createPageButton(number) {
  const btnPage = document.createElement('button');
  btnPage.className = 'btnPage';
  btnPage.innerText = number;
  btnPage.addEventListener('click', requestManager);
  sectionPages.appendChild(btnPage);
}

function createButtons() {
  for (let i = 1; i <= 78; i += 1) {
    createPageButton(i);
  }
}

window.onload = async () => {
  const herosArray = await requestApi();
  showHeros(herosArray);
  createButtons();
};

/* https://hidetoyasunori.com/portfolio/wp-content/uploads/2017/02/marvel_favicon.png */