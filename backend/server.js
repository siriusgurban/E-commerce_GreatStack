import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//App Config
const app = express();
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())


//api endpoint

app.get('/',(req, res)=>{
    res.send("Api Woking")
})

app.listen(port, ()=>console.log("Port listening",+ port))