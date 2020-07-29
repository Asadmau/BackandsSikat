const Mdos = require('../../models/dosen/model.dosen');

exports.create = (req, res) => {
	//validasi
	if (!req.body.email) {
		return res.status(400).send({
			message: "email tidak ada"
		});
	}

	//create database dosen
	const dosen = new Mdos({
		nama: req.body.nama,
		alamat: req.body.alamat,
		jenis_kelamin: req.body.jenis_kelamin,
		umur: req.body.umur,
		jabatan: req.body.jabatan,
		email: req.body.email
	});

	//sava data 
	dosen.save().then(data => {
		res.send(data);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "creating error "
		});
	});
};

//menampilkan semua data
exports.findAll = function (req, res) {
	Mdos.find().then(dosens => {
		res.send(dosens);
	}).catch(err => {
		res.status(500).send({
			message: err.message || "Data Tidak Ditemukan"
		});
	})
}

//menampilkan satu data berdasarkan Id
exports.findOne = (req, res) => {
	Mdos.findById(req.params.id)
		.then(dosen => {
			if (!dosen) {
				return res.status(404).send({
					message: "Id Tidak ditemukan"
				});
			} res.send(dosen);
		}).catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "dosen not fount with Id" + req.params.id
				});
			}
			return res.status(500).send({
				message: "pencarian dosen dengan Id tidak di temukan" + req.params.id
			});
		});
};

//update data dosen berdasarka ID
exports.update = function (req, res) {
	//validasi request update
	if (!req.body.email) {
		return res.status(400).send({
			message: "email tidak valid"
		});
	}

	Mdos.findByIdAndUpdate(req.params.dosenId, {
		nama: req.body.nama,
		alamat: req.body.alamat,
		jenis_kelamin: req.body.jenis_kelamin,
		umur: req.body.umur,
		jabatan: req.body.jabatan,
		email: req.body.email
	}, { new: true }).then(dosen => {
		if (!dosen) {
			return res.status(400).send({
				message: "id tidak ditemukan" + req.params.dosenId
			});
		} res.send(dosen);
	}).catch(err => {
		if (err.kind === 'ObjectId') {
			return res.status(404).send({
				message: "id tidak ditemukan" + req.params.dosenId
			});
		};
	});
};

//delete database berdasarkan ID
exports.delete = function (req, res) {
	Mdos.findByIdAndRemove(req.params.dosenId)
		.then(dosen => {
			if (!dosen) {
				return res.status(404).send({
					message: "id tidak tersedia " + req.params.dosenId
				});
			}
			res.send({ message: "dosen deleted successfully!" });
		}).catch(err => {
			if (err.kind === 'ObjectId' || err.nama === 'NotFound') {
				return res.status(404).send({
					message: "data yang di cari tidak ada " + req.params.dosenId
				});
			}
			return res.status(500).send({
				message: "id tidak bisa di hapus " + req.params.dosenId
			});
		});
}