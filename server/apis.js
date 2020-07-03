const axios = require("axios");

const getOrder = async (id) => {
  const res = await axios.default.get(
    `https://www.dhl.com/shipmentTracking?AWB=${id}&countryCode=g0&languageCode=en&_=1593746938733`
  );
  if (res.status >= 200 && res.status < 300) {
    return res.data;
  }
};

module.exports = {
  getOrder,
};
