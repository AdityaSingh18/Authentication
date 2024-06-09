const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
console.log(process.env.MongoDB)
mongoose.connect(process.env.MongoDB)
.then(()=>{
    app.listen(3000 , (req,res)=>{
        console.log('running')
    })
})
