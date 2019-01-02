/**
 * contains utils helpers.
 */

/**
 * class which is used to create enums,
 */
class Enum {
  constructor(obj) {
    const enumHandler = {
      get(target, name) {
        if (target[name]) {
          return target[name];
        }
        throw new Error(`no enum found for ${name}`);
      }
    };
    return new Proxy(Object.freeze(obj), enumHandler);
  }
};

/**
 * keyborad events
 */
export const KEYBOARD_EVENTS = new Enum({
  ENTER_KEY: 13
});

/** TODO : instead of the below, npm package can be used */
export const uuid = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  };
  return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
};
