const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);



app.get('/', (req,res) =>{
    res.send('Hello word');
})

app.listen(4000, ()=>{
    console.log("escutando porta 4000");
});