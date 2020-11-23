# redux-sagas-async
`redux-sagas-async` is an alternative and simplified version of redux-saga using await/async instead of generators.

# Getting started

## Install

```sh
$ npm install redux-sagas-async
```
## API

* `takeEvery`: Add listener for the specific action.
* `dispatch`: Redux dispatch function.
* `select`: Function to select the data from the store (receives state as argument).
* `delay`: Promise to add a delay in ms: Ex to wait 1 second: ```await delay(1000);```.


## Usage Example

The usage is very similar with the redux-saga, but replacing the generators with async functions and the call of Promises with `await` instead of `yield`:

Suppose we have a UI to fetch some user data from a remote server when a button is clicked. (For brevity, we'll just show the action triggering code.)

```javascript
class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
  ...
}
```

The Component dispatches a plain Object action to the Store. We'll create a Saga that watches for all `USER_FETCH_REQUESTED` actions and triggers an API call to fetch the user data.

#### `sagas.js`

```javascript
import { dispatch, takeEvery } from 'redux-sagas-async'
import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
const fetchUser = async (action) {
   try {
      const user = await Api.fetchUser(action.payload.userId);
      dispatch({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      dispatch({type: "USER_FETCH_FAILED", message: e.message});
   }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export default mySaga = () => {
  takeEvery("USER_FETCH_REQUESTED", fetchUser);
}
```

To run our Saga, we'll have to connect it to the Redux Store using the `redux-sagas-async` middleware.

#### `main.js`

```javascript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-sagas-async';

import reducer from './reducers';
import mySaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware(() => {
  mySaga();
  // error function is optional
}, (error) => console.log('global Saga error', error));

// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

// render the application
```
