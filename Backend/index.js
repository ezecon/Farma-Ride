const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://mdeconozzama:rboEBf8GIcHBkN0x@cluster0.efsb2yz.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/users', require('./routes/users'));

app.listen(port, () => console.log(`Server running on port ${port}`));