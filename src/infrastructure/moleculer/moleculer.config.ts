import { TemplateService } from '@/infrastructure/moleculer/services/moleculer.service';
import * as dotenv from 'dotenv';
import type { BrokerOptions, MetricRegistry, ServiceBroker } from 'moleculer';
import { Errors } from 'moleculer';

dotenv.config();

const brokerConfig: BrokerOptions = {
	namespace: process.env.MOLECULER_NAMESPACE || 'LK',
	nodeID: 'effective-contract-node',
	metadata: {},
	logger: {
		type: 'Console',
		options: {
			colors: false,
			moduleColors: false,
			formatter: 'full',
			objectPrinter: null,
			autoPadding: false,
		},
	},
	logLevel: 'info',
	transporter: 'TCP',
	cacher: null,
	serializer: 'JSON',
	requestTimeout: 10 * 1000,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: (err: Error) =>
			err && err instanceof Errors.MoleculerRetryableError && !!err.retryable,
	},
	maxCallLevel: 100,
	heartbeatInterval: 10,
	heartbeatTimeout: 30,
	contextParamsCloning: false,
	tracking: {
		enabled: false,
		shutdownTimeout: 5000,
	},
	disableBalancer: false,
	registry: {
		strategy: 'RoundRobin',
		preferLocal: true,
	},
	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60,
		halfOpenTime: 10 * 1000,
		check: (err: Error) =>
			err && err instanceof Errors.MoleculerError && err.code >= 500,
	},
	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100,
	},
	validator: true,
	metrics: {
		enabled: false,
		reporter: {
			type: 'Console',
			options: {
				port: 3030,
				path: '/metrics',
				defaultLabels: (registry: MetricRegistry) => ({
					namespace: registry.broker.namespace,
					nodeID: registry.broker.nodeID,
				}),
			},
		},
	},
	tracing: {
		enabled: false,
		exporter: {
			type: 'Console',
			options: {
				logger: null,
				colors: true,
				width: 100,
				gaugeWidth: 40,
			},
		},
	},
	middlewares: [],
	replCommands: null,
	created(broker: ServiceBroker) {
		broker.logger.info('Broker created successfully.');
		broker.createService(TemplateService);
	},
	async started(broker: ServiceBroker) {
		broker.logger.info('Broker started successfully.');
	},
	stopped(broker: ServiceBroker) {
		broker.logger.info('Broker stopped.');
	},
};

export = brokerConfig;
