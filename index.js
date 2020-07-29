const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
// Configuring the database
const dbConfig = require('./config/key');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("missions sukses");
}).catch(err => {
	console.log('gagal mengghubungkan ke database', err);
	process.exit();
});

// define a simple route
app.get('/', (req, res) => {
	res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

//mengatur route untuk menghubungkan ke front
require('./app/route/mahasiswa/route.mahasiswa')(app);
require('./app/route/dosen/route.dosen')(app);
require('./app/route/matakuliah/route.matakuliah')(app);
// app.use('/dosen', dos);
// listen for requests
const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});