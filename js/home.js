// ? =============> Global ===============>
const loader = document.querySelector('.loading');
const mode = document.getElementById('mode');
// ! =============> When Start ===============>

if (localStorage.getItem('theme') === 'light') {
    mode.classList.replace('fa-sun','fa-moon');
    document.querySelector("html").setAttribute('data-theme','light')
}
else{
    mode.classList.replace('fa-moon','fa-sun');
        document.querySelector("html").setAttribute('data-theme','dark')
}
getGames('mmorpg');
// * =============> Events ===============>

document.querySelectorAll('.menu a').forEach(function (link) {
    link.addEventListener('click', function () {
       document.querySelector('.active').classList.remove('active')
       link.classList.add('active');
       const category = link.getAttribute('data-category');
       getGames(category);
      })
  })

 mode.addEventListener('click',function () {
    if (mode.classList.contains('fa-sun')) {
        mode.classList.replace('fa-sun','fa-moon');
        document.querySelector("html").setAttribute('data-theme','light')
        localStorage.setItem('theme','light');
    }
    else{
        mode.classList.replace('fa-moon','fa-sun');
        document.querySelector("html").setAttribute('data-theme','dark')
        localStorage.setItem('theme','dark');
    }
  })

// ! =============> Functions ===============>

async function getGames(category) {
    loader.classList.remove('d-none')
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3a1e2dceeamshe1f8b635d25d02ep1d1b74jsn2439e62aad1a',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
    const response = await api.json();
    console.log(response);
    displayGames(response)
    loader.classList.add('d-none')
}


function displayGames(games) {
    let cartona=``
    for (let i = 0; i < games.length; i++) {
        let videoPath = games[i].thumbnail.replace('thumbnail.jpg','videoplayback.webm')
       cartona += `<div class="col">
       <div onmouseleave="stopVideo(event)" onmouseenter="startVideo(event)" class="card h-100 bg-transparent" role="button" onclick="showDetails(${games[i].id})">
          <div class="card-body">
             <figure class="position-relative">
                <img class="card-img-top object-fit-cover h-100" src=${games[i].thumbnail}>
              <video muted="true" preload="none" loop="" class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
               <source src=${videoPath}>
               </video>
             </figure>
 
             <figcaption>
 
                <div class="hstack justify-content-between">
                   <h3 class="h6 small">${games[i].title}</h3>
                   <span class="badge text-bg-primary p-2">Free</span>
                </div>
 
                <p class="card-text small text-center opacity-50">
                   ${games[i].short_description}
                </p>
 
             </figcaption>
          </div>
 
          <footer class="card-footer small hstack justify-content-between">
 
             <span class="badge badge-color">${games[i].genre}</span>
             <span class="badge badge-color">${games[i].platform}</span>
 
          </footer>
       </div>
    </div>`
        
    }
    document.getElementById('gameData').innerHTML = cartona;
}

function startVideo(event){
    let videoEL =event.target.querySelector('video');
    videoEL.classList.remove('d-none');
    videoEL.muted = true // deh a7tyaty feh browsers lazm a7t deh al2wl
    videoEL.play();
}
function stopVideo(event){
    let videoEL =event.target.querySelector('video');
    videoEL.classList.add('d-none');
    videoEL.muted = true // deh a7tyaty feh browsers lazm a7t deh al2wl
    videoEL.pause();
}

function showDetails(id) {
    location.href=`./details.html?id=${id}`
}

document.querySelector('.logout-btn').addEventListener('click', function(){
    localStorage.removeItem('uToken')
    location.href='./index.html'
})