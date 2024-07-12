// Tasks:
// To show all countries
// To show flag of selected country
// Show the converion in a sentence as defined as example above convert button


const drop = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of drop){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if(select.name == "from" && code === "USD"){
            newOption.selected = true;
        }
        if(select.name == "to" && code === "INR"){
            newOption.selected = true;
        }
        select.append(newOption); 
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let code = element.value;
    let countryCode = countryList[code];
    //console.log(code,countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateConvert  = () => {
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if(amt === "" || amt < 1){
        amt = 1;
        amount.value ="1";
    }
    let result = amt * exchangeData[toCurr.value] / exchangeData[fromCurr.value];
    console.log(result);
    msg.innerText = `${amt} ${fromCurr.value} = ${result} ${toCurr.value}`;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();       // to prevent the default functionality of page when button clicked
    updateConvert();
    msg.style.fontWeight = "bold";
});

window.addEventListener("load",() => {
    updateConvert();
});