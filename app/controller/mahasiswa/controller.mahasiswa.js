const Mhs = require('../../models/mahasiswa/model.mahasiswa');

// Create and Save a new mahasiswa
exports.create = (req, res) => {
	// Validate request
	if (!req.body.email) {
		return res.status(400).send({
			message: "email tidak ditemukan"
		});
	}

	// Create a database
	const mahasiswa = new Mhs({
		nama: req.body.nama,
		alamat: req.body.alamat,
		email: req.body.email
	});

	// Save in the database
	mahasiswa.save()
		.then(data => {
			res.send(data);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "creating error mahasiswa"
			});
		});
};

// tampilkan semua data di dalam database.
exports.findAll = (req, res) => {
	Mhs.find()
		.then(mahasiswas => {
			res.send(mahasiswas);
		}).catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving mahasiswas."
			});
		});
};

// mencari 1 data berdasarkan Id
exports.findOne = (req, res) => {
	Mhs.findById(req.params.mahasiswaId)
		.then(mahasiswa => {
			if (!mahasiswa) {
				return res.status(404).send({
					message: "data tidak ditemukan " + req.params.mahasiswaId
				});
			}
			res.send(mahasiswa);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "mahasiswa not found with id " + req.params.mahasiswaId
				});
			}
			return res.status(500).send({
				message: "Error retrieving mahasiswa with id " + req.params.mahasiswaId
			});
		});
};

// Update data berdasarkan id
exports.update = (req, res) => {
	// Validate Request
	if (!req.body.email) {
		return res.status(400).send({
			message: "email tidak ditemukan"
		});
	}

	// cari dan update
	Mhs.findByIdAndUpdate(req.params.mahasiswaId, {
		nama: req.body.nama,
		alamat: req.body.alamat,
		email: req.body.email
	}, { new: true })
		.then(mahasiswa => {
			if (!mahasiswa) {
				return res.status(404).send({
					message: "id tidak lagi tersedia " + req.params.mahasiswaId
				});
			}
			res.send(mahasiswa);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "id tidak tersedia " + req.params.mahasiswaId
				});
			}
			return res.status(500).send({
				message: "Error updating mahasiswa with id " + req.params.mahasiswaId
			});
		});
};

// delete database berdasarkan id
exports.delete = (req, res) => {
	Mhs.findByIdAndRemove(req.params.mahasiswaId)
		.then(mahasiswa => {
			if (!mahasiswa) {
				return res.status(404).send({
					message: "id tidak tersedia " + req.params.mahasiswaId
				});
			}
			res.send({ message: "Mahasiswa deleted successfully!" });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: "id tidak tersedia " + req.params.mahasiswaId
				});
			}
			return res.status(500).send({
				message: "id tidak bisa di hapus " + req.params.mahasiswaId
			});
		});
};
