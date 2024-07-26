// The contents of the globalThis should be directly exported for browser usage

globalThis.PubSub = function PubSub() {
  'use strict';

  this.elisteners = {};
  this.on = (eventName, listener) => {
    if (!this.elisteners[eventName]) {
      this.elisteners[eventName] = [];
    }
    this.elisteners[eventName].push(listener);

    return this;
  };
  this.once = (eventName, listener) => {
    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(eventName, onceWrapper);
    };
    this.on(eventName, onceWrapper);

    return this;
  };
  this.off = (eventName, listener) => {
    if (this.elisteners[eventName]) {
      this.elisteners[eventName] = this.elisteners[eventName].filter(
        (needle) => needle !== listener,
      );
    }

    return this;
  };
  this.emit = (eventName, ...args) => {
    if (this.elisteners[eventName]) {
      this.elisteners[eventName].forEach((listener) => {
        listener.apply(this, args);
      });
    }

    return this;
  };
  this.listeners = (eventName) => {
    let ret = [];
    if (this.elisteners[eventName]) {
      ret = this.elisteners[eventName];
    }
    return ret;
  };

  return this;
};

module.exports = {
  PubSub: globalThis.PubSub,
};
