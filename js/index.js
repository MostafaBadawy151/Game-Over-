// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");
const btnLogin = document.getElementById('btnLogin');
const myForm= document.querySelector('form')
let isValid = false;
console.log(inputs);

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
// * =============> Events ===============>
myForm.addEventListener('submit', function (e) { 
    e.preventDefault();
    if (isValid == true) {
         setForm();
    }
 })
myForm.addEventListener('input', function () {
    if (validationEmail()&&validationPassword()) {
        isValid = true;
    }

})
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

// ! =============> Functions ===============>

function setForm() {
    const user={
        email:inputs[0].value,
        password:inputs[1].value,
    }
    console.log(user);
    registerForm(user);
  }

async function registerForm(userData) {
    const api = await fetch('https://sticky-note-fe.vercel.app/signin',{
        method:'POST',
        body:JSON.stringify(userData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    })

     const response = await api.json();
     console.log(response);

     if (response.message === 'success') {
        localStorage.setItem('uToken',`${response.token}`)
        location.href = "./home.html"  
     }
     else{
        document.getElementById('msg').innerHTML= response.message;
        document.getElementById('msg').classList.remove('d-none')
     }  

}
//  =============> Validation ===============>


function validationEmail() {
    const regxSyle = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
   if (regxSyle.test(inputs[0].value)) {
    inputs[0].classList.add('is-valid');
    inputs[0].classList.remove('is-invalid');
    return true
   } 
   else{
    inputs[0].classList.add('is-invalid');
    inputs[0].classList.remove('is-valid');
    return false;
   }
}
function validationPassword() {
    const regxSyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
   if (regxSyle.test(inputs[1].value)) {
    inputs[1].classList.add('is-valid');
    inputs[1].classList.remove('is-invalid');
    return true
   } 
   else{
    inputs[1].classList.add('is-invalid');
    inputs[1].classList.remove('is-valid');
    return false;
   }
}

