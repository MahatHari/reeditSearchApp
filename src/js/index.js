import fetch from './fetch';
import './../scss/style.scss';
import reddit from './../images/reddit.png';
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  /** Get Search Term */
  const searchTerm = searchInput.value;
  /** Get Sort */
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  /**Get Limit */
  const searchLimit = document.getElementById('limit').value;
  console.log(searchLimit);
  /** Check if search is empty of not */

  if (searchTerm === '') {
    showMessage('Please add a search Term', 'alert-danger');
  }
  //clear input
  searchInput.value = '';
  /** Search API */
  fetch.search(searchTerm, searchLimit, sortBy).then((results) => {
    let output = `<div class="card-columns">`;
    results.forEach((post) => {
      //check for image
      let image = post.preview ? post.preview.images[0].source.url : reddit;
      output += `
              <div class="card mb-2" >
  <img class="card-img-top" src=${image} alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${post.title}</h5>
    <p class="card-text">${truncateText(post.selftext, 100)}</p>
    <a href=${post.url} target="_blank" class="btn btn-primary">Read more</a>
    <hr/>
     <span class="badge bg-secondary">  Subreddit: 
    ${post.subreddit}</span>
     <span class="badge bg-dark"> Score:  ${post.score}</span>
  </div>
</div>`;
    });
    output += `</div>`;
    document.getElementById('results').innerHTML = output;
  });
});

// Show Message

function showMessage(message, className) {
  //Create a div for message
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  // add message
  div.appendChild(document.createTextNode(message));

  //Get Parent Container to add message

  const searchContainer = document.querySelector('#search-container');
  //Get search
  const search = document.querySelector('#search');

  //insert message
  searchContainer.insertBefore(div, search);
  /** Removing alert, with timeout */
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 2000);
}

//Truncate text
function truncateText(text, limit) {
  const shortened = text.indexOf('', limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}
