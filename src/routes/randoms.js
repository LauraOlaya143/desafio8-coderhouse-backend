import { Router } from "express"
import info from "../middlewares/logger.js"
import {getRandoms} from "../controller/rest/randomsController.js"

const rutaRandom = Router();

rutaRandom.get('/:cant', info, getRandoms);

export default rutaRandom;