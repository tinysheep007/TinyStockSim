//import all the modules and methods
const path=require(`path`)
const express=require(`express`)
const app=express()
const hbs=require(`hbs`)
const stock_price=require(`./utils/stock_price`)
//set up paths for folder to serve and hbs view's folder
const public_dir=path.join(__dirname,`../public`)
const viewsDir=path.join(__dirname,`../temp/views`)
const partialPath=path.join(__dirname,`../temp/partial`)
//if heroku's port exist use that port, else use local port 3000
const port=process.env.PORT || 3000

//set up correct path for hbs
app.set(`view engine`,`hbs`)
app.set(`views`,viewsDir)
hbs.registerPartials(partialPath)

//serve up the static folder
app.use(express.static(public_dir))


app.get(`/`,(req,res)=>{
    res.render('index',{})
})

app.get(`/price`,(req,res)=>{
    if(!req.query.name){
        return res.send({
            error:"Please enter a company name"
        })
    }
    //identity type of either buying, selling, or searching 
    const transactions=req.query.transactions

    const name=req.query.name
    stock_price(name,(error,response)=>{
        //if error is responded back by the API
        if(error){
            res.send({
                error
            })
        }

        return res.send({
            response
        })
    })

})

app.listen(port,()=>{
    console.log(`app is listening at `+port)
})