import {useEffect, useState} from "react";
import axios from "axios";
import './App.css';

function App() {

const [itemText, setItemText] = useState('');
const [listItems, setListItems] = useState([]);
const [isUpdating, setIsUpdating] = useState('');
const [updateItemText, setUpdateItemText] = useState('');

const handleTextChange= (e) =>{
  setItemText(e.target.value);
}

// add new item to database
const addItemToDb = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/api/v1/item", {item: itemText});
    console.log(res);
    setListItems(prev => [...prev, res.data]);
    setItemText('');
  } catch (error) {
    console.error(error);
  }
}

// fetch item from database -- using useEffect hook
useEffect(() => {
  const getItemsList = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/item");
      // console.log(res.data);
      setListItems(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  getItemsList();
},[])

// Delete Item when click on Delete
  const deleteItem = async (id) => {
    try {
      //finding the item by id and deleting it
      const deleteItem = await axios.delete(
        `http://localhost:3000/api/v1/item/${id}`);
        console.log(deleteItem.data);
        const newListItems = listItems.filter(item => item._id !== id);
        setListItems(newListItems);
    } catch (error) {
      console.log(error);
    }
  }

  // update item
  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/v1/item/${isUpdating}`, {item: updateItemText});
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    } catch (error) {
      console.error(error);
    }
  }
  // the form that will render when we will click on update item button
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) =>{updateItem(e)}}>
      <input className="update-input" type="text" placeholder="New Todo" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-button" type="submit">Update</button>
    </form>
  )

  return (
    <div className="App">
    <h1>Todoie App</h1>
      <form className="form" onSubmit={e => addItemToDb(e)}>
        <input type="text" placeholder="Add Todo" onChange={handleTextChange} value={itemText}/>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item=> (
            <div className="todo-item">
              {
                isUpdating === item._id
                ? renderUpdateForm()
                : <>
                  <p className="item-content">{item.item}</p>
                  <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                  <button className="delete-item" onClick={() =>{deleteItem(item._id)}}>Delete</button>
                </>
              }
            </div>
          ))
        }

      </div>
    </div>
  );
}

export default App;
