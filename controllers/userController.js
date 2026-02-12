import db from "../config/firebase.js";


/* ===============================
   Submit User Data (Public)
================================ */
export const submitUser = async (req, res) => {

  try {

    const {
      instagram,
      email,
      whatsapp,
      amount,
      upi
    } = req.body;
    
    // Validation
    if (!instagram || !email || !whatsapp || !amount || !upi) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const data = {
      instagram,
      email,
      whatsapp,
      amount,
      upi,
      isVerified: false,
      createdAt: Date.now()
    };
    

    await db.ref("users").push(data);

    res.json({
      success: true,
      msg: "Data submitted"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};


/* ===============================
   Get All Users (Admin)
================================ */
export const getAllUsers = async (req, res) => {

  try {

    const snap = await db.ref("users").once("value");

    res.json(snap.val());

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};


/* ===============================
   Get One User (Admin)
================================ */
export const getUserById = async (req, res) => {

  try {

    const { id } = req.params;

    const snap = await db.ref(`users/${id}`).once("value");

    res.json(snap.val());

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};


/* ===============================
   Update Verify Status (Admin)
================================ */
export const updateVerify = async (req, res) => {

  try {

    const { id } = req.params;
    const { isVerified } = req.body;

    await db.ref(`users/${id}`).update({
      isVerified
    });

    res.json({
      success: true,
      msg: "Updated"
    });

  } catch {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "User ID required" });
    }

    await db.ref("users").child(id).remove();

    res.json({
      success: true,
      msg: "User deleted successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};
