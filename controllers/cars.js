var Car = require('../models/car');

function indexCars(req , res) {
  Car.find({}, function(err, cars) {

    if (err) return res.status(500).send(err.message);
    res.status(200).render("cars/index", {
      title: "Cars!",
      cars: cars
    });
  })
}

function showCars(req , res) {
  Car.findById(req.params.id, function(err, car) {
    if(!car) return res.status(404).send("Not found!");
    if(err) return res.status(500).send(err.message);
    res.status(200).render("cars/show" , {
    title: "Car",
    car: car
    });
  })
}

// EDIT - GET /:id/edit
function editCars(req , res) {
  Car.findById(req.params.id, function(err, car) {
    if (!car) return res.status(404).send("Not found");
    if (err) return res.status(500).send(err.message);
    res.render("cars/edit", {
      title: "Car",
      car: car
    });
  })
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
  res.status(200).render("cars/new", {car: car});
}

// DELETE - DELETE /:id
function deleteCars(req , res) {
  Car.findByIdAndRemove(req.params.id, function(err, car) {
    if(err) return res.status(500).send(err.message);
    res.redirect("/");
  });
}

// UPDATE - UPDATE /:id
function updateCars(req , res) {
  Car.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, car) {
    if (err) return handleError(err);
    res.redirect("/");
  });
}

// CREATE - POST /
function createCars(req , res) {
  var car = new Car(req.body);
  car.save(function(err, post) {
    if (err) return res.status(500).send(err.message);
    res.redirect("/");
  })  
}

// export all controller functions in an object
module.exports = {
  index:indexCars,
  show: showCars,
  edit: editCars,
  new: newCars,
  delete: deleteCars,
  update: updateCars,
  create: createCars
}