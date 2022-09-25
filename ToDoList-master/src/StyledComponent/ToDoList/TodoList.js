import React, { Component } from 'react'
import { Container } from '../../Components/Container'
import { ThemeProvider } from 'styled-components'
import { DarkTheme } from '../../Themes/DarkTheme'
import { LightTheme } from '../../Themes/LightTheme'
import { PrimaryTheme } from '../../Themes/PrimaryTheme'
import { Dropdown } from '../../Components/Dropdown'
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../../Components/Heading'
import { TextField, Label, Input } from '../../Components/TextField'
import { Button } from '../../Components/Button'
import { Table, Tr, Td, Th, Thead, Tbody } from '../../Components/Table'
import { connect } from 'react-redux';
import { addTaskAction, changeTheme, changeThemeAction, deleteTaskAction, doneTaskAction, editTaskAction, updateTaskAction } from '../../redux/actions/actions'
import { arrTheme } from '../../Themes/ThemeMain'

class TodoList extends Component {

    state = {
        taskName: '',
        disabled: true,
    }

    renderTaskToDo = () => {
        return this.props.taskList.filter(task => !task.done).map(
            (task, index) => {
                return <Tr key={index}>
                    <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                    <Th className='text-end'>
                        <Button onClick={() => {
                            this.setState({
                                disabled: false
                            }, () => {
                                this.props.dispatch(editTaskAction(task))
                            })


                        }}><i className='fa fa-edit'></i></Button>

                        <Button onClick={() => {
                            this.props.dispatch(doneTaskAction(task.id))
                        }} className='ms-1'><i className='fa fa-check'></i></Button>

                        <Button onClick={() => {
                            this.props.dispatch(deleteTaskAction(task.id))
                        }} className='ms-1'><i className='fa fa-trash'></i></Button>
                    </Th>
                </Tr>
            })
    }

    renderTaskComplete = () => {
        return this.props.taskList.filter(task => task.done).map(
            (task, index) => {
                return <Tr key={index}>
                    <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
                    <Th className='text-end'>
                        <Button onClick={() => {
                            this.props.dispatch(deleteTaskAction(task.id))
                        }} className='ms-1'><i className='fa fa-trash'></i></Button>
                    </Th>
                </Tr>
            }
        )
    }

    renderTheme = () => {
        return arrTheme.map((theme, index) => {
            return <option key={index} value={theme.id}>
                {theme.name}
            </option>
        })
    }

    // static getDerivedStateFromProps(newProps,currentState){

    //     let newState = {...currentState,taskName: newProps.taskEdit.taskName}
    //     return newState;
    // }

    render() {
        return (
            <ThemeProvider theme={this.props.themeToDoList}>

                <Container className="w-50">
                    <Dropdown onChange={(e) => {
                        let { value } = e.target;
                        //Dispatch value on reducer
                        // this.props.dispatch({
                        //     type:'change_theme',
                        //     themeId:value
                        // })


                        this.props.dispatch(changeThemeAction(value))
                    }}>

                        {this.renderTheme()}
                        {/* <option>Dark Theme</option>
                        <option>Light Theme</option>
                        <option>Primary Theme</option> */}
                    </Dropdown>
                    <Heading3>To Do List</Heading3>

                    {/* <Label>Task name</Label>
                    <Input/> */}
                    <TextField value={this.state.taskName} onChange={(e) => {

                        this.setState({
                            // [e.target.name]:e.target.value,
                            taskName: e.target.value
                        })


                    }} name="taskName" label="Task name" />
                    <Button onClick={() => {
                        //Get input
                        let { taskName } = this.state;

                        //create task object
                        let newTask = {
                            id: Date.now(),
                            taskName: taskName,
                            done: false
                        }


                        //dispatch object to redux
                        this.props.dispatch(addTaskAction(newTask))



                    }} className='ms-2'><i className='fa fa-plus'></i> Add task</Button>

                    {
                        this.state.disabled ? <Button disabled onClick={() => {
                            this.props.dispatch(updateTaskAction(this.state.taskName))
                        }} className='ms-2'><i className='fa fa-upload'></i> Update task</Button> :
                            <Button onClick={() => {
                                let {taskName} = this.state;
                                this.setState({
                                    disabled: true,
                                    taskName: ''
                                }, () => {
                                    this.props.dispatch(updateTaskAction(taskName))
                                })


                            }} className='ms-2'><i className='fa fa-upload'></i> Update task</Button>}



                    <Heading3>Task To Do</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskToDo()}
                            {/* <Tr>
                                <Th style={{verticalAlign: 'middle'}}>Task name</Th>
                                <Th className='text-end'>
                                    <Button><i className='fa fa-edit'></i></Button>
                                    <Button className='ms-1'><i className='fa fa-check'></i></Button>
                                    <Button className='ms-1'><i className='fa fa-trash'></i></Button>
                                </Th>
                            </Tr>
                            <Tr>
                                <Th style={{verticalAlign: 'middle'}}>Task name</Th>
                                <Th className='text-end'>
                                    <Button><i className='fa fa-edit'></i></Button>
                                    <Button className='ms-1'><i className='fa fa-check'></i></Button>
                                    <Button className='ms-1'><i className='fa fa-trash'></i></Button>
                                </Th>
                            </Tr> */}
                        </Thead>
                    </Table>

                    <Heading3>Task Complete</Heading3>
                    <Table>
                        <Thead>
                            {this.renderTaskComplete()}
                            {/* <Tr>
                                <Th style={{ verticalAlign: 'middle' }}>Task name</Th>
                                <Th className='text-end'>
                                    <Button><i className='fa fa-trash'></i></Button>

                                </Th>
                            </Tr>
                            <Tr>
                                <Th style={{ verticalAlign: 'middle' }}>Task name</Th>
                                <Th className='text-end'>
                                    <Button><i className='fa fa-trash'></i></Button>

                                </Th>
                            </Tr> */}
                        </Thead>
                    </Table>
                </Container>

            </ThemeProvider>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
            this.setState({
                taskName: this.props.taskEdit.taskName
            })
        }
    }
}


const mapStateToProps = state => {
    return {
        themeToDoList: state.ToDoListReducer.themeToDoList,
        taskList: state.ToDoListReducer.taskList,
        taskEdit: state.ToDoListReducer.taskEdit,
    }
}
export default connect(mapStateToProps)(TodoList)
