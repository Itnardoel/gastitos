import { PlusCircle } from "./icons/plus-circle";
import { type Item, type DiscountType, type Person, type Split } from "@/types";
import { Trash } from "./icons/trash";
import { Users } from "./icons/users";
import { getPriceWithDiscount } from "../utils/operations";

interface ItemFormProps {
  items: Item[];
  people: Person[];
  onAddItem: (item: Item) => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, item: Partial<Item>) => void;
}

export const ItemForm = ({
  items,
  people,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}: ItemFormProps) => {
  const addNewItem = () => {
    onAddItem({
      id: crypto.randomUUID(),
      name: "",
      price: "",
      discount: {
        type: "none",
        value: 0,
      },
      splits: [],
      hasCustomSplit: false,
    });
  };

  const toggleCustomSplit = (itemId: string, hasCustomSplit: boolean) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;

    if (!hasCustomSplit) {
      onUpdateItem(itemId, { hasCustomSplit, splits: [] });
    } else {
      onUpdateItem(itemId, { hasCustomSplit });
    }
  };

  const handleUpdateSplit = (
    itemId: string,
    personId: string,
    type: "percentage" | "amount",
    value: number | "",
  ) => {
    const item = items.find((item) => item.id === itemId);
    if (!item) return;

    const splits = [...item.splits];

    const existingSplitIndex = splits.findIndex((split) => split.personId === personId);

    // if (existingSplitIndex >= 0) {
    //   if (value === 0) {
    //     splits = splits.filter((s) => s.personId !== personId);
    //   } else {
    //     splits[existingSplitIndex] = { personId, type, value };
    //   }
    // } else if (value > 0) {
    //   splits.push({ personId, type, value });
    // }

    if (existingSplitIndex >= 0) {
      splits[existingSplitIndex] = { personId, type, value };
    } else {
      splits.push({ personId, type, value });
    }

    onUpdateItem(itemId, { splits });
  };

  const calculateSplitAmount = (item: Item, split: Split): number => {
    if (split.type === "percentage") {
      return (Number(item.price) * Number(split.value)) / 100;
    }
    return Number(split.value);
  };

  const getRemainingAmount = (item: Item): number => {
    const totalSplitAmount = item.splits.reduce(
      (total, split) => total + calculateSplitAmount(item, split),
      0,
    );
    return Number(item.price) - totalSplitAmount;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
              <div className="flex-auto">
                <input
                  type="text"
                  placeholder="Item name"
                  value={item.name}
                  onChange={(event) => {
                    onUpdateItem(item.id, { name: event.target.value });
                  }}
                  className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-32">
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(event) => {
                    if (parseInt(event.target.value) < 0) return;

                    onUpdateItem(item.id, { price: parseFloat(event.target.value) || "" });
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
                    placeholder={item.discount.type === "percentage" ? "%" : "$"}
                    value={item.discount.value}
                    onChange={(event) => {
                      if (parseInt(event.target.value) < 0) return;

                      if (item.discount.type === "percentage" && parseInt(event.target.value) > 100)
                        return;

                      if (
                        item.discount.type === "amount" &&
                        parseInt(event.target.value) > Number(item.price)
                      )
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

            {people.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 flex items-center gap-2">
                  <Users className="size-5 text-gray-500" />
                  <h3 className="font-medium">Split Type</h3>
                  <div className="ml-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={item.hasCustomSplit}
                        onChange={(event) => {
                          toggleCustomSplit(item.id, event.target.checked);
                        }}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-600">Custom split</span>
                    </label>
                  </div>
                </div>

                {item.hasCustomSplit ? (
                  <>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {people.map((person) => {
                        const split = item.splits.find((split) => split.personId === person.id);

                        return (
                          <div key={person.id} className="flex items-center gap-2">
                            <span className="min-w-[100px] text-sm text-gray-600">
                              {person.name || "Unnamed"}
                            </span>
                            <select
                              value={split?.type}
                              onChange={(event) => {
                                // const currentValue = split?.value ?? 0;

                                handleUpdateSplit(
                                  item.id,
                                  person.id,
                                  event.target.value as "percentage" | "amount",
                                  // currentValue,
                                  "",
                                );
                              }}
                              className="rounded-lg border px-2 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="percentage">%</option>
                              <option value="amount">$</option>
                            </select>
                            <input
                              type="number"
                              value={split?.value ?? ""}
                              onChange={(event) => {
                                if (parseFloat(event.target.value) < 0) return;

                                if (
                                  parseFloat(event.target.value) > Number(item.price) &&
                                  split?.type === "amount"
                                )
                                  return;

                                if (
                                  parseFloat(event.target.value) > 100 &&
                                  split?.type === "percentage"
                                )
                                  return;

                                handleUpdateSplit(
                                  item.id,
                                  person.id,
                                  split?.type ?? "percentage",
                                  parseFloat(event.target.value) || 0,
                                );
                              }}
                              placeholder="0"
                              className="w-24 rounded-lg border px-2 py-1 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                            {split && (
                              <span className="text-sm text-gray-500">
                                (${calculateSplitAmount(item, split).toFixed(2)})
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">
                        Remaining: ${getRemainingAmount(item).toFixed(2)}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    This item will be split equally between all people ($
                    {(
                      getPriceWithDiscount(item.price, item.discount.value, item.discount.type) /
                      people.length
                    ).toFixed(2)}{" "}
                    each)
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
