import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";

export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            attributes: ["name", "email"],
            model: Users,
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            attributes: ["name", "email"],
            model: Users,
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) {
      return res
        .status(404)
        .json({ msg: "maaf product anda tidak dapat ditemukan" });
    }

    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          uuid: req.params.id,
        },
        include: [
          {
            attributes: ["name", "email"],
            model: Users,
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            attributes: ["name", "email"],
            model: Users,
          },
        ],
      });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Products.create({
      name,
      price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "product created successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = (reqq, res) => {};

export const deleteProduct = (reqq, res) => {};
