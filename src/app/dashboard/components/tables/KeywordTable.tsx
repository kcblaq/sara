import React from 'react';

interface TableProps {
  data: {
    id: number;
    keyword: string;
    rank: string;
    change: React.ReactNode;
  }[];
}

const KeywordTable: React.FC<TableProps> = ({ data }) => {
  return (
    // <div className="rounded-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Top keywords
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Current Rank Position
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Changes in Rank Position
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{item.keyword}</td>
              <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{item.rank}</td>
              <td className="px-6 py-4 whitespace-nowrap truncate max-w-xs">{item.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    // </div>
  );
};

export default KeywordTable;
