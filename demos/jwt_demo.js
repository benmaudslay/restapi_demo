const jwt = require("jsonwebtoken");

const myFunction = () => {
  const token = jwt.sign({ _id: 1234 }, "my secret", { expiresIn: "1 week" });

  console.log(token);
  let randomToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEyMzQsImlhdCI6MTYxNzc5MzE4NSwiZXhwIjoxNjE4Mzk3OTg1fQ.Mx6zzladc0RHzuJKwbAEBXI9OYNkWBzsbxsKdh4";

  const data = jwt.verify(token, "my secret");
  console.log(data);
};

myFunction();
