import {ADD_TODO, EDIT_TODO, TOGGLE_TODO, DELETE_CATEGORY} from '../actions/actions';
import undoable, {distinctState} from 'redux-undo';

var todoID = 0;

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                {
                    name: action.name,
                    done: false,
                    categoryId: action.categoryId,
                    id: todoID++
                },
                ...state
            ];
        case TOGGLE_TODO:
            return state.map((todo) => {
                if (todo.id === action.id) {
                    return Object.assign({}, todo, {
                        done: !todo.done
                    });
                }
                return todo;
            });
        case DELETE_CATEGORY:
            return state.filter((todo) => {
                if (todo.categoryId == action.deleteID) {
                    return false;
                }
                return true;
            });
        case EDIT_TODO:
            return state.map((todo) => {
                debugger;
                if (todo.id === action.newTodo.id) {
                    console.log(action.newTodo);
                    return action.newTodo;
                }
                return todo;
            });
        default:
            return state;
    }
}

const undoableTodos = undoable(todos);

export default undoableTodos;