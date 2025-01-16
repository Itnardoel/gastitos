interface SummaryProps {
  itemsQuantity: number;
  peopleQuantity: number;
  totalPrice: () => number;
}

export const Summary = ({ itemsQuantity, peopleQuantity, totalPrice }: SummaryProps) => {
  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">Summary</h2>
      <div className="space-y-4">
        <div>
          <p className="text-lg">
            Total items: <span className="font-medium">{itemsQuantity}</span>
          </p>
          <p className="text-lg">
            Total amount: <span className="font-medium">${totalPrice().toFixed(2)}</span>
          </p>
          <p className="text-lg">
            People involved: <span className="font-medium">{peopleQuantity}</span>
          </p>
        </div>
      </div>
    </>
  );
};
