module.exports = (app) => {
	const matkuls = require('../../controller/matakuliah/controller.matakuliah');

	// Create a new data
	app.post('/matkuls', matkuls.create);

	// Retrieve all matkuls
	app.get('/matkuls', matkuls.findAll);

	// Retrieve a single mahasiswa with mahasiswaId
	app.get('/matkuls/:matkulId', matkuls.findOne);

	// Update a mahasiswa with matkulId
	app.put('/matkuls/:matkulId', matkuls.update);

	// Delete a mahasiswa with matkulId
	app.delete('/matkuls/:matkulId', matkuls.delete);
}