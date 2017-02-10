  var cars = require('../models/cars');
  function indexCars(req , res) {
    res.status(200).render("posts/index", {cars:cars});
  }

 function showCars(req , res) {
    var car = cars[req.params.id]
    if(!car) {
      return res.status(404).send();
    }
    res.status(200).render("posts/show", {car: cars[req.params.id]});
  }

  // EDIT - GET /:id/edit
  function editCars(req , res) {
    res.status(200).render("posts/edit", {car: cars[req.params.id]});
  }

  // NEW - GET /new
  function newCars(req , res) {
    var car = {
      id: "",
      name: "",
      price: "",
      condition: "",
      year: "",
      body: "",
      color: ""
    }
    res.status(200).render("posts/new", {car: car});
  }

  // DELETE - DELETE /:id
  function deleteCars(req , res) {
    cars.splice(req.params.id, 1);
    for (var i = 0; i < cars.length; i++) {
      cars[i].id = i;
    }
    res.status(200).redirect("/");
  }

  // UPDATE - UPDATE /:id
  function updateCars(req , res) {
    var car = req.body;
    console.log(car)
    car.id = req.params.id;
    cars[car.id] = car;
    res.status(200).redirect("/");
    }

  // CREATE - POST /
  function createCars(req , res) {
    var car = req.body;
    car.id = cars.length;
    cars.push(car);
    res.status(200).redirect("/");
    }


  // export all our controller functions in an object
  module.exports = {

    index:indexCars,
    show: showCars,
    edit: editCars,
    new: newCars,
    delete: deleteCars,
    update: updateCars,
    create: createCars

  }
