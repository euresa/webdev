import React from 'react';


const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) ?? initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};


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

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel
        id='search'
        label='Search'
        type='text'
        value={searchTerm}
        onInputChange={handleSearch}
      />
      <hr/>
      <List stories={searchedStories}/>
    </div>
  );
}

const List = ({stories}) => (
    <ul>
      {stories.map((item)=>(
          <Item key={item.objectID} item={item}/>
      ))}
    </ul>
);

const Item = ({item}) => (
  <li>
    <>
      <a href={item.url}>{item.title}</a>
    </>
    <>{item.author}</>
    <>{item.num_comments}</>
    <>{item.points}</>
  </li>
);

/*New component here*/
const InputWithLabel = ({id, label, type, value, onInputChange}) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange}/>
  </>
);


export default App;