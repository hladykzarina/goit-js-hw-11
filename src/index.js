import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.min.css';
pixabay.defaults.headers.common['x-api-key'] =
  '39231983-3a5a24849d135b109e286581a';

async function fetchUser() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/name/Ukraine');
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
fetchUser();

function renderGallery(cards) {
  console.log(cards.hits);
  const markup = cards.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery_link" href="${largeImageURL}" data-alt="${tags}">
      <div class="photo-card">
      <img class="gallery_image" src="${webformatURL}" width="400px" alt="${tags}" loading="lazy">
      <div class="info">
      <p class="info-item"><b>Likes</b>${likes}</p>
      <p class="info-item"><b>Views</b>${views}</p>
      <p class="info-item"><b>Comments</b>${comments}</p>
      <p class="info-item"><b>Downloads</b>${downloads}</p>
      </div>
      </div>
      </a>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsPosition: 'bottom',
  captionsDelay: 250,
});
