import { Sequelize } from "sequelize";
import Users from "./models/UserModel.js";

const main = async () => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    console.log(response)
  } catch (error) {
    console.log(error)
  }
};

main()
