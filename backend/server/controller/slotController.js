const Slotdb = require("../model/slotModel");
var Soltdb = require("../model/slotModel");
var Userdb = require("../model/userModel");

exports.createNewSlot = (req, res) => {
  Slotdb.find({ user: req.body.user })
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        console.log("data not avelivle");

        Slotdb.find({ date: req.body.date }).then((data) => {
          // res.send(data);
          if (data.length === 0 || data.length < 5) {
            // res.send("Aveliavle slot book");

            const slot = new Soltdb({
              date: req.body.date,
              status: req.body.status,
              user: req.body.user,
            });

            console.log(slot);
            slot
              .save(slot)
              .then((data) => {
                // console.log(data.user);

                res.send({ message: "Slot Booked  Successfully", data: data });

                const slot = {
                  slot: data._id,
                };

                Userdb.findByIdAndUpdate(data.user, slot, {
                  useFindandModify: false,
                })
                  .then((data) => {
                    if (!data) {
                      res.status(400).send({
                        message: `Cannot Update user with ${id}, may be user not found !`,
                      });
                    } else {
                      res.send(data);
                    }
                  })
                  .catch((err) => {
                    res.send({ message: "User Not Updated", Error: err });
                  });

                res.send(data);
              })
              .catch((err) => {
                res.status(500).send({
                  message:
                    err.message || "error occured while creating a Book Slot",
                });
              });
          } else {
            res.send({ message: "Slot Not Available" });
          }
        });
      } else {
        // console.log("Else Part");
        res.send({ message: "User Aleardy Booked a Slot", data: data });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Find User " + err });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can't be empty" });
  }
  const id = req.params.id;
  // console.log(id);

  Soltdb.findByIdAndUpdate(id, req.body, { useFindandModify: false })
    .then((data) => {
      // console.log(data);
      if (!data) {
        res.status(400).send({
          message: `Cannot Update user with ${id}, may be slot not available !`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update Slot information " + err });
    });
};

exports.allslot = (req, res) => {
  // console.log(req);

  if (req.query.date) {
    // const id = req.query.date;
    console.log(req.query.date);
    Soltdb.find({ date: req.query.date })
      .populate("user")
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Not found Slot with id${id} ` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "erroe retrieving Slot with id " + id });
      });
  } else {
    Soltdb.find()
      .populate("user")
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving Slot information",
        });
      });
  }
};
