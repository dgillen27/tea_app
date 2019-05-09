const { Router } = require("express");
const { User } = require("../models");
const {
  hashPassword,
  comparePassword,
  genToken,
  restrict
} = require("../auth");

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  const userData = await User.findAll();
  const user = userData.map(user => user.dataValues);
  res.json({ user: user });
});

//////////////////////////////////////////////////////

usersRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await User.findByPk(id);
  res.json({ user: user.dataValues });
});

//////////////////////////////////////////////////////

usersRouter.post("/", async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const pw_digest = await hashPassword(password);

    const user = await User.create({
      email,
      username,
      password_digest: pw_digest
    });

    const { password_digest, ...userData } = user.dataValues;

    const token = genToken(userData);

    console.log("token POST usersRouter: ", token);
    res.json({
      token,
      userData
    });
  } catch (err) {
    next(err);
  }
});

//////////////////////////////////////////////////////

usersRouter.get("/verify/:id", async (req, res) => {
  console.log("VERIFY res: ", res);
  try {
    // console.log("this is res locals user", res.locals.user);
    return res.json({ user: res.locals.user });
    // return res.json("user: res.locals.user");
  } catch (e) {
    res.status(401).send("Invalid Credentials");
  }
});

//////////////////////////////////////////////////////

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const digest = await hashPassword(password);

    const user = await User.findOne({
      where: {
        email
      }
    });

    const isPassValid = await comparePassword(password, user.password_digest);
    if (isPassValid) {
      const { password_digest, ...userData } = user.dataValues;
      const token = genToken(userData);

      res.json({
        token,
        userData
      });
    }
  } catch (e) {
    res.status(401).send("Invalid Credentials");
  }
});

module.exports = usersRouter;
