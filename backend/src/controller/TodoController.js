const ToDoModel = require("../models/TodoModel");

module.exports.getToDos = async (req, res) => {
  const toDos = await ToDoModel.find();
  res.send(toDos);
};

module.exports.saveToDo = (req, res) => {
  const { toDo } = req.body;

  ToDoModel.create({ toDo })
    .then((data) => {
      console.log("Saved Successfully...");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong!" });
    });
};
module.exports.updateToDo = (req, res) => {
  const { toDo } = req.body;
  const { id } = req.params;
  ToDoModel.findByIdAndUpdate(id, {toDo}).then((data) => {
    res.status(201).send("Updated Successfully")
  }).catch((err) => {
    console.log(err);
    res.send({ error: err, msg: "Something went wrong!" });
  });

};
module.exports.deleteToDo = (req, res) => {
  const { id } = req.params;
  ToDoModel.findByIdAndDelete(id).then((data) => {
    res.status(201).send("Deleted Successfully")
  }) .catch((err) => {
    console.log(err);
    res.send({ error: err, msg: "Something went wrong!" });
  });

};
