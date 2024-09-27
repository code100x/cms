'use client';

import React from 'react';
import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FormPostErrors } from './form-errors';

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const FormPostInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = '',
      onKeyUp,
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="flex w-full flex-col gap-2">
        <div className="w-full">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-500"
            >
              {label}
            </Label>
          ) : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            required={required}
            name={id}
            id={id}
            onKeyUp={onKeyUp}
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn(
              'focus:ring-none rounded-lg border-none bg-primary/5 px-4 text-base focus:outline-none',
              className,
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormPostErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormPostInput.displayName = 'FormPostInput';
