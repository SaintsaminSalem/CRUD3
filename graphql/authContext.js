import jwt from "jsonwebtoken";

export const buildContext = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return { user: null };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { user: decoded }; // { id, role }
  } catch (err) {
    return { user: null };
  }
};

// Small guards resolvers can call — throwing here becomes a proper GraphQL error response
export const requireAuth = (context) => {
  if (!context.user) {
    throw new Error("Unauthorized: please log in");
  }
  return context.user;
};

export const requireAdmin = (context) => {
  const user = requireAuth(context);
  if (user.role !== "admin") {
    throw new Error("Forbidden: admin access required");
  }
  return user;
};