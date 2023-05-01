const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

//Declare the approriate routes to the proper route
const calendarRoutes = require('./routes/calendarItem');
const carRoutes = require('./routes/carReserve');
const checklistRoutes = require('./routes/checklist');
const flightRoutes = require('./routes/flightReserve');
const hotelRoutes = require('./routes/hotelReserve');
const packinglistRoutes = require('./routes/packinglist');
const tripRoutes = require('./routes/trip');

const errorController = require('./controllers/error');


const app = express();
const  port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req,res,next)=>{ 
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});



app.use('/auth', authRoutes);

app.use('/calendar', calendarRoutes);
app.use('/cars', carRoutes);
app.use('/checklists', checklistRoutes);
app.use('/flights', flightRoutes);
app.use('/hotels', hotelRoutes);
app.use('/packinglists', packinglistRoutes);
app.use('/trip', tripRoutes);


app.use(errorController.get404);
app.use(errorController.get500);


app.listen(port,()=>console.log(`Listening on port ${port}`));


