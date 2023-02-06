const app = require("./server/app.server");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;
console.log(process.env);
app.listen(PORT, () => console.log(`. - . Server running . - .`));
