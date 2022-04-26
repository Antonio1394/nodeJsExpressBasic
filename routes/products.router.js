const express = require('express');
const { json } = require('express/lib/response');

const ProductService =require('./../services/product.service');
const validatorHandler =require('./../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} =require('./../schemas/product.schema');


const router=express.Router();
const service=new ProductService();


/*//**
Ruta para obtener el listado de productos
 */
router.get('/', async(req, res) => {
  const products=await service.find();
  res.json(products);
});

/*//**
Ruta para obtener 1 producto, en base a parametro
 */
router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
  try {
    const {id}=req.params
    const product= await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/*//**
Ruta para obtener guardar 1 producto
 */
router.post('/',
  validatorHandler(createProductSchema,'body'),
  async(req,res)=>{
    const body=req.body;
    const newProduct=await service.create(body);
    res.status(201).json(newProduct)
});

/*//**
Ruta para actualizar 1 producto
 */
router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res,next)=>{
  try {
    const { id }=req.params;
    const body=req.body;
    const product=await service.update(id,body)
    res.json(product);
  } catch (error) {
    next(err);
  }
});

/*//**
Ruta para eliminar 1 producto
 */
router.delete('/:id',
validatorHandler(getProductSchema, 'params'),
  async (req,res)=>{
  const { id }=req.params;
  const rta=await service.delete(id);
  res.json(rta);
});


module.exports=router;
