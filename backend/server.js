require('dotenv').config()
const mongoose = require('mongoose');

const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const call = require('./routes/saveRoutes');
const saveRoutes = require('./routes/saveRoutes');
const newsRoutes = require('./routes/newsRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

//middleware
app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(morgan('dev'));

app.use('/save', saveRoutes);
app.use('/news', newsRoutes);
app.use('/user', userRoutes);



mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT);
        })
    })
    .catch(error => {
        console.log(error);
    })
