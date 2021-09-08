import React, { Component } from 'react';
import Modal from "./components/Modal";
import axios from "axios";


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem:{
        title: "",
        description: "",
        completed: false
      },
      todoList: []
    };
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  };

  handleSubmit = (item) => {
    this.toggle();
    if (item.id){
      axios.put(`http://localhost:8000/api/todos/${item.id}/`, item)
      return;
    }
    axios.post("http://localhost:8000/api/todos/", item)
  };

  createItem = () => {
    const item = {title: "", descripton: "", completed:false};
    this.setState({activeItem: item, modal: !this.state.modal});
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({viewCompleted:true});
    }
    return this.setState({viewCompleted:false});
  };
  renderTabList = () => {
    return(
      <div className="my-5 tab-list">
        <button 
          onClist={() => this.displayCompleted(true)}
          className={this.state.viewCompleted? "active":""}>
            Complete
        </button>
        <button
          onClick={()=> this.displayCompleted(false)}
          className={this.state.viewCompleted ? "":"active"}>
            Incomplete
          </button>
      </div>
    )
  }

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/todos/');
      const todoList = await res.json();
      this.setState({
        todoList
      });
    } catch (e) {
      console.log(e);
    }
  };

  renderItems = () =>{
    const {viewCompleted} = this.state;
    const newItems = this.state.todoList.filter(item => item.completed === viewCompleted);
    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span className={`todo-list mr-2 ${this.state.viewCompleted ? "completed-todo":""}`} title={item.description}>
              {item.title}
            </span>
      </li>
    ));
  };

  render(){
    return(
      <main className='content'>
        <div className='row'>
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className='card p-3'>
              <ul className='list-group list-group-flush'>
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default App;