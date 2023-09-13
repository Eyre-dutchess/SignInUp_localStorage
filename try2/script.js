const headerBtn = document.querySelector(".header-btn");
const headerNav = document.querySelector(".header-nav");
headerBtn.addEventListener("click", ()=>{
    const visibility = headerNav.getAttribute("data-visible");
    if(visibility === "false"){
        headerBtn.setAttribute("aria-expanded", true);
        headerNav.setAttribute("data-visible", true);
    }else{
        headerBtn.setAttribute("aria-expanded", false);
        headerNav.setAttribute("data-visible", false);
    }
})

const mainContainer = document.querySelector("main");
const signInUpBtn = document.querySelector("[data-singin-up-btn]");
signInUpBtn.addEventListener("click", ()=>{
    mainContainer.classList.add("signPage")
})



const heroBtn = mainContainer.querySelector(".hero-btn");
const heroInput = mainContainer.querySelector("[data-hero-input]");
const heroForm = mainContainer.querySelector("[data-hero-form]");


const LOCAL_STORAGE_ACCOUNT_KEY = "account-info";
let accounts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ACCOUNT_KEY))||[];

heroBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    
    const newEmail = heroInput.value;
    
    if(newEmail === ""){
        setError(heroInput, "Email is required!")
    }else if( !isValidEmail(newEmail)){
        setError(heroInput, "Provide a valid email!")
    }else{
        
        heroForm.classList.remove("error");
        mainContainer.classList.add("signPage");
        
        if(accounts.find(item=> item.email === newEmail)){
            currentAcc = accounts.find(item=> item.email === newEmail );
            
        }else{
            const currentAcc = createNewAccount(newEmail);
            accounts.push(currentAcc);
            signForm.id = currentAcc.id;
            saveLS();
            
        }    
    }
})
function createNewAccount(emailValue){
    return{
        id: Date.now().toString(),
        userName: "",
        email: emailValue,
        password: "",
        fName: "",
        lName: "",
    }
}
function saveLS(){
    localStorage.setItem(LOCAL_STORAGE_ACCOUNT_KEY, JSON.stringify(accounts))
}

const signBtn = document.querySelector(".signup-btn");
const confettiContainer = document.querySelector(".confetti-container");

const signForm = document.querySelector("[data-sign-form]")
const userNameEl = document.querySelector("[data-user-name]");
const emailEl = document.querySelector("[data-email]");
const passwordEl = document.querySelector("[data-password]");
const fNameEl = document.querySelector("[data-fName]");
const lNameEl = document.querySelector("[data-lName]");

 
signBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    validateInput();
    const currentAcc = accounts.find(item=> item.id === signForm.id);
    currentAcc.userName = userNameEl.value;
    currentAcc.email = emailEl.value;
    currentAcc.password = passwordEl.value;
    currentAcc.fName = fNameEl.value;
    currentAcc.lName = lNameEl.value;

    saveLS()
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

function isValidEmail(email){
    const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateInput(){
    const userNameValue = userNameEl.value;
    const emailValue = emailEl.value
    const passwordValue =passwordEl.value
    const fNameValue = fNameEl.value
    const lNameValue = lNameEl.value

    if(userNameValue === ""){
        setError(userNameEl, "User name is required!")
    }else{
        setSuccess(userNameEl);
    }

    if(emailValue === ""){
        setError(emailEl, "Email is required!")
    }else{
        setSuccess(emailEl);
    }


    if(passwordValue === ""){
        setError(passwordEl, "Password is required!")
    }else{
        setSuccess(passwordEl);
    }


    if(fNameValue === ""){
        setError(fNameEl, "First name is required!")
    }else{
        setSuccess(fNameEl);
    }


    if(lNameValue === ""){
        setError(lNameEl, "Last name is required!")
    }else{
        setSuccess(lNameEl);
    }

    if(userNameValue === "" ||emailValue===""|| passwordValue==="" ||fNameValue ==="" || lNameValue ==="" ) return;
    else{
        confettiContainer.classList.add("explode");
        confettiContainer.addEventListener("animationend", ()=>{
            confettiContainer.classList.remove("explode")
        }, {once: true}); 
    }
}


