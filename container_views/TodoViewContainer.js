import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import TodoView from '../views/TodoView';
import {_addToDo, _deleteTodo, _unCompleted_Todo, _completed_Todo, _update_Todo} from '../modules/todoview';

function TodoViewContainer(){
    // useSelector을 이용해 리덕스 스토어의 상태를 조회
    // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물
    const { toDos } = useSelector(state => ({
        toDos : state.todoview.toDos
    }));


    // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해준다.
    const dispatch  = useDispatch();

    const _onAddTodo = newTodo => dispatch(_addToDo(newTodo));
    const _onDeleteTodo = id => dispatch(_deleteTodo(id));
    const _onUnCompleted_Todo = id => dispatch(_unCompleted_Todo(id));
    const _onCompleted_Todo = id => dispatch(_completed_Todo(id));
    const _onUpdate_Todo = (id,text) => dispatch(_update_Todo(id,text));
    

    return <TodoView 
            toDos={toDos} 
            onAddTodo ={_onAddTodo} 
            onDeleteTodo={_onDeleteTodo} 
            onUnCompletedTodo = {_onUnCompleted_Todo}
            onCompletedTodo = {_onCompleted_Todo}
            onUpdateTodo = {_onUpdate_Todo}
            />
}

export default TodoViewContainer;