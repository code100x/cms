import React from 'react';

export default function QuestionLayout(props: {
  children: React.ReactNode;
  question: React.ReactNode;
  answers: React.ReactNode;
}) {
  return (
    <div>
      {props.children}
      {props.question}
      {props.answers}
    </div>
  );
}
