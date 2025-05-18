const express = require('express');
const mongoose = require('mongoose'); 
const exploredRouter = require('./router/elxploredData.router.js');
require("dotenv").config();
const app = express();
const cors = require('cors')

mongoose.connect(`${process.env.connectionstr}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.use(express.json());


const allowedOrigins = [
  'http://localhost:5173'
];
if (process.env.NODE_ENV !== 'production') {
  allowedOrigins.push('*');
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));



app.use((req, res, next) => {
    exploredRouter(req,res,next)
})


app.listen(process.env.PORT || 9000, () => {
  console.log(`Server is running on port ${process.env.PORT || 9000}`);
});
