var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	name:{ type: String, label: '客户名称'},
	telephone:{type: String, label: '客户电话'},
	orderItem: { type: Types.Relationship, ref: 'OrderItem', many: true, label: '对应订单'}
});


Customer.track = true
Customer.register();
