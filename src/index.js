import dotenv from "dotenv";
import express from "express"


const app= express();
dotenv.config()

const PORT =process.env.PORT|| 3000
app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})