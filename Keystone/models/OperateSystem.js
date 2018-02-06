var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * OperateSystem Model
 * ==================
 */

var OperateSystem = new keystone.List('OperateSystem', {
  label: 'OperateSystem',
  track: {
    updatedAt: true,
    createdAt: true,
    createdBy: true,
    updatedBy: true
  }
})


OperateSystem.add('OperateSystem', {
  name: { type: String, label: '系统名称'}
});


OperateSystem.track = true
OperateSystem.register();
