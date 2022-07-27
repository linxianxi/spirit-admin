import express from "express";
import { users } from "./users.js";

const app = express();
const port = 3000;

const router = express.Router();

router.post("/login", (req, res) => {
  setTimeout(() => {
    const username = req.body.username;
    const password = req.body.password;
    const user = users.find((user) => user.username === username);
    if (user && password === user.password) {
      res.status(200).json({
        code: 0,
        token: user.username === "admin" ? "admin-token" : "employee-token",
      });
    } else {
      res.status(200).json({ code: -1, message: "用户名或密码错误" });
    }
  }, 2000);
});

router.get("/me", (req, res) => {
  setTimeout(() => {
    const token = req.headers.authorization;
    if (!["admin-token", "employee-token"].includes(token)) {
      res.status(401).json({ code: -1, message: "请登录" });
    } else {
      const auth = token === "admin-token" ? ["application", "setting"] : [];
      const username = token === "admin-token" ? "admin" : "employee";
      res.status(200).json({ code: 0, data: { auth, username } });
    }
  }, 2000);
});

app.use(express.json());
app.use("/api", router);
// 禁用 304 缓存
app.disable("etag");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
