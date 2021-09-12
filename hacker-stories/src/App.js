import React from 'react';


const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org',
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const handleSearch = (event) =>{
    console.log(event.target.value);
  }

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch}/>
      <hr/>
      <List stories={stories}/>
    </div>
  );
}

const List = (props) => (
    <ul>
      {props.stories.map((story)=>(
          <Item key={story.objectID} story={story}/>
      ))}
    </ul>
);

const Item = (props) => (
  <li key={props.story.objectID}>
    <span>
      <a href={props.story.url}>{props.story.title}</a>
    </span>
    <span>{props.story.author}</span>
    <span>{props.story.num_comments}</span>
    <span>{props.story.points}</span>
  </li>
);

/*New component here*/
const Search = (props) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    props.onSearch(event);
  };

  return(
    <div>
      <label htmlFor="search">Search:</label>
      <input id='search' type="text" onChange={handleChange}></input>
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}

export default App;