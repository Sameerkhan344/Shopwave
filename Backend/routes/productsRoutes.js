import express from 'express';
import { isAdmin, isAuthorized } from '../middlewares/authMiddleware.js';
import { addProductController, deleteProductController, getAllProductController, getSingleProductController, updateProductController } from '../controllers/productsControllers.js';
import { upload } from '../middlewares/multerMiddleware.js';

const productsRouter = express.Router();

http://localhost:8080/api/v1/products/ - GET  
productsRouter.get("/",getAllProductController)

http://localhost:8080/api/v1/products/ - POST  
productsRouter.post("/", upload.single("picture"), isAuthorized, isAdmin, addProductController)

http://localhost:8080/api/v1/products/:productId - GET  
productsRouter.get("/:productId", isAuthorized, isAdmin, getSingleProductController)

http://localhost:8080/api/v1/products/:productId - DELETE  
productsRouter.delete("/:productId", isAuthorized, isAdmin, deleteProductController)
http://localhost:8080/api/v1/products/:productId - PUT  
productsRouter.put("/:productId", upload.single("picture"), isAuthorized, isAdmin, updateProductController)

export default productsRouter;