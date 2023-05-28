import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from '/src/js/cat-api.js';

const selectRef = document.querySelector('.breed-select');
const errorRef = document.querySelector('.error')
const loaderRef = document.querySelector('.loader')
let imgContainer = document.querySelector('.cat-img-container')
let discriptionContainer = document.querySelector('.cat-container')

selectRef.classList.add('inviseble')
errorRef.classList.add('inviseble')

renderOptins()
selectRef.addEventListener('change', onChangeSelect)
// Oops! Something went wrong! Try reloading the page!

// функція яку додаємона на подію change
function onChangeSelect(e){
  loaderRef.classList.remove('inviseble');
  const value = e.currentTarget.value;
  imgContainer.innerHTML = ''
  discriptionContainer.innerHTML = ''
  
  renderMarkupCat(value)
}

// ==========================================================================================
function renderMarkupCat(value){
  fetchCatByBreed(value).then(addMarkupCat).catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    loaderRef.classList.add('inviseble');
  });
}

function addMarkupCat(cat){
  const img = `<img src="${cat.url}" alt="${cat.breeds[0].name}" width="450" />`
  const textDescription = ` 
  <h2 class="name">${cat.breeds[0].name}</h2>
  <p class="discription">${cat.breeds[0].description}</p>
  <p class="temperament"><b>Temperament</b>: ${cat.breeds[0].temperament}</p>`
  
  imgContainer.insertAdjacentHTML('beforeend', img)
  discriptionContainer.insertAdjacentHTML('beforeend', textDescription)
 }

// ============================================================================================
function renderOptins(){
  fetchBreeds()
  .then(cat => addOptionsInSelect(cat))
  .catch(error => {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    loaderRef.classList.add('inviseble');
    selectRef.classList.remove('inviseble')
  });
}

  // функція яка робить розмітку в Select 'Options'
  function addOptionsInSelect(cats){
    const markup = cats.map(cat =>{
      return `
    <option value="${cat.reference_image_id}">${cat.name}</option>
    `}).join('')
    
    selectRef.insertAdjacentHTML('beforeend', markup)
    new SlimSelect({
      select: '#single',
    });
    }

// ==================================================================================


  

  