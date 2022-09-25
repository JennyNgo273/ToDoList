import { DarkTheme } from "../../Themes/DarkTheme"
import { LightTheme } from "../../Themes/LightTheme"
import { PrimaryTheme } from "../../Themes/PrimaryTheme"
import { arrTheme } from "../../Themes/ThemeMain"
import { add_task, change_theme, delete_task, done_task, edit_task, update_task } from "../types/Types"

const initialState = {
  themeToDoList: DarkTheme,
  taskList: [
    { id: 'task-1', taskName: 'task 1', done: true },
    { id: 'task-2', taskName: 'task 2', done: false },
    { id: 'task-3', taskName: 'task 3', done: true },
    { id: 'task-4', taskName: 'task 4', done: false }
  ],

  taskEdit: {
    id: '-1', taskName: '', done: false
  }

}

export default (state = initialState, action) => {
  switch (action.type) {
    case add_task: {
      // console.log('todo',action.newTask)

      if (action.newTask.taskName.trim() === '') {
        alert('Input Task Name');
        return { ...state }
      }

      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex(task => task.taskName === action.newTask.taskName);
      if (index !== -1) {
        alert('Task Name already exist')
        return { ...state }
      }

      taskListUpdate.push(action.newTask);

      state.taskList = taskListUpdate
      //  state.taskList = [...taskListUpdate,action.newTask];

      return { ...state }
    }

    case change_theme: {

      let theme = arrTheme.find(theme => theme.id == action.themeId);
      if (theme) {

        state.themeToDoList = { ...theme.theme };
      }
      return { ...state };
      console.log(action)
    }

    case done_task: {

      let taskListUpdate = [...state.taskList]

      let index = taskListUpdate.findIndex(task => task.id === action.taskId);

      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      // state.taskList = taskListUpdate;

      return { ...state, taskList: taskListUpdate }
    }

    case delete_task: {

      let taskListUpdate = [...state.taskList]

      taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId);

      // let index = taskListUpdate.findIndex(task => task.id === action.taskId);

      // if (index !== -1){

      // }

      //More lean code 
      // return {...state, taskList: state.taskList.filter(task => task.id !== action.taskId)}

      return { ...state, taskList: taskListUpdate }
    }

    case edit_task: {
      return { ...state, taskEdit: action.task }
    }

    case update_task: {
      // console.log(action.taskName)
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      let taskListUpdate = [...state.taskList]  ;
      let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);

      // console.log(index)

      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }


      state.taskList = taskListUpdate;
      state.taskEdit = {id:'-1', taskName:'', done:false}

      state.taskList = taskListUpdate;
      return { ...state }
      // return { ...state, taskList: taskListUpdate }
    }




    default:
      return { ...state }
  }
}
