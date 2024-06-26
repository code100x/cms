'use client';

import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

import { cn } from '@repo/common/lib/utils';
import { Label } from '@repo/ui/shad/label';
import { Input } from '@repo/ui/shad/input';
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
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              htmlFor={id}
              className="text-xs font-semibold text-neutral-700"
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
            placeholder={placeholder}
            type={type}
            disabled={pending || disabled}
            className={cn('h-7 px-2 py-1 text-sm', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormPostErrors id={id} errors={errors} />
      </div>
    );
  },
);

FormPostInput.displayName = 'FormPostInput';
