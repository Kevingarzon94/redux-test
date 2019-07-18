function createStore(reducers) {
  let state = {};
  const subscribers = [];
  const store = {
    getState() {
      return { ...state };
    },

    dispatch(action) {
      state = reducers(state, action);

      for (const callback of subscribers) {
        callback(state);
      }
    },

    subscribe(callback) {
      subscribers.push(callback);
    }
  };

  return store;
}

export { createStore };
