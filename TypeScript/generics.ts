// S => State
// T => Type
// K => Key
// V => Value
// E => Element

function use_state< S extends number | string = string >() {
    let state : S;

    function get_state() : S {
        return state;
    };

    function set_state(new_state : S) : void {
        state = new_state;
    };

    return {get_state, set_state};
};

const new_state = use_state();
new_state.set_state('foo');
console.log(new_state.get_state());

// new_state.set_state(123);
// console.log(new_state.get_state());