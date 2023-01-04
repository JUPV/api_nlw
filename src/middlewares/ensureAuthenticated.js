const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

async function ensureAuthenticated(request, response, next) {
  console.log("teste 22223")
  const authHeader = request.headers.authorization;
  console.log("teste 2222")
  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }


  const [, token] = authHeader.split(" ");

  try {

    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new AppError("token.invalid", 401);
  }
}

module.exports = ensureAuthenticated;