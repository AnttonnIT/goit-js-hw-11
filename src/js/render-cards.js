export default function renderCards(data) {
  return data.hits
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
        return `<div class="photo-card">
        <a href=${largeImageURL}>
  <img src=${webformatURL} alt='${tags}' loading="lazy" width="400" height="250"/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span class="value">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b>
     <span class="value"> ${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b>
     <span class="value"> ${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b>
     <span class="value"> ${downloads}</span>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}
