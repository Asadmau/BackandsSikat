const mongoose = require('mongoose');

const MhsSchema = mongoose.Schema({
	nama: String,
	alamat: String,
	jenis_kelamin: String,
	umur: Number,
	email: String,

}, {
	timestamps: true
});

module.exports = mongoose.model('Mahasiswa', MhsSchema);