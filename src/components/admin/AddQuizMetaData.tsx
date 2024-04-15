import { useEffect, useState } from 'react';

import AddQues, { FormInput } from '../AddQues';

export function AddQuizMetadata({
  onChange,
}: {
  onChange: (metadata: any) => void;
}) {
  const [questions, setQuestions] = useState<FormInput[]>([]);

  const onAdd = (ques: FormInput) => {
    setQuestions((prev) => [...prev, ques]);
  };
  useEffect(() => {
    onChange({ questions });
  }, [questions]);

  return (
    <div className="py-2 ">
      <table className="min-w-full p-2 w-auto  divide-gray-200">
        <thead className="">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Question
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Option 1
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Option 2
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Option 3
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Option 4
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Reason
            </th>
          </tr>
        </thead>

        <tbody>
          {questions.length > 0 ? (
            questions.map((item: FormInput, index) => (
              <tr key={index}>
                <td scope="col" className="">
                  {item.content}
                </td>
                <td
                  className={`${item.answer === 'option1' ? 'text-red-300' : ''}`}
                >
                  {item.option1}
                </td>
                <td
                  className={`${item.option2 === item.answer ? 'text-red-300' : ''}`}
                >
                  {item.option2}
                </td>
                <td
                  className={`${item.option3 === item.answer ? 'text-red-300' : ''}`}
                >
                  {item.option3}
                </td>
                <td
                  className={`${item.option4 === item.answer ? 'text-red-300' : ''}`}
                >
                  {item.option4}
                </td>
                <td>{item.reason}</td>
              </tr>
            ))
          ) : (
            <tr>Add question to preview</tr>
          )}
        </tbody>
      </table>
      <AddQues onAdd={onAdd} />
    </div>
  );
}
