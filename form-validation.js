//

const patterns = {
  name: /^[a-zA-Z\s]{2,24}$/,
  contact: /^[0-9]{10}$/,
  email: /^[\w\.-]+@[\w-]+\.[\w\.]+([\w\.]{2,5)?$/,
  password: /^(?=.*[\w])(?=.*[@#$&%]).{8,24}$/,
};

const inputs = document.querySelectorAll("input");
let password=null
let captcha=null
// const button=document.querySelector('button')

const validate = (field, name) => {
  console.log(field, name);
if(field.value){
  if (patterns[name].test(field.value)) {
    field.classList.add("success");
    field.classList.remove("failure");
  } else {
    field.classList.add("failure");
    field.classList.remove("success");
  }
}else{
   field.classList.remove("failure");
    field.classList.remove("success");
}
};








const checkPassword = (field) => {
  console.log(field);
if(field.value){
  if (field.value=password){
    field.classList.add("success");
    field.classList.remove("failure");
  } else {
    field.classList.add("failure");
    field.classList.remove("success");
  }
}else{
   field.classList.remove("failure");
    field.classList.remove("success");
}
};



// const validateForm=(field)=>{
  // if(field.classList='success'){
  //  document.querySelector('button').disabled=false
  // }

//   else{
//     alert('please fill the form correctly')
//   }
// }




// inputs.forEach((input) => {
//   input.addEventListener("keyup", (e) => {
//     validate(e.target, e.target.name);
//   });
// });


inputs.forEach((input)=>{
    input.addEventListener('keyup',(e)=>{
        if(e.target.name!=='cnf_password' && e.target.name!=='captcha'){
            if(e.target.name=='password'){
                password=e.target.value
            }
            validate(e.target,e.target.name)
        }else if(e.target.name=='cnf_password'){
            checkPassword(e.target)
        }
else if(e.target.name=='captcha'){
captcha=e.target.value
}
    })
})





document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const userCaptcha=document.querySelector('#write_captcha').value
    if(userCaptcha==captcha){
      navigator.geolocation.getCurrentPosition((pos)=>{
console.log(pos.coords.latitude);
console.log(pos.coords.longitude);
    },()=>(
        alert('location blocked')
      ))
    }
    else{
      alert('captcha does not matched')
    }
})





function createCaptcha(){
    let cpt=''
    let chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#*'
    // let captcha=''  
    for(let i=0;i<5;i++){
        let num=Math.round(Math.random()*(chars.length-1));
        cpt+=chars[num]
    }
   captcha=cpt
    document.querySelector('#captcha_box').innerText=cpt
}

document.querySelector('#captcha_box+i').addEventListener('click',createCaptcha)

window.onload=()=>{
    createCaptcha()
}
