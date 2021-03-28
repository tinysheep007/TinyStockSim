const request=require(`request`)

const stock_price=function(company_name,callback){
    //token: pk_d967d5d6534d40dca158aed54f7ea4a5 
    const url=`https://cloud-sse.iexapis.com/stable/stock/`+company_name+`/quote?token=pk_d967d5d6534d40dca158aed54f7ea4a5`
    request({url , json:true},(error, { body }={})=>{
        if(error){
            //the first parameter for callback is error and second is info
            callback(`Unable to connect to IEX-stock API!`,undefined)
        }
        else if(body.error){
            callback(`Please type in a valid company name !`,undefined)
        }
        else{
            //save all useful variables
            const symbol=body.symbol
            const companyName=body.companyName
            const close=body.close
            const high=body.high
            const low=body.low
            
            console.log(symbol)
            console.log(companyName)
            console.log(close)
            console.log(high)
            console.log(low)
            callback(undefined,{
                companyName,
                symbol,
                close,
                high,
                low,
                extendedPrice: body.extendedPrice
            })
        }
        
        
        }
    )
}

module.exports=stock_price