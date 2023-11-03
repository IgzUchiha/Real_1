const express = require("express");
const router = express.Router();
const { Item } = require("../models");


//Get
router.get("/", async (req, res, next) => {
    try {
      const products = await Item.findAll();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });
  // Get Item by Id 
  router.get('/:id', async (req, res, next) => {
    try {
      const product = await Item.findByPk(req.params.id);
      res.send(product);
    } catch (error) {
      next(error);
    }
  });
  // Put Request to update an Item by its Id 
  // The req body is expected to conatain the new data for the item.
  // After updating, it retrieves the Updated item from the Database/db and sends it back in response
  router.put("/:id", async (req,res, next) => {
    await Item.update(
      req.body,
      {where: {id: req.params.id}}
      );
      const products1 = await Item.findByPk(req.params.id);
      res.json(products1)  
  });
  // Post Request to create a new item
  router.post("/" , async (req, res) => {
    const products1 = await Item.create(req.body);
    res.json(products1);
  })
  // Delete Request to delete a item.
  router.delete("/:id", async (req,res) => {
    let products1 = await Item.findByPk(req.params.id);
    await products1.destroy()
    res.json(products1)
  })
  
  module.exports = router;
  