const express = require('express')
const {json} =require('express/lib/response');

const CategoryService=require('./../services/category.service');

const router=express.Router();
const service=new CategoryService();

/**
 * Listado de categorias
 */

router.get('/',(req,res)=>{
  const categories=service.find();
  res.json(categories);
})

/**
 * Obtener una categoria en especifico
 */
router.get('/:id',(req,res)=>{
  const {id}=req.params
  const category=service.findOne(id);
  res.json(category);
});

/**
 * Crear una categoria
 */
router.post('/',(req,res)=>{
  const body=req.body;
  const newCategory=service.create(body);
  res.status(201).json(newCategory);
});

/**
 * Actualiar una categoria
 */
router.patch('/:id',(req,res)=>{
  const {id}=req.params;
  const body=req.body;
  const category=service.update(id,body);
  res.json(category);
});

/**
 * Eliminar categoria
 */

router.delete('/:id',(req,res)=>{
  const { id }=req.params;
  const rta=service.delete(id);
  res.json(rta);

});

// router.get('/categories/:categoryId/products/:ProductId',(req,res)=>{
//     const {categoryId,ProductId}=req.params;
//     res.json({
//         categoryId,
//         ProductId
//     })
// });


module.exports=router;
