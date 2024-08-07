import React from 'react';

export default function QuestionLayout(props: {
  children: React.ReactNode;
  question: React.ReactNode;
  answers: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.question}
      <hr className="mt-5" />
      {props.answers}
    </>
  );
}
