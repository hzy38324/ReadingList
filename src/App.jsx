import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')

  // Load items from localStorage on mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('readingList')) || []
    setItems(storedItems)
  }, [])

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('readingList', JSON.stringify(items))
  }, [items])

  const fetchTitle = async (url) => {
  try {
    const response = await fetch(`/api/fetch-title?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return data.title || url;
  } catch (error) {
    return url;
  }
};

const addItem = async (e) => {
  e.preventDefault();
  if (newItem.trim()) {
    const isUrl = /^https?:\/\//.test(newItem);
    let itemText = newItem;
    
    if (isUrl) {
      const title = await fetchTitle(newItem);
      itemText = `[网页] ${title}`;
    }
    
    setItems([...items, { text: itemText, completed: false, url: isUrl ? newItem : null }]);
    setNewItem('');
  }
};

  const toggleComplete = (index) => {
    const updatedItems = [...items]
    updatedItems[index].completed = !updatedItems[index].completed
    setItems(updatedItems)
  }

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index)
    setItems(updatedItems)
  }

  return (
    <div className="app">
      <h1>Reading List</h1>
      <form onSubmit={addItem}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new item..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(index)}>
              {item.text}
            </span>
            <button onClick={() => removeItem(index)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App