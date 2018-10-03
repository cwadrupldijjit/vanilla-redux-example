const { listenToUserInput } = require('./user-input-helper');




// -------------------------------------
const redux = require('redux');

const initialState = {
    count: 0,
};

// The reducer is a function that accepts the current state and
// an action.  The point is to return a new object that holds
// your new data or the original object if there should be no
// change.
function reducer(state = initialState, action) {
    // The action is an object that can only have two properties:
    // "payload", which holds any data that you may want to use
    //    inside of this function to update state (optional); and
    // "type", which is a unique identifier that can be used to
    //    tell this function what you want to do with the data
    //    either in state or the payload
    
    // You will often see a "switch" statement that will return
    // what you want the next state to be from each of its "case"
    // statements.
    switch (action.type) {
        // In this case, the "type" will be a plus
        case '+':
            // We don't want to lose everything else that was in
            // state (in case there was anything else), and so
            // you will often see the previous state being spread
            // out into a new object and the updates added beneath
            // it.  This new object is returned.
            return {
                ...state,
                // Here, we're wanting to only change "count" to
                // be one more than it used to be, so we add a
                // property to the new state object called "count"
                // that will have the value of the previous "count"
                // plus one
                count: state.count + 1,
            };
        
        // The same thing can be said of this case as with the plus
        // case except it will decrease the count by 1
        case '-':
            return {
                ...state,
                count: state.count - 1,
            }
    }
    
    // If it doesn't match any of the other cases, we want to make
    // sure to return the previous state.  If this happens, none of
    // the code listening to state changes will will fire, and we
    // want to make sure that the state is available to our code
    // when we ask for it from the store.
    // Failing to return anything will be catastrophic.
    return state;
}

// With the reducer, we can create a store.  The "store" is an object
// that keeps track of the "state" and uses the "reducer" we provide
// whenever we want to update the "state".  The "store" has several
// useful methods we can use to update state, listen to state changes,
// and get the current state.
const store = redux.createStore(reducer);

// One of the methods that the store has is "subscribe", whose whole purpose
// is to run a function that you provide whenever there is a change in state.
// It then returns a function that can be used to tell the store that you
// don't care about the changes in state and to stop calling that function
// on state changes.  An example is below, in the "setTimeout"
const unsubscribe = store.subscribe(() => {
    // When a change is made, I want to log out the current count.
    // As such, I use another method on the "store" called "getState".
    // The "getState" method does exactly what it sounds like; it gets
    // the current state, and from there we can do what we want with
    // that data.
    console.log('Current count:', store.getState().count);
});

// --------------------------------------------------------

// I made a simple user input listener that will react to what you input into
// the console after you've started the application
const stopListening = listenToUserInput(input => {
    // This is called whenever the user presses "enter"
    
    input = input.trim();
    
    if (!input) {
        return;
    }
    
    if (input.length == 1) {
        // The "dispatch" store method is used whenever you want to make a
        // change to state.  This is similar in React to "setState".
        // You can pass one value into the "dispatch" function, which is
        // called an "action", which is explained in the reducer above.
        // In this case, the "input" that you get is sufficient enough, so
        // we don't have to pass a payload to the reducer.
        store.dispatch({ type: input });
    }
    else {
        // In this case, this is useful if you have multiple characters that
        // can affect the count in the store.
        input
            .split('')
            .forEach(char => {
                store.dispatch({ type: char });
            });
    }
});

// This timeout is only to show how to unsubscribe when you're done listening
setTimeout(() => {
    console.log('Time is up - thanks for trying it out!');
    console.log('Final count:', store.getState().count);
    
    
    
    // You can use the "unsubscribe" function you got earlier
    // to stop listening to changes in state
    unsubscribe();
    
    
    
    // This just stops accepting input and closes the program
    stopListening();
}, 20000);