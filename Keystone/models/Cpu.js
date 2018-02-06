var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Cpu Model
 * ==================
 */

var Cpu = new keystone.List('Cpu', {
  label: 'CPU',
  track: {
    updatedAt: true,
    createdAt: true,
    createdBy: true,
    updatedBy: true
  }
})


Cpu.add('Cpu', {
	name:{ type: String, label: 'CPU 数量'},
	memory: { type: Types.Relationship, ref: 'Memory', many: true, label: '对应内存选项'}
});


Cpu.track = true
Cpu.register();
