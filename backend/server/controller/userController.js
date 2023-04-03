var Userdb = require("../model/userModel");
var Soltdb = require("../model/slotModel");
var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  // console.log(req.body)

  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  var regPassword = req.body.password;

  var hash = bcrypt.hashSync(regPassword, 12);

  const user = new Userdb({
    name: req.body.name,

    email: req.body.email,
    password: hash,
    address: req.body.address,

    age: req.body.age,
    phone: req.body.phone,
    adhaar: req.body.adhaar,
    gender: req.body.gender,
    userType: req.body.userType,
    slot: req.body.slot,
  });

  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occured while creating a create user",
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can't be empty" });
  }
  const id = req.params.id;
  // console.log(id);

  var regPassword = req.body.password;

  var hash = bcrypt.hashSync(regPassword, 12);

  const user = {
    name: req.body.name,

    email: req.body.email,
    password: hash,
    address: req.body.address,

    age: req.body.age,
    phone: req.body.phone,
    adhaar: req.body.adhaar,
    gender: req.body.gender,
    userType: req.body.userType,
    slot: req.body.slot,
  };

  Userdb.findByIdAndUpdate(id, user, { useFindandModify: false })
    .then((data) => {
      // console.log(data);
      if (!data) {
        res.status(400).send({
          message: `Cannot Update user with ${id}, may be user not found !`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information " + err });
    });
};

exports.findUser = async (req, res) => {
  if (!req.query.id) {
    res.status(400).send({ message: "Id not Provided" });
    return;
  }

  await Userdb.findOne({ _id: req.query.id }).then((data) => {
    if (!data) {
      res.status(404).send({ message: `Not found User with id ${id} ` });
    } else {
      res.send(data);
    }
  });
};

exports.findSlot = (req, res) => {
  if (!req.query.id) {
    res.status(400).send({ message: "Id not Provided" });
    return;
  }
  console.log(req.query.id);
  Userdb.find({ _id: req.query.id })
    .populate({ path: "slot", model: Soltdb })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Not found Slot with id${id} ` });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "erroe retrieving Slot with id " + id });
    });
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await Userdb.findOne({ email: email });
    // console.log(userData);

    if (!userData) {
      res.status(200).send("Please enter valide email or Register Now");
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (isMatch) {
      // console.log(userData._id);

      // var authToken = jwt.sign({ id: userData._id }, process.env.PRIVATEKEY);

      res.status(200).json({ success: true, data: userData });
    } else {
      res.status(200).send("Invalide Password Details !");
    }
  } catch (err) {
    res.status(400).send("Please Register First!");
  }
};
