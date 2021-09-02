document.getElementById("no-result").style.display = "none";
document.getElementById("spinner").style.display = "none";

const Searchbooks = () => {
  const serachField = document.getElementById("search-field");
  const searchText = serachField.value;

  serachField.value = "";
  document.getElementById("no-result").style.display = "block";
  //Error message will be displayed
  if (searchText === null) {
    document.getElementById("no-result").style.display = "block";
    document.getElementById("spinner").style.display = "none";
  } else {
    document.getElementById("spinner").style.display = "block";

    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    //load data
    fetch(url)
      .then((res) => res.json())
      // .then((data) => console.log(data.docs[0].first_publish_year));
      .then((data) => displaySearchResult(data.docs));

    const url2 = `https://openlibrary.org/search.json?q=${searchText}`;
    //load total results
    fetch(url2)
      .then((res) => res.json())
      .then((data) => displayNumFound(data.numFound));
  }
};

document.getElementById("no-result").style.display = "none";
const displayNumFound = (numbers) => {
  //Total Books Found
  const p = document.getElementById("num-found");
  p.textContent = "";

  const h2 = document.createElement("h2");
  h2.classList.add("col");
  h2.innerHTML = `<h2>Total Books Found ${numbers}</h2>
                 `;
  p.appendChild(h2);
};

const displaySearchResult = (bookitems) => {
  // console.log(bookitems)
  document.getElementById("spinner").style.display = "none";
  const searchResult = document.getElementById("search-result");
  //Clear Search Results
  searchResult.textContent = "";
  bookitems.forEach((book) => {
    console.log(book);
    document.getElementById("spinner").style.display = "none";
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
          <div class="card">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text"><span class= "Author">Author:</span> ${book.author_name}</p>
                        <p class ="card-text"><span class= "FirstPublish">First Publish:</span> ${book.first_publish_year}</p>
                        <p class ="card-text"><span class= "Publisher">Publisher:</span> ${book.publisher}</p>
                  </div>
          </div>`;
    searchResult.appendChild(div);
    //Error message will be gone
    document.getElementById("no-result").style.display = "none";

    //Total Books Count
    const p = document.getElementById("num-count");
    //Clear textcontent
    p.textContent = "";
    const h2 = document.createElement("h2");
    h2.classList.add("col");
    h2.innerHTML = `<h2>Total Books Count: ${bookitems.length}</h2>`;
    p.appendChild(h2);
  });
};
