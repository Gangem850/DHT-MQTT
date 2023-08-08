const yargs = require('yargs');

const argv = yargs
    .option('mqttbroker', {
        alias: 'm',
        description: 'The address of your MQTT Broker (e.g -m 192.168.0.10)',
        type: 'string',
    })
    .option('mqttuser', {
        alias: 'u',
        description: 'The username for your MQTT Broker (e.g -u mqttUser)',
        type: 'string',
    })
    .option('mqttpass', {
        alias: 'p',
        description: 'The password for your MQTT Broker (e.g -p mqttPass)',
        type: 'string',
    })
    .option('mqtttopic', {
        alias: 't',
        description: 'MQTT topic to publish to defaults to \'DHT-MQTT\' (e.g -t MyTopic)',
        type: 'string',
        default: 'DHT-MQTT'
    })
    .option('sensortype', {
	alias: 's',
	description: 'DHT sensor type. Values are 11 for DHT11, or 22 for DHT22. Defaults to 11 (e.g -s 22)',
	type: 'integer',
	default: 11
    })
    .option('pollinginterval', {
        alias: 'i',
        description: 'How frequently to poll the sensor in seconds, defaults to 10 (e.g -i 60)',
        type: 'integer',
        default: 10
    })
    .option('loglevel', {
        alias: 'l',
        description: 'Logging level to use, values are trace, debug, info, warn, error, fatal. Defaults to info',
        type: 'string',
        default: 'info'
    })
    .choices('loglevel', ['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    .help()
    .alias('help', 'h')
    .epilogue('For more information, check out the project repository at https://github.com/Gangemstyle850/DHT-MQTT')
    .env('DHTMQTT')
    .demandOption('mqttbroker', 'You must specify an MQTT broker.')
    .wrap(yargs.terminalWidth())
    .argv;

module.exports = {
    args: argv
};
