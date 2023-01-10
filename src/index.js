import fetchImages from './js/fetch-img';
import renderCards from './js/render-cards';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
const endTextEL = document.querySelector('.end-text');

formEl.addEventListener('submit', onSubmit);
loadMoreBtnEl.addEventListener('click', onClickLoadMoreBtn);

let page = 1;
let inputValue = '';
let currentHits = 0;
let totalHits;

let lightbox = new SimpleLightbox('.photo-card a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 300,
});

async function onSubmit(e) {
  e.preventDefault();
  page = 1;
  currentHits = 0;
  galleryEl.innerHTML = '';
  loadMoreBtnEl.classList.add('is-hidden');
  endTextEL.classList.add('is-hidden');
  inputValue = formEl.elements.searchQuery.value;

  if (inputValue.trim() === '') {
    return;
  }
  try {
    await fetchAndRenderHTML();
    if (totalHits > 0) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function onClickLoadMoreBtn() {
  page += 1;

  try {
    await fetchAndRenderHTML();
  } catch (error) {
    console.log(error);
  }

  const { height: cardHeight } =
    galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function fetchAndRenderHTML() {
  try {
    const response = await fetchImages(inputValue, page);
    const render = renderCards(response);
    const responseHits = response.hits.length;
    currentHits += responseHits;
    totalHits = response.totalHits;

    if (responseHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    if (page >= Math.ceil(totalHits / 40)) {
      loadMoreBtnEl.classList.add('is-hidden');
      endTextEL.classList.remove('is-hidden');
    } else {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    galleryEl.insertAdjacentHTML('beforeend', render);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

// infinity scroll

// window.addEventListener('scroll', throttle(onScroll, 500));
// function onScroll(e) {
//   const heightForFetch = 350;
//   const documentRect = galleryEl.getBoundingClientRect();
//   const clientWindowHeight = document.documentElement.clientHeight;

//   if (documentRect.bottom < clientWindowHeight + heightForFetch) {
//     if (currentHits >= totalHits) {
//       endTextEL.classList.remove('is-hidden');

//       return;
//     }
//     page += 1;
//     try {
//       fetchAndRenderHTML();
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
