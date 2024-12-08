
const AuthRepository = require("../../repositories/AuthRepository");
const TokenRepository = require("../../repositories/TokenRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");





class AuthController {

  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const file = req.file; 

      const user = await AuthRepository.register({
        name,
        email,
        password,
        role,
        file, // Pass file to the repository method
      });

      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).json({ error: "Registration failed: " + error.message });
    }
  }


  async login(req, res) {
    const { email, password } = req.body;

    try {

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

 
      const user = await AuthRepository.login(email);

      if (!user.password) {
        return res
          .status(401)
          .json({ message: "Invalid credentials: no password stored" });
      }


      // Validate the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid credentials password" });
      }

      // Generate a JWT token upon successful login
      const tokenString = jwt.sign(
        {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );

      // Save the token to the database for session management
      await TokenRepository.createToken({
        _userId: user._id,
        token: tokenString,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      res.status(200).json({
        message: `${user.role} Logged in successfully!`,
        token: tokenString,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  async dashboard(req, res) {
    const { userId } = req.user;
    try {
      const user = await AuthRepository.getUserDashboard(userId);
      res.status(200).json({
        message: `Welcome ${user.name}, we are glad to have you as a ${user.role}`,
        user: user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async logout(req, res) {
    const { userId } = req.user;
    const user = await AuthRepository.getUserDashboard(userId);
    try {
      // Delete token from TokenRepository
      await TokenRepository.deleteTokenByUserId(userId);

      res.status(200).json({ message: `${user.role} logged out successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
