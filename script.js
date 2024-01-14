const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector(" [data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateButton");

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// default values
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSilder();


function handleSilder() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    // 
}

function setIndicator(color){

}

function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbols() {
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {

}

async function copyContent() {
    try {
     await navigator.clipboard.writeText(passwordDisplay.value);
     copyMsg.innerText = "copied";
    }

    catch(e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout ( () => {
        copyMsg.classList.remove("active");
    },2000);

}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function  handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    })
}

// special case
if(passwordLength < checkCount){
    passwordLength = checkCount;
    handleSilder();
}

allCheckBox.forEach ((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange );
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSilder();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)  // or password length >= 0
        copyContent();
})

generateBtn.addEventListener('click', () => {
    // none of the checkbox are  selected
    if(checkCount<=0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSilder();
    }

    password = ""; // reomove old one

    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password += generatelowerCase();
    // }

    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password += generateSymbols();
    // }


    let funcArr =  [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbols);

    //cumpulsory addition
    for(let i = 0;i<funcArr.length; i++){
        password += funcArr[i]();
    }

    // remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    // shuffle password
    password = shuffle(Array.from(password));

    passwordDisplay.value = password; //show in UI
    calcStrength();

})