import jwt from "jsonwebtoken";
export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    // secure: false,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 1000 * 60 * 60 * 24 * 1, //1 day
    sameSite: "strict", //prevent csrf attack
    // sameSite: "none",
  });
};

export const verifyCookies = (req, res, next) => {
  const token = req.cookies.token;

  // If token not found
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token not found" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info in req.user (useful for next middleware)
    req.user = decoded;

    next(); // pass control to next route
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

