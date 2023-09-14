const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); 

// Place Order
router.post('/order-service', async (req, res) => {
  try {
    // Validate the request data 
    const { symbol, quantity } = req.body;
    if (!symbol || !quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({
        success: false,
        err_msg: 'Invalid request data. Please provide a valid symbol and quantity.',
      });
    }

    // Create a new order in the database
    const order = await Order.create({
      symbol,
      quantity,
      
    });

   
    res.status(201).json({
      success: true,
      payload: {
        identifier: order.identifier,
        symbol: order.symbol,
        quantity: order.quantity,
        filled_quantity: order.filled_quantity,
        order_status: order.order_status,
      },
    });
  } catch (error) {
    
    console.error('Error:', error);
    res.status(500).json({ success: false, err_msg: 'Internal server error.' });
  }
});

// Modify Order
router.put('/order-service', async (req, res) => {
  try {
    const { identifier, new_quantity } = req.body;

    // Check if the order with the given identifier exists
    const order = await Order.findOne({ where: { identifier } });

    if (!order) {
      return res.status(404).json({ success: false, err_msg: 'Order not found' });
    }

    if (order.order_status !== 'open') {
      return res.status(400).json({ success: false, err_msg: 'Cannot modify a non-open order' });
    }

    order.quantity = new_quantity;
    await order.save();

    res.json({
      success: true,
      payload: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, err_msg: 'Error occurred' });
  }
});

// Cancel Order
router.delete('/order-service', async (req, res) => {
  try {
    const { identifier } = req.body;

    // Check if the order with the given identifier exists
    const order = await Order.findOne({ where: { identifier } });

    if (!order) {
      return res.status(404).json({ success: false, err_msg: 'Order not found' });
    }

    if (order.order_status !== 'open') {
      return res.status(400).json({ success: false, err_msg: 'Cannot cancel a non-open order' });
    }

    
    order.order_status = 'cancel';
    await order.save();

    res.json({
      success: true,
      payload: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, err_msg: 'Some error occurred' });
  }
});

// Order Status
router.post('/order-service/status', async (req, res) => {
  try {
    const { identifier } = req.body;

    // Check if the order with the given identifier exists
    const order = await Order.findOne({ where: { identifier } });

    if (!order) {
      return res.status(404).json({ success: false, err_msg: 'Order not found' });
    }

   
    res.json({
      success: true,
      payload: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, err_msg: 'Some error occurred' });
  }
});

module.exports = router;


