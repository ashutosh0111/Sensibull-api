const axios = require('axios');

const BASE_URL = 'https://prototype.sbulltech.com/api';
const AUTH_TOKEN = 'Ashutosh1234'; 

async function makeRequest(method, url, data = {}) {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'X-AUTH-TOKEN': AUTH_TOKEN,
      },
      data,
    });

    return response.data;
  } catch (error) {
    console.error(`Error calling Sensibull API: ${error.message}`);
    throw error;
  }
}

// Place an order
async function placeOrder(symbol, quantity) {
  const data = {
    symbol,
    quantity,
    order_tag: generateOrderTag(), 
  };

  return makeRequest('POST', '/order/place', data);
}

// Modify an order by orderId
async function modifyOrder(orderId, newQuantity) {
  const data = {
    quantity: newQuantity,
  };

  const url = `/order/${orderId}`;

  return makeRequest('PUT', url, data);
}

// Cancel an order by orderId
async function cancelOrder(orderId) {
  const url = `/order/${orderId}`;

  return makeRequest('DELETE', url);
}

// Get order status for a list of orderIds
async function getOrderStatus(orderIds) {
  const data = {
    order_ids: orderIds,
  };

  return makeRequest('POST', '/order/status-for-ids', data);
}

// Generate a random order tag (example function, replace as needed)
function generateOrderTag() {
  return Math.random().toString(36).substring(2, 10);
}

module.exports = {
  placeOrder,
  modifyOrder,
  cancelOrder,
  getOrderStatus,
};


