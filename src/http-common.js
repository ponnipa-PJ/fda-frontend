import axios from "axios";
import LinkService from "./services/LinkService";

export default axios.create({
  // baseURL: "http://localhost:8081/api",
// 
  baseURL: LinkService.getpythonlink() + "/api",

  headers: {
    "Content-type": "application/json",
  }
});