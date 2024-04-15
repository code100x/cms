import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';

export type FormInput = {
  content: string;
  reason: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
};

const AddQues = ({ onAdd }: { onAdd: (ques: FormInput) => void }) => {
  const { register, handleSubmit, reset } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <div className="p-4 border rounded-md shadow-lg">
      <p className="text-center my-5 text-2xl">Add Question</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col  p-4  gap-5"
      >
        <Textarea
          id="content"
          placeholder="Enter question"
          required
          {...register('content', { required: true })}
        />

        <div className="grid gap-2 grid-cols-2 md:grid-col-1">
          <div className="flex gap-2">
            <Input
              className="dark:text-white text-black"
              type="text"
              placeholder="option 1"
              required
              {...register('option1', { required: true })}
            />
          </div>

          <div className="flex gap-2">
            <Input
              className="dark:text-white text-black"
              type="text"
              placeholder="option 2"
              required
              {...register('option2', { required: true })}
            />
          </div>

          <div className="flex gap-2">
            <Input
              className="dark:text-white text-black"
              type="text"
              placeholder="option 3"
              required
              {...register('option3', { required: true })}
            />
          </div>

          <div className="flex gap-2">
            <Input
              className="dark:text-white text-black"
              type="text"
              placeholder="option 4"
              required
              {...register('option4', { required: true })}
            />
          </div>

          <div className="flex gap-2">
            <select
              {...register('answer', { required: true })}
              className="dark:text-white text-black w-full p-2"
            >
              <option value="">Select answer</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
        </div>

        <Textarea
          id="reason"
          placeholder="Enter reason"
          required
          {...register('reason', { required: true })}
        />

        <div className="flex flex-1 w-full justify-center">
          <Button type="submit">Add Question</Button>
        </div>
      </form>
    </div>
  );
};

export default AddQues;
