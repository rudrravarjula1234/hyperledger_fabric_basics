module.exports = app => {
    const carDealerController = require('../controllers/cardealer.controller')

    // app.route('/carDealer')
    //     .post(personController.create)
    //     .get(personController.read)

    // app.route('/carDealer/:id')
    //     .put(personController.update)
    //     .delete(personController.delete)
    //     .get(personController.readById)

    app.route('/carDealer')
        .get(carDealerController.read)

}