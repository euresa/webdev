import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';


function Counter(){
  const [counter, setCounter] = useState(0);

  return(
    <div>
      <button onClick = {() => setCounter(counter+1)}>
        {counter}
      </button>
    </div>
  );
}



ReactDOM.render(
  <div>
    <Counter/>
  </div>
  ,
  document.getElementById('root')
);
