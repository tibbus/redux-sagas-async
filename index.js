const actions = {};

export const takeEvery = (action, sagaFunction) => {
  actions[action] = actions[action] ?
    [...actions[action], sagaFunction] :
    [sagaFunction];
};

let storeAPISaga = {
  getState: null,
  dispatch: null
};

export const dispatch = (action) => {
  storeAPISaga.dispatch(action);
};

export const select = (selector) => {
  const state = storeAPISaga.getState();
  return selector(state);
};

export default (sagaListeners, onError) => {

  sagaListeners();

  return (storeAPI) => {

    storeAPISaga.getState = storeAPI.getState;
    storeAPISaga.dispatch = storeAPI.dispatch;

    return (next) => {
      return async (action) => {
        const nextAction = next(action);

        if (actions[action.type]) {
          if (onError) {
            try {
            // call all the async functions to resolve it with Promise.all
              const promises = actions[action.type].map(sagafunction => sagafunction(action));
              await Promise.all(promises);
            } catch (e) {
              onError(e);
            }
          } else {
            // call all the async functions to resolve it with Promise.all
            const promises = actions[action.type].map(sagafunction => sagafunction(action));
            await Promise.all(promises);
          }
        }

        return nextAction;
      };
    };
  };
};

export const delay = (time) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
};
