import { useState } from "react";
import { Header } from "./components/header";
import { ItemForm } from "./components/item-form";
import { type Person, type Item } from "./types";
import { Summary } from "./components/summary";
import { PeopleSplit } from "./components/people-split";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  const handleAddItem = (item: Item) => {
    setItems([...items, item]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const handleAddPerson = () => {
    setPeople([
      ...people,
      {
        id: crypto.randomUUID(),
        name: "",
        amountPaid: "",
      },
    ]);
  };

  const handleRemovePerson = (id: string) => {
    setPeople(people.filter((person) => person.id !== id));
  };

  const handleUpdatePerson = (id: string, updates: Partial<Person>) => {
    setPeople(people.map((person) => (person.id === id ? { ...person, ...updates } : person)));
  };

  const handleUpdatePayment = (personId: string, amount: number | "") => {
    setPeople(
      people.map((person) => (person.id === personId ? { ...person, amountPaid: amount } : person)),
    );
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      let itemTotal = item.price as number;

      if (item.discount.type === "percentage") {
        itemTotal *= 1 - Number(item.discount.value) / 100;
      } else {
        itemTotal -= Number(item.discount.value);
      }

      return total + itemTotal;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Header />
        <main className="grid gap-8">
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <ItemForm
              items={items}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
              onUpdateItem={handleUpdateItem}
            />
          </section>
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <PeopleSplit
              items={items}
              people={people}
              totalPrice={calculateTotal}
              onAddPerson={handleAddPerson}
              onRemovePerson={handleRemovePerson}
              onUpdatePerson={handleUpdatePerson}
              onUpdatePayment={handleUpdatePayment}
            />
          </section>
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <Summary
              itemsQuantity={items.length}
              peopleQuantity={people.length}
              totalPrice={calculateTotal}
            />
          </section>
        </main>
      </div>
      {/* {JSON.stringify(items, null, 2)} */}
    </div>
  );
}

export default App;
