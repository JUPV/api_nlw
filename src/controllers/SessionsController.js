const knex = require("../database");
const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const GenerateRefreshToken = require("../providers/GenerateRefreshToken");
const GenerateToken = require("../providers/GenerateToken");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;
    console.log("aqui")
    const user = await knex("users").where({ email: email.toLowerCase() }).first();
    console.log("passsouuuuuuuu")
    if (!user) {
      throw new AppError("E-mail e/ou senha incorreta.", 404);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 404);
    }

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(user.id);

    await knex("users_tokens").where({ user_id: user.id }).delete();

    const generateRefreshToken = new GenerateRefreshToken();
    generateRefreshToken.execute(user.id, token);

    delete user.password;

    response.status(201).json({ token, user });
  }
}

module.exports = SessionsController;