
const getconnection=require('./db');
const express = require('express');
var cors=require('cors');
 getconnection();
 
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth') )
app.use('/api/notes',require('./routes/notes'))
  
  app.listen(5000, () => {
    console.log('inotebook is running at http://localhost:5000');
  });
