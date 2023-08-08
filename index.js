#!/usr/bin/env node
const cli = require("./cli");
const mqtt = require("./mqtt");
const sensor = require("node-dht-sensor");
const logger = require("./logger");



async function main() {

	logger.info("Starting DHT-MQTT...");

	try {
		const args = cli.args;
		logger.trace(args, "With arguments...")

		const mqttsubtopic = "ambient";

		setInterval(
			async function() {
				console.clear();
				logger.info("DHT-MQTT Running...");
				if(args.mqttbroker){
					await sensor.read(args.sensortype, 4, async function(err, temp, humid){
						if(!err) {
							const sensorData = {temp: temp, humidity: humid};
							await mqtt.publish(sensorData, mqttsubtopic);
							logger.info(sensorData);
							logger.info("Done. Waiting for next polling cycle");
						}
						else {
							logger.info("Error getting sensor data.");
						}
					});
				}

				else {
					logger.info("No MQTT broker specified");
				}
			},
			args.pollinginterval * 1000
		);
	}
	catch(e) {
		logger.error(e);
		process.exit(1);
	}
}

main();
