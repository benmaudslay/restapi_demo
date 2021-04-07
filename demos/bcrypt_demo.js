const bcrypt = require("bcrypt");

const myFunction = async () => {
  let password = "mySuperSecureString";
  let hashedPassword = await bcrypt.hash(password, 12);
  console.log(hashedPassword);
  let matchedPassword = await bcrypt.compare(
    "mySuperSecureString",
    hashedPassword
  );
  console.log(matchedPassword);
};

myFunction();
