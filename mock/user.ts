// test.ts

import { MockMethod } from "vite-plugin-mock";
const users = [
  { username: "admin", password: "admin" },
  { username: "employee", password: "employee" },
];

const wait = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
};

export default [
  {
    url: "/api/login",
    method: "post",
    response: ({ body }) => {
      const username = body.username;
      const password = body.password;
      const user = users.find((user) => user.username === username);
      if (user && password === user.password) {
        return {
          code: 0,
          token: user.username === "admin" ? "admin-token" : "employee-token",
        };
      } else {
        return { code: -1, message: "用户名或密码错误" };
      }
    },
  },
  {
    url: "/api/me",
    method: "get",
    rawResponse: async (req, res) => {
      await wait(1000);
      const token = req.headers.authorization || "";
      if (!["admin-token", "employee-token"].includes(token)) {
        res.statusCode = 401;
        res.end(JSON.stringify({ code: -1, message: "请登录" }));
      } else {
        const auth = token === "admin-token" ? ["application", "setting"] : [];
        const username = token === "admin-token" ? "admin" : "employee";
        res.statusCode = 200;
        res.end(JSON.stringify({ code: 0, data: { auth, username } }));
      }
    },
  },
] as MockMethod[];
