// 순서 : 액션타입 정의 -> 액션 생성함수 선언 -> 초기 state 값 세팅 ->  리듀서 정의 및 내보내기
// 액션 타입 정의
const ADD_TODO = 'todoview/ADD_TODO';
const DELETE_TODO = 'todoview/DELETE_TODO';
const UNCOMPLETED_TODO = 'todoview/UNCOMPLETED_TODO';
const COMPLETED_TODO = 'todoview/COMPLETED_TODO';
const UPDATE_TODO = 'todoview/UPDATE_TODO';

// 액션 생성함수 정의
export const _addToDo = newTodo => ({ type : ADD_TODO, newTodo});
export const _deleteTodo = id => ({type : DELETE_TODO, id});
export const _unCompleted_Todo = id => ({type : UNCOMPLETED_TODO, id})
export const _completed_Todo = id => ({type : COMPLETED_TODO, id})
export const _update_Todo = (id,text) => ({type : UPDATE_TODO, id, text})



// 초기 상태 정의
const initialState = {
    toDos : {}
}



// 리듀서 선언
export default function todoview(state = initialState, action){
        // console.log(state, action);
        switch(action.type){
            case ADD_TODO:
                return {
                    toDos : {
                        ...state.toDos,
                        ...action.newTodo
                    }
                }
            case DELETE_TODO:
                const todos = state.toDos;
                delete todos[action.id]
                return {
                    toDos: {
                        ...state.toDos
                    }
                }
            case UNCOMPLETED_TODO:
                
                const uncomple_newtodo = {
                    ...state.toDos,
                    [action.id] : {...state.toDos[action.id], isCompleted : false}
                }
                return {
                    toDos : {
                        ...uncomple_newtodo
                    }
                }
            case COMPLETED_TODO : 
                const complete_newtodo = {
                    ...state.toDos,
                    [action.id] : {...state.toDos[action.id], isCompleted : true}
                }
                return {
                    toDos : {
                        ...complete_newtodo
                    }
                }
            case UPDATE_TODO : 
                const update_newtodo = {
                    ...state.toDos,
                    [action.id] : {...state.toDos[action.id], text : action.text}
                }
                return {
                    toDos : {
                        ...update_newtodo
                    }
                }
            default :
                return state; 
        }
}



