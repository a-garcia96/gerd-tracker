import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { db } from "../../firebase/firebase";
import Link from "next/link";

const DataTable = ({ mealData }) => {
  const router = useRouter();

  const handleDelete = async (e) => {
    let key = e.target.parentElement.parentElement.getAttribute("data-key");
    await deleteDoc(doc(db, "PHDiary", key));
    router.reload();
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr className="text-left">
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Start Time
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                End Time
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Full Meal
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Comments
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {mealData.map((entry, index) => {
              let isOdd = index % 2 !== 0;
              let startDate = new Date(
                entry.data.startTime.seconds * 1000
              ).toDateString();
              let endDate = new Date(
                entry.data.endTime.seconds * 1000
              ).toDateString();
              let startTime = new Date(
                entry.data.startTime.seconds * 1000
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              let endTime = new Date(
                entry.data.endTime.seconds * 1000
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

              if (isOdd) {
                return (
                  <tr
                    data-key={entry.id}
                    key={entry.id}
                    className="odd:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {startDate + " " + startTime}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {endDate + " " + endTime}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {entry.data.fullMeal == true ? "yes" : "no"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {entry.data.comments}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex gap-x-4">
                      <button
                        className="block rounded-lg bg-red-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring"
                        type="button"
                        onClick={handleDelete}
                      >
                        X
                      </button>
                      <button className="block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-600 focus:outline-none focus:ring">
                        <Link
                          className="block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-600 focus:outline-none focus:ring"
                          href={{
                            pathname: "/meal-log/update",
                            query: { entry: entry.id },
                          }}
                        >
                          edit
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              } else {
                return (
                  <tr
                    data-key={entry.id}
                    key={entry.id}
                    className="odd:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {startDate + " " + startTime}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {endDate + " " + endTime}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {entry.data.fullMeal == true ? "yes" : "no"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {entry.data.comments}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex gap-x-4">
                      <button
                        className="block rounded-lg bg-red-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600 focus:outline-none focus:ring"
                        type="button"
                        onClick={handleDelete}
                      >
                        X
                      </button>
                      <button className="block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-600 focus:outline-none focus:ring">
                        <Link
                          className="block rounded-lg bg-gray-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-600 focus:outline-none focus:ring"
                          href={{
                            pathname: "/meal-log/update",
                            query: { entry: entry.id },
                          }}
                        >
                          edit
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
