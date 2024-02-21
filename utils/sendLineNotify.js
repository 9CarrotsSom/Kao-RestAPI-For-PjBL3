const axios = require("axios");

module.exports = {
    sendLineNotify: async(message, token) =>{
      try {
          const response = await axios.post('https://notify-api.line.me/api/notify', {
            message: message
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            }
          });
          return response.data;
      } catch (error) {
        console.error('Error sending Line Notify:', error.response.data);
      }
    }
}