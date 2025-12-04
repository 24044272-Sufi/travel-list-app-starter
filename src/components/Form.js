import { useState } from "react";

function Form({onAddItems}) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)


  function handleSubmit(e) {
    e.preventDefault()
    if(!description.trim())
      return
    setDescription((prev) => prev.trim())

    const item = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false
    }

    onAddItems(item)
    setDescription("")
    setQuantity(1)
  }
  
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select defaultValue={quantity} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} /> 
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;