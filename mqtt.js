const cli = require('./cli');
const mqtt = require('async-mqtt');
const logger = require('./logger');
const args = cli.args;

const mqttOptions = {
    username: args.mqttuser,
    password: args.mqttpass,
    clientId: `dhtMQTT_${Math.random().toString(16).substr(2,8)}`    
};

module.exports = {
    publish: async function(data, subTopic) {
        try {
            logger.info('Connecting to MQTT broker...');
            logger.trace(mqttOptions, 'With MQTT options...');
            const client = await mqtt.connectAsync(`tcp://${args.mqttbroker}`, mqttOptions)
            logger.info('Publishing data to MQTT...');
            await client.publish(`${args.mqtttopic}/${subTopic}`, JSON.stringify(data));
            await client.end();
	    logger.info('Disconnected.');
        } catch (e){
            logger.error(e);
        }
    }
}
