export function TableNoData({ searchQuery }: { searchQuery: string }) {
  return (
    <tr>
      <td
        colSpan={7} 
        className="py-12 text-center text-gray-500 text-sm"
      >
        No results found for{" "}
        <span className="font-medium">"{searchQuery}"</span>
      </td>
    </tr>
  );
}
