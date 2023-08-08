const AdminModel = require("../model/AdminModel");
//to hash password
const bcrypt = require("bcrypt");
//to generate secret token
const jwt = require("jsonwebtoken");

const RespStructure = () => {
  const resp = {};
  resp.status_code = "";
  resp.message = "";
  resp.data = "";
  return resp;
};

const hashPassword = async (password) => {
  const hashedpassword = await bcrypt.hash(password, 10);

  return hashedpassword;
};

const CheckPassword = async (enterpass, dbpass) => {
  const unhash = await bcrypt.compare(enterpass, dbpass);
  return unhash ? true : false;
};
const register = async (req, res) => {
  try {
    const findUserawait = await AdminModel.findOne({ email: req.body.email });

    if (findUserawait) {
      const respt = RespStructure();
      respt.status_code = 200;
      respt.message = "user already exists with the given emailw";
      respt.data = findUserawait;
      res.json(respt);

      return;
    }
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const regadmin = new AdminModel(req.body);
    const data = await regadmin.save();
    const respt = RespStructure();
    respt.status_code = 200;
    respt.message = "user registered successfully";
    respt.data = data;
    res.json(respt);
  } catch (err) {
    const respt = RespStructure();
    respt.status_code = 500;
    respt.message = "Something went bad at the server" + err;
    respt.data = null;
    res.json(respt);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email: email });

    if (admin) {
      const isPasswordCorrect = await CheckPassword(password, admin.password);

      const tokenPayload = {
        userid: admin._id,
        email: admin.email,
        phone: admin.phone,
        name: admin.name,
      };

      if (isPasswordCorrect) {
        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY);
        const respt = RespStructure();
        respt.message = "login successful";
        respt.data = { token };
        respt.status_code = 200;
        res.json(respt);
      } else {
        const respt = RespStructure();
        respt.message = "login failed incorrect details";
        respt.status_code = 200;
        respt.data = null;
        res.json(respt);
      }
    } else {
      const respt = RespStructure();
      respt.message = "email not found on our db";
      respt.data = null;
      respt.status_code = 200;
      res.json(respt);
    }
  } catch (err) {
    const respt = RespStructure();
    respt.message = "something went bad at server" + err;
    respt.data = null;
    respt.status_code = 500;
    res.json(respt);
  }
};

const AdminDashboard = (req, res) => {
  const head = req.header("auth-token");
  const token = head.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const respt = RespStructure();
    respt.message = "user details found";
    respt.data = user;
    respt.status_code = 200;
    res.json(respt);
  } catch (err) {
    const respt = RespStructure();
    respt.message = "auht-token nvalid ";
    respt.data = null;
    respt.status_code = 200;
    res.json(respt);
  }
};

module.exports = {
  register,
  Login,
  AdminDashboard,
};
