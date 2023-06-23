import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/api",
// 
  // baseURL: "https://api-excise.ponnipa.in.th/api",
  // baseURL: "https://api-excise.siwapreeya.in.th/api",

  headers: {
    "Content-type": "application/json",
  }
});