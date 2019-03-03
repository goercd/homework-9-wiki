// Constants
const CONTAINER = document.getElementsByClassName('js-container')[0];
const HEADING = document.getElementsByTagName('h1')[0];
const RANDOM_BUTTON = document.getElementsByClassName('js-btns__random')[0];
const RANDOM_URL = 'https://en.wikipedia.org/wiki/Special:Random';
const SEARCH_BAR = document.getElementsByClassName('js-search-bar')[0];
const SEARCH_BUTTON = document.getElementsByClassName('js-btns__search')[0];
const BUTTONS = document.getElementsByClassName('btns')[0];
const FOOTER = document.getElementsByTagName('footer')[0];




function search(){
    let searchTerm = encodeURIComponent(SEARCH_BAR.value);
    let url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${searchTerm}`;


    fetch(url)
    .then(data => data.json())
    .then(data => displayArticles(data))
    .catch(function(error){
      console.log(error);
    });
  }


function keySearch(e){
  if (e.keyCode == 13){
    search();
    return false;
  } else {
    return true;
  }
}


function displayArticles(data){
  SEARCH_BAR.value = "";
  CONTAINER.removeChild(SEARCH_BAR);
  CONTAINER.removeChild(BUTTONS);

  let searchResults = data.query.search;


  searchResults.map( obj => {
    let title = obj.title;
    let pageid = obj.pageid;
    let snippet = obj.snippet;


    let el = createArticle(title, snippet, pageid);


    CONTAINER.insertBefore(el, FOOTER);
  });


  let backButton = document.createElement('button');
  backButton.className = 'back';
  backButton.innerText = 'Go Back';
  CONTAINER.insertBefore(backButton, FOOTER);
  backButton.addEventListener('click', returnSearch);

}


function createArticle(title, snippet, pageid){
  let pageURL = `https://en.wikipedia.org/?curid=${pageid}`;

  let h2 = document.createElement('h2');
  h2.innerText = title;
  let p = document.createElement('p');
  p.innerHTML = snippet;
  let article = document.createElement('article');
  let link = document.createElement('a');

 
  return link;
}


function returnSearch(){
  let articles = Array.from(document.getElementsByClassName('article'));
  articles.forEach( article => {
    article.parentNode.removeChild(article);
  });




if (document.readyState === 'complete' || document.readyState !== 'loading') {
  onLoad();
} else {
  document.addEventListener('DOMContentLoaded', onLoad);
}