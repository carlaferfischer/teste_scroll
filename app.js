const cardContainer = document.getElementById("card-container");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const loader = document.getElementById("loader");

const cardLimit = 100;
const cardIncrease = 10;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

cardTotalElem.innerHTML = cardLimit;

var throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360);

  return `hsl(${h}deg, 90%, 85%)`;
};

const createCard = (index) => {
		document.body.innerHTML += 
		 `
		<div id="cards">
			<div>
            	<div>
                	<div class="card mx-2 mt-5 p-0" style="width: 14rem;">
                    		<img class="card-img-top my-1" src="cadeado.png" style="height: 13rem;"
                        alt="Imagem de capa do card">
                    	<div class="card-body">
                        	<h5>Nome do produto</h5>
                        	<p id="text" class="card-text">linkar o nome e as informações dos Produtos</p>
					</div>
				</div>
				</div>
			</div>
		</div>
		`;
	}

const addCards = (pageIndex) => {
  currentPage = pageIndex;

  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange =
    currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;

  cardCountElem.innerHTML = endRange;

  for (let i = startRange + 1; i <= endRange; i++) {
    createCard(i);
  }
};

const handleInfiniteScroll = () => {
  throttle(() => {
    const endOfPage =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) {
      addCards(currentPage + 1);
    }

    if (currentPage === pageCount) {
      removeInfiniteScroll();
    }
  }, 1000);
};

const removeInfiniteScroll = () => {
  loader.remove();
  window.removeEventListener("scroll", handleInfiniteScroll);
};

window.onload = function () {
  addCards(currentPage);
};

window.addEventListener("scroll", handleInfiniteScroll);
