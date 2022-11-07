

class CustomAPIError extends Error {
    constructor(message) {
      super(message);
    }
  }
  //exporting the module CustomAPIError
  module.exports = {CustomAPIError};