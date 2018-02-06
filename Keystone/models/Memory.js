var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * Memory Model
 * ==================
 */

var Memory = new keystone.List('Memory', {
  label: 'Memory',
  track: {
    updatedAt: true,
    createdAt: true,
    createdBy: true,
    updatedBy: true
  }
})


Memory.add('Memory', {
	name: { type: String, label: '内存大小'}
});


Memory.track = true
Memory.register();
