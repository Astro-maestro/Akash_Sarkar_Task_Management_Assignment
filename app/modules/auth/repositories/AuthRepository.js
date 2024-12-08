
const User = require("../models/User");
const bcrypt = require("bcryptjs");

class AuthRepository {
  async register({ name, email, password, role, file }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const image = file
        ? `/uploads/${file.filename}`
        : "https://www.jotform.com/blog/wp-content/uploads/2022/12/how-to-add-link-to-google-form-1280x500.jpg";
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        image, // Save image URL
      });
      return await newUser.save();
    } catch (error) {
      throw new Error("Registration failed: " + error.message);
    }
  }

  async login(email) {
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      return user;
    } catch (error) {
      throw new Error("Login failed: " + error.message);
    }
  }

  async getUserDashboard(userId) {
    try {
      const user = await User.findById(userId, "name email role image");
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Error fetching user data: " + error.message);
    }
  }

  async logout(userId) {
    try {
      return { message: "User logged out successfully", userId };
    } catch (error) {
      throw new Error("Logout failed: " + error.message);
    }
  }
}

module.exports = new AuthRepository();
