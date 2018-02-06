var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * OperateSystemType Model
 * ==================
 */

var OperateSystemType = new keystone.List('OperateSystemType', {
  label: 'OperateSystemType',
  track: {
    updatedAt: true,
    createdAt: true,
    createdBy: true,
    updatedBy: true
  }
})


OperateSystemType.add('OperateSystemType', {
  name: { type: String, label: '系统类型名称'},
  system: { type: Types.Relationship, ref: 'OperateSystem', label: '包含系统', many:true}
});


OperateSystemType.track = true
OperateSystemType.register();
