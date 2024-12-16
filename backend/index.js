const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const SECRET_KEY = "your_secret_key";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      file.originalname.split(".").pop().toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"));
  },
});

// User signup
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ token, user });
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Signup failed: " + error.message });
    }
  }
});

// User login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);
    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed: " + error.message });
  }
});

// Get properties
app.get("/properties", async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      include: { owner: true },
    });
    res.json(properties);
  } catch (error) {
    console.error("Get properties error:", error);
    res
      .status(500)
      .json({ error: "Failed to get properties: " + error.message });
  }
});

// Get a single property
app.get("/properties/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await prisma.property.findUnique({
      where: { id: parseInt(id) },
      include: { owner: true },
    });
    res.json(property);
  } catch (error) {
    console.error("Get property error:", error);
    res.status(500).json({ error: "Failed to get property: " + error.message });
  }
});

// Create property
app.post("/properties", upload.single("picture"), async (req, res) => {
  const { title, description, price, location, ownerId, type } = req.body; // Add type
  const picture = req.file ? req.file.filename : null;
  console.log("Creating property with data:", {
    title,
    description,
    price,
    location,
    picture,
    ownerId,
    type, // Add type
  });
  try {
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        location,
        picture,
        ownerId: parseInt(ownerId),
        type, // Add type
      },
    });
    res.json(property);
  } catch (error) {
    console.error("Create property error:", error);
    console.error("Error details:", error.message);
    res
      .status(500)
      .json({ error: "Failed to create property: " + error.message });
  }
});

// Update property
app.put("/properties/:id", upload.single("picture"), async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, type } = req.body; // Add type
  const updatedData = {
    title,
    description,
    price: parseFloat(price),
    location,
    type, // Add type
  };

  if (req.file) {
    updatedData.picture = req.file.filename;
  }

  // Ensure all fields are defined
  if (
    !title ||
    !description ||
    !location ||
    isNaN(updatedData.price) ||
    !type
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required and price must be a number" });
  }

  try {
    const property = await prisma.property.update({
      where: { id: parseInt(id) },
      data: updatedData,
    });
    res.json(property);
  } catch (error) {
    console.error("Update property error:", error);
    res
      .status(500)
      .json({ error: "Failed to update property: " + error.message });
  }
});

// Delete property
app.delete("/properties/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.property.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Property deleted" });
  } catch (error) {
    console.error("Delete property error:", error);
    res
      .status(500)
      .json({ error: "Failed to delete property: " + error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
