const mongoose = require('mongoose');

const MtkulSchema = mongoose.Schema({
	nama: String,
	sks: Number,
	semester: String,
	tahun_ajar: String,
	dosen: String,
}, {
	timestamps: true
});

module.exports = mongoose.model('matkul', MtkulSchema);