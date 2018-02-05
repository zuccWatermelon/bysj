var keystone = require('keystone');

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
	cpu_id: { type: String, label: 'CPU 标识', required: true, initial: true, index: true},
	cpu_num:{ type: String, label: 'CPU 数量'}
});


Cpu.track = true
Cpu.register();
