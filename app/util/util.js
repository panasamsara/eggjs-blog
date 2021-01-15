'use strict';
module.exports = {
  ERROR: {
    code: 0,
    msg: 'failed',
  },
  SUCCESS: {
    code: 1,
    msg: 'success',
  },
  unique(arr) {
    return arr.filter(function(item, index, arr) {
      return arr.indexOf(item) === index;
    });
  },
};
