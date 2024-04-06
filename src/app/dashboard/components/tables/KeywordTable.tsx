import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";

interface TableProps {
  data: {
    id: number;
    keyword: string;
    rank: string;
    change: React.ReactNode;
  }[];
}

const KeywordTable: React.FC<TableProps> = ({ data }) => {
  const keywords = useSelector((state: RootState) => state.performance.metrics?.history.keyword);

  return (
    <table className="min-w-full divide-y divide-gray-200 border">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Top keywords
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Current Rank Position
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Changes in Rank Position
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {keywords &&
          Object.entries(keywords).map(([keyword, items]) => (
            <tr key={keyword}>
              <td className="px-6 py-4 whitespace-nowrap truncate max-w-[200px]">{keyword}</td>
              {items.map((item: any, index: number) => (
                <React.Fragment key={index}>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-[300px]">{item.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap truncate max-w-[300px]">{item.totalResult}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default KeywordTable;
