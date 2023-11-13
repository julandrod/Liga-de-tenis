// Route loader, takes all the files in the Routes folder and loads them into the router

const fs = require("fs");
const router = require("express").Router();

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ["index", "docs"].includes(fileWithOutExt);
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${file}`));
    console.log(`Loading route ${fileWithOutExt} ...`);
  }
});

module.exports = router;