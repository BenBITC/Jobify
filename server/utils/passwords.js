import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Compare submitted password to the password in the database (used on login)
export const comparePassword = async (candidatePassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(candidatePassword, hashedPassword);
  return isMatch;
};
