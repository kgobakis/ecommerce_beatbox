import e from "express";
import jwt, { decode } from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somerandomsecret",
    {
      expiresIn: "30d",
    }
  );
};

/* Middleware to authenticate user*/

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer: Token...(first 7 chars are the Bearer)
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somerandomsecret",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: "There is not Token" });
  }
};
