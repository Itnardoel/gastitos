import { PlusCircle } from "./icons/plus-circle";
import { type Item, type DiscountType } from "@/types";
import { Trash } from "./icons/trash";

interface ItemFormProps {
  items: Item[];
  // people: Person[];
  onAddItem: (item: Item) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, item: Partial<Item>) => void;
}

export const ItemForm = ({ items, onAddItem, onRemoveItem, onUpdateItem }: ItemFormProps) => {
  const addNewItem = () => {
    onAddItem({
      id: crypto.randomUUID(),
      name: "",
      price: 0,
      discount: {
        type: "none",
        value: 0,
      },
      // splits: [],
      // hasCustomSplit: false,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-xl font-semibold">Items</h2>
        <button
          onClick={addNewItem}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <PlusCircle className="size-5" /> Add Item
        </button>
      </div>

      <div>
        {items.map((item) => (
          <div key={item.id} className="space-y-4 rounded-lg bg-white p-4 shadow-sm">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Item name"
                  value={item.name}
                  onChange={(e) => {
                    onUpdateItem(item.id, { name: e.target.value });
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => {
                    onUpdateItem(item.id, { price: parseFloat(e.target.value) || 0 });
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => {
                  onRemoveItem(item.id);
                }}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash className="size-5" />
              </button>
            </div>

            <div className="mt-2">
              <div className="flex items-center gap-2">
                <select
                  value={item.discount.type}
                  onChange={(event) => {
                    onUpdateItem(item.id, {
                      discount: {
                        type: event.target.value as DiscountType,
                        value: "",
                      },
                    });
                  }}
                  className="rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="none">No discount</option>
                  <option value="percentage">Percentage</option>
                  <option value="amount">Amount</option>
                </select>

                {item.discount.type !== "none" && (
                  <input
                    type="number"
                    placeholder={
                      item.discount.type === "percentage" ? "Discount %" : "Discount amount"
                    }
                    value={item.discount.value}
                    onChange={(event) => {
                      if (parseInt(event.target.value) < 0) return;

                      if (item.discount.type === "percentage" && parseInt(event.target.value) > 100)
                        return;

                      onUpdateItem(item.id, {
                        discount: {
                          type: item.discount.type,
                          value: parseFloat(event.target.value) || 1,
                        },
                      });
                    }}
                    className="w-32 rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
