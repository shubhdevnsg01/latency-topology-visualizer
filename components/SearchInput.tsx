// components/ControlPanel/SearchInput.tsx
export function SearchInput() {
  return (
    <div>
      <label className="block font-medium mb-1">Search Exchange / Region</label>
      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
