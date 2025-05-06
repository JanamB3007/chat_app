import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import path from "path";

import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app,server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT

const __dirname = path.resolve();

app.use(express.json()); // allows us to extract data from the body of the request
app.use(cookieParser()); // allows us to extract cookies from the request
app.use(cors({
    origin:"http://localhost:5174",
    credentials:true, // allows us to send cookies from the frontend to the backend
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}

server.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
    connectDB();
});