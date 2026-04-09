import express from 'express'
import AuthRouter from './authRoutes.js'
import cors from 'cors'

const app = express()


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json())
app.use('/api/auth',AuthRouter)

const port = Number(process.env["PORT"]) || 3001;
app.listen(port,()=>{
    console.log(`Listening on ${port}`)
})
