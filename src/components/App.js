import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";

function PackingList({items, onDeleteItem, onUpdateItem}) {
  const Item = ({item}) => {
    return (
      <li key={item.id} className="item">
        <input type="checkbox" value={item.packed} checked={item.packed} onChange={() => onUpdateItem(item)}/>
        <span style={item.packed ? {textDecoration: 'line-through'} : {}}  >{item.description} ({item.quantity})</span>
        <button onClick={() => onDeleteItem(item)}>❌</button>
      </li>
    )
  }

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item}/>
        ))}
      </ul>
    </div>
  );
}

function Stats({items}) {
  const itemLength = items.length;
  const itemPacked = items.filter((item) => item.packed).length;

  const itemPercentage = Math.round((itemPacked / itemLength) * 100) || 0

  return (
    <footer className="stats">
      <em>
        {
          itemPercentage === 100 ? 
          "You got everything!" : `You have ${itemLength} items in the list. You already packed ${itemPacked} (${itemPercentage}%).`
        }
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([])
  function handleAddItems(item) {
    setItems((prev) => [...prev, item])
  }

  function handleDeleteItem(item) {
    setItems((prev) => prev.filter(i => i.id !== item.id))
  }

  function handleUpdateItem(item) {
    setItems((prev) => prev.map(i => i.id === item.id ?  {...i, packed: !item.packed} : i ))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}/>
      <Stats items={items} />
    </div>
  );
}

export default App;
