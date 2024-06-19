// index.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./config/db.config"); // Corrected import
const userRouter = require("./controllers/user");
const handleError = require('./utils/errorHandler');
const { isLoggedIn } = require("./controllers/middleware");
const parkingRouter = require("./controllers/parking");
const paymentMethodRouter = require("./controllers/paymentMethod");
const bookingRouter = require("./controllers/booking");
const spaceRouter = require("./controllers/spaceRouter");
const cors = require('cors');
const reviewRouter = require("./controllers/review");

// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

app.use(cors())

// Connect Database
connectDB(); // Now directly calling the function

app.get('/',  (req, res) => {
    res.json({ message: 'server is running'})
})
app.use("/user", userRouter)
app.use("/parking", parkingRouter)
app.use("/paymentMethod", paymentMethodRouter)
app.use("/booking", bookingRouter)
app.use("/space", spaceRouter)
app.use("/review", reviewRouter)

// Error handler

app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    handleError(error, res);
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
