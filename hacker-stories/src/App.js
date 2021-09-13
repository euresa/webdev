import React from 'react';

const initialStories = [
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

const getAsyncStories = () =>
  new Promise((resolve) =>
    setTimeout(()=>resolve({data: {stories: initialStories}}), 2000)
  );

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem(key) ?? initialState);

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};


const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

  const [stories, setStories] = React.useState([]);

  React.useEffect(() => {
    getAsyncStories().then((result) => {
      setStories(result.data.stories);
    });
    }, []);

  const handleSearch = (event) =>{
    setSearchTerm(event.target.value);
  };

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  }

  const searchedStories = stories.filter((story) => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <div>
      <h1>My Hacker Stories</h1>
      <InputWithLabel id='search' type='text' value={searchTerm} onInputChange={handleSearch}>
        <strong>Search:</strong>
      </InputWithLabel>
      <hr/>
      <List list={searchedStories} onRemoveItem={handleRemoveStory}/>
    </div>
  );
}

const List = ({list, onRemoveItem}) => (
    <ul>
      {list.map((item)=>(
          <Item 
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
          />
      ))}
    </ul>
);

const Item = ({item, onRemoveItem}) => (
    <li>
      <>
        <a href={item.url}>{item.title}</a>
      </>
      <>{item.author}</>
      <>{item.num_comments}</>
      <>{item.points}</>
      <>
      <button type='button' onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </>
    </li>
  );


/*New component here*/
const InputWithLabel = ({id, type='text', value, onInputChange, children}) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange}/>
  </>
);


export default App;