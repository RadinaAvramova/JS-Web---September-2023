const { PORT }  = require('./config/constans');

const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { auth } = require('./middlewares/authMiddleware');
const routes = require('./routes');


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/petstargam')
.then(() => console.log('DB Connect successfully!'))
.catch(err => console.log('DB Error:', err.message));


app.engine('hbs', handlebars.engine({extname: 'hbs'}));

app.set('view engine', 'hbs');
app.set('views', 'src/views');


app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth); // required after cookieParser!
app.use(routes);


app.listen(PORT, console.log(`Server is listening on port ${PORT}...`));
