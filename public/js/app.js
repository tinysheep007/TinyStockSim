//client side js

//first grab all the content you need
const price_form=document.querySelector(`#price_form`)
const search=document.querySelector(`#searched`)
const result=document.querySelector(`#result`)
const result2=document.querySelector(`#result2`)
const result3=document.querySelector(`#result3`)
const ur_money=document.querySelector(`#ur_money`)

//set the inital money amount

let money=5000
ur_money.textContent="Your current balance is: "+money+" dollars"

price_form.addEventListener(`submit`,(event)=>{
    //prevent the page auto refreshes when u submit
    event.preventDefault()
    //loading
    result.textContent="loading... Plz wait"
    const name=search.value
    const url='/price?name='+name

    //fetching data
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            //check if there's error
            if(data.error){
                result.textContent=data.error;
            }
            else{
                //addd more useful content
                //result.textContent="found data"
                result.textContent="current price: "+data.response.companyName 
                result2.textContent="Today's high:"+data.response.high+" dollars"
                result3.textContent="Today's low:"+data.response.low+" dollars"
                money=money-data.response.close
                ur_money.textContent="Your current balance is: "+money+" dollars"
               
            }
        })
    })
})