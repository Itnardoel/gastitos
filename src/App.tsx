import { useState } from "react";
import { Header } from "./components/header";
import { ItemForm } from "./components/item-form";
import { type Item } from "./types";

function App() {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = (item: Item) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  return (
    <>
      {JSON.stringify(items, null, 2)}
      <Header />
      <ItemForm
        items={items}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onUpdateItem={handleUpdateItem}
      />
    </>
  );
}

export default App;
