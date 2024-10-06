const express = require('express');
const cors = require('cors');
const DbCon = require('./utils/db');
const AuthRoutes = require('./routes/Auth');
const cookieParser = require('cookie-parser');
const AdminRoutes = require('./routes/AdminRoute');
const { isAdmin } = require('./middleware/verfyToken');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 4000;
// mongo db
DbCon();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true, // allows cookies to be sent
  }));
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AdminRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))