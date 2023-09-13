const signInForm = document.querySelector("[ data-signin-form]");
const signInName = document.querySelector("[data-signin-user-name]");
const signInNameContainer = signInName.parentElement;
const signInEmail = document.querySelector("[data-signin-email]");
const signInEmailContainer = signInEmail.parentElement;
const singInPassword = document.querySelector("[data-signin-password]");
const signInPasswordContainer = singInPassword.parentElement;
const signInBtn = document.querySelector("[data-signin-btn]");

let accounts =  JSON.parse(localStorage.getItem("account-info"))||[];

signInBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const userName = signInName.value;
    const email = signInEmail.value;
    const password = singInPassword.value;
   
    if(!accounts.find(item=> item.userName == userName)){
        setError(signInName, "Can't find this User name!")
    }else{
        setSuccess(signInName);
        const currentAcc = accounts.find(item=> item.userName == userName);
        if(email === currentAcc.email && password === currentAcc.password){
            setSuccess(signInEmail);
            setSuccess(singInPassword);
        }else{
            setError(singInPassword, "Wrong email or Password!")
        }
    }
})
function setError(input, message){
    const inputContainer = input.parentElement;
    const errorEl = inputContainer.querySelector(".error-span");

    inputContainer.classList.add("error");
    errorEl.innerText = message;
}
function setSuccess(input){
    const inputContainer = input.parentElement;
    inputContainer.classList.remove("error");
    inputContainer.classList.add("success"); 
}