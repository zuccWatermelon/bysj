var keystone = require('keystone');

/**
 * Customer Model
 * ==================
 */

var Customer = new keystone.List('Customer', {
  label: 'Customer',
  track: {
    updatedAt: true,
    createdAt: true,
    createdBy: true,
    updatedBy: true
  }
})


Customer.add('Customer', {
	CUST_ID: { type: String, label: '客户标识', required: true, initial: true, index: true},
	CUST_NAME:{ type: String, label: '客户名称'},
	CUST_TELEPHONE:{type: String, label: '客户电话'},
});


Customer.track = true
Customer.register();
