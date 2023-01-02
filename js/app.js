function globalElement() {
  const header = document.createElement("header");
  const footer = document.createElement("footer");
  const linkBootStrap = document.createElement("link");
  const divMain = document.createElement("main");
  divMain.classList.add("main");
  const TVMaze = document.createElement("h2");
  const divHeader = document.createElement("div");
  const formEl = document.createElement("form");
  const inputSerch = document.createElement("input");
  const divSelect = document.createElement("div");
  divSelect.classList.add("divSelect");
  // append
  header.append(divHeader);
  divHeader.append(formEl);
  formEl.append(inputSerch);
  document.head.append(linkBootStrap);
  document.body.appendChild(header);
  document.body.appendChild(divMain);
  document.body.appendChild(footer);
  header.append(divSelect);
  header.append(TVMaze);
  //////////////////////////////////////////////////
  // input  - addeventlisner
  inputSerch.addEventListener("input", inputSerch1);
  //Attribute type input
  inputSerch.setAttribute("type", "serch");
  /////////////////////////////////////////////////
  //style
  header.classList.add("container", "mt-5");
  divHeader.classList.add("d-flex", "justify-content-center");
  divMain.classList.add(
    "d-flex",
    "justify-content-around",
    "flex-wrap",
    "container"
  );
  divSelect.classList.add("d-flex", "justify-content-center", "mt-4");
  inputSerch.setAttribute("placeholder", "serch");
  inputSerch.classList.add("p2");
  document.body.classList.add("bg-primary");
  ///////////
  // link bootStrap
  linkBootStrap.setAttribute(
    "href",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
  );
  linkBootStrap.setAttribute("rel", "stylesheet");
  linkBootStrap.setAttribute(
    "integrity",
    "sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
  );
  linkBootStrap.setAttribute("crossorigin", "anonymous");

  //////////////////////////////////////////////////////////////////////
  TVMaze.textContent = "TVMaze.com"; // logo header
}

//API SITE
const API_site = "https://api.tvmaze.com/shows/527/episodes";

let copyData = null;

// function async

const function_API = async () => {
  const fechurl = await fetch(API_site);
  const Jsonfech = await fechurl.json();
  copyData = Jsonfech;
  globalElement();
  createCards(copyData);
  selectFunction(copyData);
};
// end function async

function_API();

// functin  createCards
const createCards = (arrayOfObject) => {
  const divContainer = document.createElement("div");
  document.querySelector(".main").append(divContainer);
  divContainer.classList.add("div-Container");
  arrayOfObject.map((num) => {
    //creat element
    const divEl = document.createElement("div");
    const imgEl = document.createElement("img");
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    const headerNameBoxP = document.createElement("p");
    const episode = document.createElement("p");
    const download = document.createElement("a");

    //

    download.href = num.url;
    download.textContent = "Download";
    download.classList.add("bg-light")

    //style

    divEl.classList.add(
      "d-flex",
      "justify-content-center",
      "flex-column",
      "align-items-center",
      "container"
    );
    imgEl.classList.add("w-50");
    divEl.classList.add("border", "border-1");
    divEl.style.padding = "10px";
    divEl.style.margin = "30px";
    details.style.fontSize = "200%";
    episode.style.display = "inline-block";

    //

    //append
    divContainer.append(divEl);
    divEl.append(imgEl);
    divEl.append(details);
    details.append(summary);
    divEl.append(headerNameBoxP);
    divEl.append(episode);
    divEl.append(download);

    //

    imgEl.src = num.image.original; // img

    //text
    summary.textContent = "Summary of this episode"; //text summary

    details.textContent = num.summary.replace("<p>", "").replace("</p>", ""); // textdetails

    headerNameBoxP.innerHTML = `the episode's name :<b> ${num.name} </b>`;
    //

    //     season and number > 10 not 01 02 ..
    // num.season > 9
    //   ? (season.textContent = `S${num.season}`)
    //   : (season.textContent = `S0${num.season}`);
    // num.number > 9
    //   ? (episode.textContent = `E${num.number}`)
    //   : (episode.textContent = `E0${num.number}`);
    //   //

    episode.textContent = `S${num.season > 9 ? num.season : "0" + num.season}E${
      num.number > 9 ? num.number : "0" + num.number
    }`;
  });
};

// end function
/////////////////////////////////////////////////////////

//inpur serch
function inputSerch1(e) {
  if (document.querySelector(".paragraph-count")) {
    document.querySelector(".paragraph-count").remove();
  }
  document.querySelector(".div-Container").remove();
  const valueSerch = e.target.value;
  const copyDataInput = copyData.filter((ele) => {
    return (
      ele.summary.toLowerCase().includes(valueSerch.toLowerCase()) ||
      ele.name.toLowerCase().includes(valueSerch.toLowerCase())
    );
  });
  if (copyData.length === copyDataInput.length) {
    createCards(copyDataInput);
  } else {
    errorElement(copyDataInput.length);
    createCards(copyDataInput);
  }
}

function errorElement(count) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("paragraph-count");
  paragraph.textContent = `${count} episode found`;
  document.querySelector("header").append(paragraph);
}

function selectFunction(data) {
  const select = document.createElement("select");
  const optionEpisod = document.createElement("option");
  optionEpisod.value = "All";
  optionEpisod.textContent = "All-episodes ";
  select.append(optionEpisod);
  document.querySelector(".divSelect").append(select);
  data.map((ele) => {
    const option = document.createElement("option");
    select.append(option);
    option.textContent = `S${ele.season > 9 ? ele.season : "0" + ele.season}E${
      ele.number > 9 ? ele.number : "0" + ele.number
    } - ${ele.name}`;
    option.value = ele.name;
  });
  select.addEventListener("change", (e) => {
    if (document.querySelector(".paragraph-count")) {
      document.querySelector(".paragraph-count").remove();
    }
    const valueSerch = e.target.value;
    document.querySelector(".div-Container").remove();
    if (valueSerch === "All") {
      createCards(data);
    } else {
      const copyDataInput = copyData.filter((ele) => {
        return ele.name.includes(valueSerch);
      });
      createCards(copyDataInput);
    }
    // if (copyData.length === copyDataInput.length) {
    //   createCards(copyDataInput);
    // } else {
    //   errorElement(copyDataInput.length);
    //   createCards(copyDataInput);
    // }
  });
  //
}
