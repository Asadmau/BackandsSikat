module.exports = (app) => {
	//dosens dari controller dosens
	const dosens = require('../../controller/dosen/controller.dosen');

	//create new data dosen
	app.post('/dosens', dosens.create);

	//read all dosens
	app.get('/dosens', dosens.findAll);

	//read singgle dosens Id
	app.get('/dosens/:id', dosens.findOne);

	//update data base berdasarkan ID
	app.put('/dosens/:dosenId', dosens.update);

	//delete data dosens with dosens Id
	app.delete('/dosens/:dosenId', dosens.delete);

}