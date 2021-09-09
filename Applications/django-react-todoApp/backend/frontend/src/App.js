import React, { Component } from 'react';
import axios from "axios";
import reportWebVitals from './reportWebVitals';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      trackedListItems: [],
      viewCompleted: false,
      todoList: []
    };
  }

  async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/todos/');
        const todoList = await res.json();
        this.setState({
          todoList: todoList
        });
      } catch (e) {
        console.log(e);
      }
  };

  updateEntry = (item) => {
    console.log(`Trying to update item ${item.id}`)
    if (item.id){
      axios.put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then(res => console.log(`Successfully updated item ${item.id}`))
    } else {
      alert(`ERROR: Unable to update item ${item.id} in database`)
    }
  }


  submitNewItem = item => {
    console.log("submitting new item into database")
    axios.post('http://localhost:8000/api/todos/', item)
      .then((res) => {
        axios.get('http://localhost:8000/api/todos/')
          .then(res => {
            console.log(`Added new item to database`)
            var updatedList = res.data;
            this.setState({ todoList: updatedList })
          })
      })
  };

  createItem = () => {
    if (this._inputElement.value != ""){
      this.setState({ viewCompleted: false })
      const item = {title: this._inputElement.value, author: "Sam Eure", completed: false, serialNumber: Date.now().toString()};
      this._inputElement.value = ""
      this.submitNewItem(item);
    }
  };

  deleteItem = item => {
    try {
      console.log(`Trying to delete item ${item.id}`)
      axios.delete(`http://localhost:8000/api/todos/${item.id}/`)
        .then(res => console.log(`Successfully deleted item ${item.id} from database`))
    } catch (error) {
      console.error(`Error occured while trying to delete item ${item.id} in App.deleteItem`)
      alert('hi')
    }
    var remainingTasks = this.state.todoList.filter(currentItem => currentItem.id !== item.id)
    this.setState({ todoList: remainingTasks })
  };

  markAsComplete = (item) => {
    if (!item.completed){
      item.completed = true;
      this.updateEntry(item)
      var remainingTasks = this.state.todoList.filter(filteredItem => filteredItem.id !== item.id)
      remainingTasks.push(item)
      this.setState({ todoList: remainingTasks })
    }
  }

  changeStatus = (item) => {
    item.completed ? this.deleteItem(item) : this.markAsComplete(item)
  }

  displayCompleted = (status) => {
    if (status) {
      return this.setState({viewCompleted:true});
    }
    return this.setState({viewCompleted:false});
  };

  renderTabList = () => {
    return(
      <div className="my-4 tab-list">
        <button
          onClick={()=> this.displayCompleted(false)}
          className={this.state.viewCompleted ? "":"active"}>
            Incomplete
        </button>  
        <button
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}>
          Complete
        </button>
      </div>
    )
  }

  renderItems = () =>{
    const {viewCompleted} = this.state;
    const newItems = this.state.todoList.filter(item => item.completed === viewCompleted);
    //TODO: Add classes to the span later
    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center" >
          <span className={`todo-list mr-2 ${this.state.viewCompleted ? "":""}`}>
              {item.title}
          </span>
        <button type='button' onClick={() => this.changeStatus(item)}>{item.completed ? "delete" : "mark as complete"}</button> 
      </li>
    ));
  };

  render(){
    return(
      <main>
        <div className='row'>
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className='card p-3'>
              <div>
                <input maxlength='100' placeholder='Enter new task' ref={(inputTag)=>this._inputElement = inputTag}></input>
                <button onClick={this.createItem} className="btn btn-primary">Add</button>
              </div>
              {this.renderTabList()}
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
