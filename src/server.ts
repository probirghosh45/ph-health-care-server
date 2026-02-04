/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server } from "node:http";
import app from "./app.js";


function bootstrap() {
    let server: Server | null = null
    try {
        server = app.listen(5000,()=>{
            console.log("PH Health care running on port 5000")
        })
    } catch (error) {
        console.log("failed to start the server",error)
    } 
}

bootstrap()