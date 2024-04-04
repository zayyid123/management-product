import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  // cari apakah user ada atau tidak
  if (!user) {
    return res.status(404).json({ msg: "User Tidak ditemukan" });
  }

  // pencocokan password
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) {
    return res.status(404).json({ msg: "Password salah" });
  }

  // jika sudah benar semua
  req.session.userId = user.uuid;
  const { uuid, name, email, role } = {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  res.status(200).json({ uuid, name, email, role });
};

export const LogOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ msg: "Tidak Dapat Logout" });
    } else {
      res.status(200).json({ msg: "Anda Berhasil Logout" });
    }
  });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon Login Kembali" });
  }

  const user = await Users.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  
  if (!user) {
    return res.status(404).json({ msg: "User Tidak ditemukan" });
  }

  res.status(200).json(user);
};
