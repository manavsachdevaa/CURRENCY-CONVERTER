// const URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
// const URL="https://api.frankfurter.app/latest?amount"

let dropdowns=document.querySelectorAll(".dropdown select")
// for (code in countryList){
//     console.log(code,countryList[code])
// }
let btn=document.querySelector("button")
let fromcurr=document.querySelector(".from select")
let tocurr=document.querySelector(".to select")
let msg=document.querySelector(".msg")
for(let select of dropdowns){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name=="from"&&currcode=="USD"){
            newoption.selected="selected"
        }
        else if(select.name=="to"&&currcode=="INR"){
            newoption.selected="selected"
        }
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
    
}
const updateflag=(element)=>{
    let currcode=element.value
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newsrc
}
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input")
    let amtval=amount.value;
    console.log(amtval)
    if(amtval==" " || amtval<1){
        // amtval=1;
        amount.value="1"
    }
    console.log(fromcurr.value,tocurr.value)
    // const BASE_URL=`${URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}/.json`
    const BASE_URL=`https://api.frankfurter.app/latest?amount=${amtval}&from=${fromcurr.value}&to=${tocurr.value}`;
    let response=await fetch(BASE_URL)
    let data=await response.json();
    let rate=data.rates[tocurr.value]
    let finalamount=rate;
    msg.innerText=`${amtval} ${fromcurr.value}=${finalamount} ${tocurr.value}`


    console.log(rate)

    // console.log(response)

})
