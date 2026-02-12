import db from "../config/firebase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const adminLogin = async (req, res) => {
  
  const { email, password } = req.body;

  try {

    // Read admins from Firebase
    const snap = await db.ref("admins").once("value");

    const admins = snap.val();

    if (!admins) {
      return res.status(400).json({ msg: "No admins found" });
    }

    let admin = null;

    // Find by email
    for (let key in admins) {

      if (admins[key].email === email) {
        admin = admins[key];
        break;
      }

    }

    if (!admin) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    // Compare password
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    // Create Token
    const token = jwt.sign(
      { email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};


export const newAdmin = async (req, res) => {

  try {

    const {name, email, password } = req.body;

    // Validation
    if ( !name || !email || !password) {
      return res.status(400).json({ msg: "Email and password required" });
    }

    // Check if admin already exists
    const snap = await db.ref("admins").once("value");

    const admins = snap.val();

    if (admins) {
      for (let key in admins) {
        if (admins[key].email === email) {
          return res.status(400).json({ msg: "Admin already exists" });
        }
      }
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Save to Firebase
    await db.ref("admins").push({
      name,
      email,
      password: hash,
      createdAt: Date.now()
    });

    res.json({ success: true, msg: "Admin created" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
