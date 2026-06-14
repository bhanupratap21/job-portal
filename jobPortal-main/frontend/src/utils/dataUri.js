import DatauriParser from "datauri/parser.js";
import path from "path";

const parser = new DatauriParser();

export const getDataUri = (file) =>
  parser.format(path.extname(file.originalname), file.buffer);
