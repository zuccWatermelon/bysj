var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * OrderItem Model
 * ==================
 */

var OrderItem = new keystone.List('OrderItem', {
  label: 'OrderItem',
  track: {
    updatedAt: true,
    createdAt: true,  
    createdBy: true,
    updatedBy: true
  }
})


OrderItem.add('OrderItem', {
  period:{ type: String,label:'订购时长'},
  Cpu: { type: Types.Relationship, ref: 'Cpu', label: 'CPU数量'},
  memory: { type: Types.Relationship, ref: 'Memory', label: '内存大小'},
  operateSystemType: { type: Types.Relationship, ref: 'OperateSystemType', label: '系统类型'},
  operateSystem: { type: Types.Relationship, ref: 'OperateSystem', label: '系统'},
  systemHardDiskType:{ type: Types.Relationship, ref: 'HardDiskType', label: '系统盘类型'},
  dataHardDiskType:{ type: Types.Relationship, ref: 'HardDiskType', label: '数据盘类型'},
  dataHardDiskSize:{ type: String, label: '数据盘大小'},
  bandWidth:{ type: String, label: '带宽大小'},
  status: { type: String, label: '订单项状态'},
  userID: { type: Types.Relationship, ref: 'Customer', label: '用户'}
});


OrderItem.track = true
OrderItem.register();
