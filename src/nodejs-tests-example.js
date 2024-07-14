// The contents of the globalThis should be directly exported for browser usage

globalThis.PubSub = (() => {
	'use strict';
	return () => {
		this.listeners = {};
		this.on = (eventName, listener) => {
			if (!this.listeners[eventName]) {
				this.listeners[eventName] = [];
			}
			this.listeners[eventName].push(listener);
		};
		this.once = (eventName, listener) => {
			const onceWrapper = (...args) => {
				listener.apply(this, args);
				this.off(eventName, onceWrapper);
			};
			this.on(eventName, onceWrapper);
		};
		this.off = (eventName, listener) => {
			if (!this.listeners[eventName]) {
				return;
			}
			this.listeners[eventName] = this.listeners[eventName].filter(
				(needle) => needle !== listener,
			);
		};
		this.emit = (eventName, ...args) => {
			if (!this.listeners[eventName]) {
				return;
			}
			this.listeners[eventName].forEach((listener) => {
				listener.apply(this, args);
			});
		};

		return this;
	};
})();

module.exports = {
	PubSub: globalThis.PubSub,
};
