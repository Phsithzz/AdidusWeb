import { RxCross2 } from "react-icons/rx";

const sizes = [
  {
    label: "US - ผู้ชาย",
    values: [
      3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5,
      12, 12.5, 13,
    ],
  },
  {
    label: "US - ผู้หญิง",
    values: [
      5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13,
      13.5, 14, 14.5,
    ],
  },
  {
    label: "UK",
    values: [
      3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
      11.5, 12, 12.5,
    ],
  },
  {
    label: "ซม. / ญี่ปุ่น",
    values: [
      22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29,
      29.5, 30, 30.5, 31, 31.5, 32,
    ],
  },
  {
    label: "EU",
    values: [
      35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5,
      45, 45.5, 46, 47, 47.5,
    ],
  },
  {
    label: "ความยาวเท้า (ซม.)",
    values: [
      21.6, 22, 22.4, 22.9, 23.3, 23.7, 24.1, 24.5, 25, 25.4, 25.8, 26.2, 26.7,
      27.1, 27.5, 27.9, 28.3, 28.8, 29.2, 29.6,
    ],
  },
];

const SizeShoe = ({ onCancel }) => {
  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl mx-auto p-6">
      <div className="flex justify-between flex-wrap items-center mb-6">
        <h1 className="text-2xl font-semibold">ตารางไซส์</h1>
        <RxCross2
          className="text-2xl cursor-pointer hover:text-red-500 transition-colors"
          onClick={onCancel}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="border border-gray-300 rounded-lg text-center w-full min-w-[800px]">
          <tbody>
            {sizes.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="font-semibold p-3 border bg-gray-100 w-40 min-w-[150px]">
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className="border p-3 min-w-[70px] h-[60px] text-center align-middle text-gray-700"
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeShoe;
