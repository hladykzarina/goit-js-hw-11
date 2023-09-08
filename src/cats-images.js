import { gallery } from './index';
import axios from 'axios';
const API_KEY = '39231983-3a5a24849d135b109e286581a';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const limitPage = 40;
const getImg = async (searchImage, page) => {
  const { data } = await axios({
    params: {
      key: API_KEY,
      q: searchImage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: limitPage,
      page: page,
    },
  });
  return data;
};
function createMarkup(data) {
  const markup = data.hits
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
        return ` 
         <div class="photo-card">
         <div class="img-box">
         <a class="gallery-link" href="${largeImageURL}">
         <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img"/> 
         </a>
         </div>
         
         <ul class="info">
         <li class="info-item">Likes<p>${likes}</p></li>
         <li class="info-item">Views<p>${views}</p></li>
         <li class="info-item">Comments<p>${comments}</p></li>
         <li class="info-item">Downloads<p>${downloads}</p></li>
         </ul>
         </div>
        `;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}
export { createMarkup, getImg, limitPage };
