import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "bootstrap/dist/css/bootstrap.css"


class RotatingImage extends React.Component{
  constructor(props){
    super(props)
    this.state = {url: this.props.url, angle:0}
  }
  componentDidMount(){
    setInterval(this.rotateImage, 50)
  }
  rotateImage = () =>{
    this.setState({ angle: this.state.angle + 1})
  }
  render(){
    var imgStyle = {
      transform: "rotate("+this.state.angle+"deg)"
    }
    return(
        <img style = {imgStyle} src={this.state.url} width="100px"></img>
    )
  }
}


ReactDOM.render(
    <App />,
  document.getElementById('root')
);

ReactDOM.render(
  <RotatingImage url="./logo512.png"/>,
  document.getElementById('react-image-root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
