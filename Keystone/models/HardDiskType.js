var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * HardDiskType Model
 * ==================
 */

var HardDiskType = new keystone.List('HardDiskType', {
  label: 'HardDiskType',
  track: {
    updatedAt: true,
    createdAt: true,
    createdBy: true,
    updatedBy: true
  }
})


HardDiskType.add('HardDiskType', {
  name: { type: String, label: '磁盘类型名'}
});


HardDiskType.track = true
HardDiskType.register();
