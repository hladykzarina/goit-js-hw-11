import { createMarkup, getImg, limitPage } from './cats-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
/*
Notiflix.Notify.init({
  width: '480px',
  position: 'center-center',
  distance: '10px',
  opacity: 0.7,
  fontSize: '18px',
  cssAnimationStyle: 'zoom',
});*/
const refs = {
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.gallery'),
  loadEl: document.querySelector('.load-more'),
};
const gallery = refs.galleryEl;
const galleryLightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
//refs.loadEl.classList.add('hidden');
refs.formEl.addEventListener('submit', onSubmitForm);
refs.loadEl.addEventListener('click', onLoad);
let page;
let searchImage = '';
function onSubmitForm(evt) {
  evt.preventDefault();
  const query = evt.currentTarget.elements.searchQuery.value;
  if (!query.trim() || query === searchImage) {
    return;
  }
  searchImage = query;
  refs.galleryEl.innerHTML = '';
  page = 1;
  refs.loadEl.classList.add('hidden');
  handlerImg(searchImage, page);
  refs.formEl.reset();
}
const handlerImg = async (searchImage, page) => {
  try {
    const data = await getImg(searchImage, page);
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, the input field cannot be empty. Please try again.'
      );
      return;
    }
    createMarkup(data);
    galleryLightBox.refresh();
    if (page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    if (data.totalHits >= page * limitPage) {
      refs.loadEl.classList.remove('hidden');
    }
    if (data.totalHits <= page * limitPage) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops! Something went wrong!');
  }
};
function onLoad() {
  refs.loadEl.classList.add('hidden');
  page += 1;
  handlerImg(searchImage, page);
}
export { gallery };
