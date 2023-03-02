
// ! =============> When Start ===============>
const mode = document.getElementById('mode');
if (localStorage.getItem('theme') === 'light') {
   mode.classList.replace('fa-sun','fa-moon');
   document.querySelector("html").setAttribute('data-theme','light')
}
else{
   mode.classList.replace('fa-moon','fa-sun');
       document.querySelector("html").setAttribute('data-theme','dark')
}
const paramSearch = location.search // ?id=517
const param = new URLSearchParams(paramSearch);
const id = param.get('id');
let details ={};
(async function getDetails() {  
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3a1e2dceeamshe1f8b635d25d02ep1d1b74jsn2439e62aad1a',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options);
    const response = await api.json();
    details = response;
    displayDetails()
    console.log(response);
})()

function displayDetails() {
    console.log(details);
    let detailBox = `
    <div class="col-md-4">
    <figure>
       <img src="${details.thumbnail}" class="w-100" alt="details image">
    </figure>
 </div>
 <div class="col-md-8">

   <div>
      <nav aria-label="breadcrumb">
         <ol class="breadcrumb">
            <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
            <li class="breadcrumb-item text-info" aria-current="page">${details.title}</li>
         </ol>
      </nav>

      <h1>${details.title}</h1>

      <h3>About${details.title}</h3>
      <p>${details.description}</p>
      
   </div>
</div>
 `
 document.getElementById('detailsData').innerHTML = detailBox;
 const backGroundImgSrc = details.thumbnail.replace('thumbnail','background');
document.body.style.cssText=`background-image:url('${backGroundImgSrc}'); background-size:cover; background-position:center;`
}

 mode.addEventListener('click',function () {
    if (mode.classList.contains('fa-sun')) {
        mode.classList.replace('fa-sun','fa-moon');
        document.querySelector("html").setAttribute('data-theme','light')
    }
    else{
        mode.classList.replace('fa-moon','fa-sun');
        document.querySelector("html").setAttribute('data-theme','dark')
    }
  })
