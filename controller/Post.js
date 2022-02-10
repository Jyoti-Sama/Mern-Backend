import postMessage from "../models/postMessage.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const TOKEN_KEY = "sdhidhfdv";

export const getPost = async (req, res) => {
  try {
    const message = await postMessage.find();
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const registerLogic = async (req, res) => {
  try {
    //get the user input
    const { first_name, last_name, email, password } = req.body;

    console.log(first_name, last_name, email, password); //terminate later

    //validation user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    //check if user already exist or not
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User already exist. Please login");
    }

    //encrypt user password
    const encryptPassword = await bcrypt.hash(password, 10);

    //create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptPassword,
    });

    //token
    const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
      expiresIn: "2h",
    });

    //save user token
    user.token = token;

    //user
    return res.status(201).json({token});
  } catch (error) {
    console.log(error.message);
    res.send("<h1>404</h1>");
  }
};

export const loginLogic = async (req, res) => {
  try {
    //get user data
    const { email, password } = req.body;
    //validation
    if (!(email && password))
      return res.status(400).send("All input is required");

    console.log(email, password); //terminate later

    //validation if user exist in your database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("User not found, try registering");

    if (await bcrypt.compare(password, user.password)) {
      //create token
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "2h",
      });

      //save user token
      user.token = token; //TODO: remove this implementation later

      //user
      return res.status(200).json({ token });
    }

    return res.status(400).send("Invalid Credentials");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
};
