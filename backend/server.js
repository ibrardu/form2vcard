const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/form2vcard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userRoutes = require('./routes/userRoutes');
const vCardRoutes = require('./routes/vCardRoutes');
app.use('/api/users', userRoutes);
app.use('/api/vcards', vCardRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
