import { Router } from "express"
import info from "../middlewares/logger.js"
import {getProductosRandoms} from "../controller/rest/productos-testController.js"

const rutaProductosTest = Router();

rutaProductosTest.get("/", info, getProductosRandoms)

export default rutaProductosTest;