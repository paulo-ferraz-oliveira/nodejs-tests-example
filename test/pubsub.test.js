/* eslint-disable camelcase, sort-keys, no-magic-numbers, one-var, strict */
const { PubSub } = require('../src/pubsub');
const { all, is } = require('nodejs-tests');
const tests = {
	onAddsAListener: (cfg) => {
		const eventName = 'something';

		cfg.pubsub.on(eventName, (something) => something);

		is(1, cfg.pubsub.listeners(eventName).length);
	},

	onceAddsAListener: (cfg) => {
		const eventName = 'something2';

		cfg.pubsub.once(eventName, (something) => something);

		is(1, cfg.pubsub.listeners(eventName).length);
	},

	offRemovesAListener: (cfg) => {
		const eventName = 'something3',
			something1 = (something) => something,
			something2 = (something) => something;

		cfg.pubsub.on(eventName, something1);
		cfg.pubsub.on(eventName, something2);
		is(2, cfg.pubsub.listeners(eventName).length);

		cfg.pubsub.off(eventName, something1);
		is(1, cfg.pubsub.listeners(eventName).length);
	},

	onListensToEventsAfterEmit: (cfg) => {
		let res = false;
		const eventName = 'leftRight',
			leftRight = (left, right) => {
				res = left > right;
			};

		cfg.pubsub.on(eventName, leftRight).emit(eventName, 2, 1);
		is(true, res);

		cfg.pubsub.emit(eventName, 1, 2);
		is(false, res);

		cfg.pubsub.off(eventName, leftRight);

		res = null;
		// Same call as above
		cfg.pubsub.emit(eventName, 1, 2);
		is(null, res);
	},

	onceListensToEventsAfterEmitOnlyOnce: (cfg) => {
		let res = false;
		const eventName = 'isCar',
			isCar = (data) => {
				res = data === 'car';
			};

		cfg.pubsub.once(eventName, isCar);

		cfg.pubsub.emit(eventName, 'car');
		is(true, res);

		res = null;
		// Same call as above
		cfg.pubsub.emit(eventName, 'car');
		is(null, res);
	},

	offRemovesAllSameRefListeners: (cfg) => {
		const eventName = 'summa',
			something1 = (something) => something;

		cfg.pubsub.on(eventName, something1);
		is(true, cfg.pubsub.listeners(eventName).indexOf(something1) !== -1);

		cfg.pubsub.off(eventName, something1);
		is(true, cfg.pubsub.listeners(eventName).indexOf(something1) === -1);

		cfg.pubsub.on(eventName, something1);
		cfg.pubsub.on(eventName, something1);
		is(2, cfg.pubsub.listeners(eventName).length);

		cfg.pubsub.off(eventName, something1);
		is(0, cfg.pubsub.listeners(eventName).length);
	},
};

all([
	[
		'pubsub',
		{
			before_all: (cfg) => {
				cfg.pubsub = new PubSub();
				return cfg;
			},
			all: [
				{ name: '.on adds a listener', fun: tests.onAddsAListener },
				{ name: '.once adds a listener', fun: tests.onceAddsAListener },
				{ name: '.off removes a listener', fun: tests.offRemovesAListener },
				{
					name: '.on listens to events more than once',
					fun: tests.onListensToEventsAfterEmit,
				},
				{
					name: '.once listens to events only once',
					fun: tests.onceListensToEventsAfterEmitOnlyOnce,
				},
				{
					name: '.off removes all listeners with same reference',
					fun: tests.offRemovesAllSameRefListeners,
				},
			],
		},
	],
]);
