const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

module.exports.userController = {
  registrationUser: async (req, res) => {
    try {
      const { name, login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (candidate) {
        return res
          .status(401)
          .json({ error: `Пользовтаель с логином ${login} уже существует!` });
      }

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({
        name,
        login: login,
        password: hash,
      });

      res.json(user);
    } catch (error) {
      return res.status(400).json({
        error: "Ошибка при регистрации: " + error.toString(),
      });
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await User.findOne({
      login,
    });

    if (!candidate) {
      return res.status(401).json({ error: "Неверный логин или пароль!" });
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json({ error: "Неверный логин или пароль!" });
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });
    res.json({ token });
  },
};
