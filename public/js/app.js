//client side js

//first grab all the content you need
const price_form=document.querySelector(`#price_form`)
const search=document.querySelector(`#searched`)
const result=document.querySelector(`#result`)
const result2=document.querySelector(`#result2`)
const result3=document.querySelector(`#result3`)
const result4=document.querySelector(`#result4`)
const ur_money=document.querySelector(`#ur_money`)
const buy_form=document.querySelector(`#buy_form`)
const buy_name_seached=document.querySelector(`#buy_name_seached`)
const buy_number_searched=document.querySelector(`#buy_number_searched`)
const sell_form=document.querySelector(`#sell_form`)
const sell_name_seached=document.querySelector(`#sell_name_seached`)
const sell_number_searched=document.querySelector(`#sell_number_searched`)
const myStonk=document.querySelector(`#myStonk`)


//set the inital money amount

let money=5000
ur_money.textContent="Your current balance is: "+money+" dollars"

//set up all the owned stocks
let owned_stock=[]

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
                result.textContent="current price: "+ data.response.close + " dollars"
                result2.textContent="Today's high:"+data.response.high+" dollars"
                result3.textContent="Today's low:"+data.response.low+" dollars"
                ur_money.textContent="Your current balance is: "+money+" dollars"
               
            }
        })
    })
})

buy_form.addEventListener('submit',(event)=>{
    //prevent the page auto refreshes when u submit
    event.preventDefault()
    //loading
    result.textContent="loading... Plz wait"
    const name=buy_name_seached.value
    console.log(name)
    const amt=buy_number_searched.value
    console.log(amt)
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
                result.textContent="Comp Name: "+data.response.companyName +" price: "+data.response.close + " dollars"
                result2.textContent="Today's high: "+data.response.high+" dollars"
                result3.textContent="Today's low: "+data.response.low+" dollars"
                result4.textContent=""
                if(money-(amt*data.response.close)<0){
                    result4.textContent="Not Enough Money Honey !"
                }
                else{
                    money=money-(amt*data.response.close)
                    ur_money.textContent="Your current balance is: "+money+" dollars"
                    let i
                    for(i=0;i<owned_stock.length;i++){
                        if(data.response.symbol===owned_stock[i].symbol){
                            owned_stock[i].amount=(owned_stock[i].amount)+parseInt(amt)
                            my_Stock()
                            result4.textContent="Bought Success Honey!"
                            return;
                        }
                    }
                    owned_stock.unshift({
                        symbol:data.response.symbol,
                        amount:parseInt(amt),
                        price:data.response.close,
                        boughtTime: new Date()
                    })
                    my_Stock()
                    
                    
                }
                
               
            }
        })
    })
})

sell_form.addEventListener('submit',(event)=>{
    //prevent the page auto refreshes when u submit
    event.preventDefault()
    //loading
    result.textContent="loading... Plz wait"
    const name=sell_name_seached.value
    const amt=sell_number_searched.value
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
                result4.textContent=""
                if(owned_stock===null || owned_stock.length==0){
                    result4.textContent="You do not have nay stocks Honey !"
                }else{
                    //need more work
                    let i
                    for(i=0;i<owned_stock.length;i++){
                        if(data.response.symbol===owned_stock[i].symbol){
                            if(amt<=owned_stock[i].amount){
                                owned_stock[i].amount=(owned_stock[i].amount)-parseInt(amt)
                                money=money+(amt*data.response.close)
                                ur_money.textContent="Your current balance is: "+money+" dollars"
                                my_Stock()
                                result4.textContent="Sold Success Honey!"
                                return;
                            }
                            else {
                                result4.textContent="You do not have enough shares for this stock Honey !"
                            }
                        }
                    }
                    
                }
                
               
            }
        })
    })
})

//figoure out how to print the entire array
function my_Stock(){

    let i
    myStonk.textContent=""
    for(i=0; i<owned_stock.length; i++){
        if(owned_stock[i].amount>=1){
            let node=document.createElement(`li`)
            let textnode = document.createTextNode("Name: "+owned_stock[i].symbol+"  Amt: "+owned_stock[i].amount);
            node.appendChild(textnode);
            myStonk.appendChild(node);
        }
        
        
    }
   
}