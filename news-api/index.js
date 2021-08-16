const newsElement = document.getElementById("accordionFlushExample");

let api = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6e5518f8f0dc47659847b68f330be93d`;

const xhttl = new XMLHttpRequest(api);

xhttl.open("GET", api, true);

xhttl.onload = function () {
  if ( this.status === 200) {
    const jsonFile = JSON.parse(this.responseText);

    const article = jsonFile.articles;

    console.log(article);

    let news = "";

    article.forEach(function (element, index) {
      let newsHtml = `<div class="accordion-item">
    <h2 class="accordion-header" id="flush-heading${index}">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#flush-collapse${index}"
        aria-expanded="false"
        aria-controls="flush-collapse${index}"
      >
        <b>Top News ${index + 1}- </b> ${element["title"]}
      </button>
    </h2>
    <div
      id="flush-collapse${index}"
      class="accordion-collapse collapse"
      aria-labelledby="flush-heading${index}"
      data-bs-parent="#accordionFlushExample"
    >
      <div class="accordion-body">
        <h6>${element["content"]} . </h6>
        <a href="${element["url"]}">Read More</a>
      </div>
    </div>
  </div>`;

      news += newsHtml;

      newsElement.innerHTML = news;
    });
  } else {
    console.log("Some Error has Occured");
  }
};

xhttl.send();

