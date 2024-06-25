const express = require('express');
const mongoose = require('mongoose');
const Note = require('./modal/Notes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/noteapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use(express.json())
app.use('/api', require('./routes/notes'))



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
