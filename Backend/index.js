const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb+srv://mdeconozzama:rboEBf8GIcHBkN0x@cluster0.efsb2yz.mongodb.net/data?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users.js'));
app.use('/api/users/login', require('./Verification/Auth.js'));
app.use('/api/medicines', require('./routes/medicines.js'));

app.listen(port, () => console.log(`Server running on port ${port}`));
