// import { Receipt } from "./icons/receipt";

export const Header = () => {
  return (
    <>
      <header className="mb-8 flex items-center gap-3 px-4">
        <img src="logo.webp" alt="cat logo" className="h-auto w-10" />
        {/* <Receipt className="size-8 text-blue-600" /> */}
        <h1 className="text-3xl font-bold text-gray-900">Cuentitas</h1>
      </header>
    </>
  );
};
