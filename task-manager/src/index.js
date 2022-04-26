const app = require("./app");
const port = process.env.PORT;
const env = process.env.ENV;

app.listen(port, () => {
  console.log(`Server is listening on ${env}, port ${port}`);
});
