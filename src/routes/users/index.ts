import express from "express";
import users_routes from "../../handlers/UsersHandler";

const usersAPI = express.Router();

users_routes(usersAPI);

export default usersAPI;
