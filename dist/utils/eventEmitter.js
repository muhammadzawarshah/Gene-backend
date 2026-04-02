import { EventEmitter } from 'events';
const mqEmitter = new EventEmitter();
mqEmitter.on('GRN_COMPLETED', (payload) => {
    console.log(`[MQ EVENT]: GRN Created. Updating Reporting DB...`, payload);
});
export default mqEmitter;
//# sourceMappingURL=eventEmitter.js.map