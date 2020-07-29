const mongoose = require('mongoose');

const DosenSchema = mongoose.Schema({
	nama: String,
	alamat: String,
	jenis_kelamin: String,
	umur: Number,
	jabatan: String,
	email: String
}, {
	timestamps: true
});

// const dos = require('../../route/dosen/route.dosen');
module.exports = mongoose.model('dosen', DosenSchema);