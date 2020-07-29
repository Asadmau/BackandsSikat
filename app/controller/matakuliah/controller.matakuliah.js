const Mtkul = require('../../models/matakuliah/model.matakuliah');

// Create and Save a new mahasiswa
exports.create = (req, res) => {
	// Validate request
	if (!req.body.nama) {
		return res.status(400).send({
			message: "matakuliah tidak ditemukan"
		});
	}

	// Create a database
	const matkul = new Mtkul({
		nama: req.body.nama,
		sks: req.body.sks,
		semester: req.body.semester,
		tahun_ajar: req.body.tahun_ajar,
		dosen: req.body.dosen
	});

	// Save in the database
	matkul.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "creating error matakuliah"
			});
		});
};

// tampilkan semua data di dalam database.
exports.findAll = (req, res) => {
	Mtkul.find()
		.then(matkuls => {
			res.send(matkuls);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving matakuliah."
			});
		});
};

// mencari 1 data berdasarkan Id
exports.findOne = (req, res) => {
	Mtkul.findById(req.params.matkulId)
		.then(matkul => {
			if (!matkul) {
				return res.status(404).send({
					message: "data tidak ditemukan " + req.params.matkulId
				});
			}
			res.send(matkul);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "matakuliah not found with id " + req.params.matkulId
				});
			}
			return res.status(500).send({
				message: "Error retrieving matakuliah with id " + req.params.matkulId
			});
		});
};

// Update data berdasarkan id
exports.update = (req, res) => {
	// Validate Request
	if (!req.body.nama) {
		return res.status(400).send({
			message: "nama tidak ditemukan"
		});
	}

	// cari dan update
	Mtkul.findByIdAndUpdate(req.params.matkulId, {
		nama: req.body.nama,
		sks: req.body.sks,
		semester: req.body.semester,
		tahun_ajar: req.body.tahun_ajar,
		dosen: req.body.dosen
	}, { new: true })
		.then(matkul => {
			if (!matkul) {
				return res.status(404).send({
					message: "id tidak lagi tersedia " + req.params.matkulId
				});
			}
			res.send(matkul);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "id tidak tersedia " + req.params.matkulId
				});
			}
			return res.status(500).send({
				message: "Error updating mahasiswa with id " + req.params.matkulId
			});
		});
};

// delete database berdasarkan id
exports.delete = (req, res) => {
	Mtkul.findByIdAndRemove(req.params.matkulId)
		.then(matkul => {
			if (!matkul) {
				return res.status(404).send({
					message: "id tidak tersedia " + req.params.matkulId
				});
			}
			res.send({ message: "matkul deleted successfully!" });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "id tidak tersedia " + req.params.matkulId
				});
			}
			return res.status(500).send({
				message: "id tidak bisa di hapus " + req.params.matkulId
			});
		});
};
