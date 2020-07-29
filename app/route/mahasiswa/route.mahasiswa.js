module.exports = (app) => {
	const mahasiswas = require('../../controller/mahasiswa/controller.mahasiswa');

	// Create a new data
	app.post('/mahasiswas', mahasiswas.create);

	// Retrieve all mahasiswas
	app.get('/mahasiswas', mahasiswas.findAll);

	// Retrieve a single mahasiswa with mahasiswaId
	app.get('/mahasiswas/:mahasiswaId', mahasiswas.findOne);

	// Update a mahasiswa with mahasiswaId
	app.put('/mahasiswas/:mahasiswaId', mahasiswas.update);

	// Delete a mahasiswa with mahasiswaId
	app.delete('/mahasiswas/:mahasiswaId', mahasiswas.delete);
}