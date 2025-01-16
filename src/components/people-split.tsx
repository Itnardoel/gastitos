import { type Item, type Person } from "@/types";
import { UserPlus } from "./icons/user-plus";
import { Wallet } from "./icons/wallet";
import { UserX } from "./icons/user-x";

interface PeopleSplitsProps {
  people: Person[];
  items: Item[];
  totalPrice: () => number;
  onAddPerson: () => void;
  onRemovePerson: (id: string) => void;
  onUpdatePerson: (id: string, updates: Partial<Person>) => void;
  onUpdatePayment: (personId: string, amount: number | "") => void;
}

export const PeopleSplit = ({
  // items,
  people,
  totalPrice,
  onAddPerson,
  onRemovePerson,
  onUpdatePayment,
  onUpdatePerson,
}: PeopleSplitsProps) => {
  const equalShare = totalPrice() / people.length;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">People</h2>
        <button
          onClick={onAddPerson}
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
        >
          <UserPlus className="size-5" />
          Add Person
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <div key={person.id} className="rounded-lg bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Name"
                value={person.name}
                onChange={(event) => {
                  onUpdatePerson(person.id, { name: event.target.value });
                }}
                className="w-full rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  onRemovePerson(person.id);
                }}
                className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
              >
                <UserX className="size-5" />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-gray-500" />
                <input
                  type="number"
                  placeholder="Amount paid"
                  value={person.amountPaid}
                  onChange={(event) => {
                    if (parseFloat(event.target.value) < 0) return;

                    if (parseFloat(event.target.value) > totalPrice()) {
                      onUpdatePayment(person.id, totalPrice());
                      return;
                    }

                    onUpdatePayment(person.id, parseFloat(event.target.value) || "");
                  }}
                  className="flex-1 rounded-lg border px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="text-sm text-gray-600">
                <p>Equal share: ${equalShare.toFixed(2)}</p>
                <p>Amount paid: ${Number(person.amountPaid).toFixed(2)}</p>
                <p
                  className={`${Number(person.amountPaid) >= equalShare ? "text-green-600" : "text-red-600"} ${totalPrice() === 0 ? "invisible" : ""}`}
                >
                  {Number(person.amountPaid) >= equalShare
                    ? "Fully paid"
                    : `Remaining: $${(equalShare - Number(person.amountPaid)).toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
