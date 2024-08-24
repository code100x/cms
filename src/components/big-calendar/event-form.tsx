import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DialogFooter } from '@/components/ui/dialog';

export const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  start: z.date(),
  startTime: z.string(),
  end: z.date(),
  endTime: z.string(),
  videoLink: z.string().nullable(),
  notes: z.string().nullable(),
});

export type FormValues = z.infer<typeof formSchema>;

interface EventFormProps {
  form: UseFormReturn<FormValues>;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  isEditMode: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  form,
  onSubmit,
  onDelete,
  isEditMode,
}) => {
  const DateTimeField: React.FC<{
    dateFieldName: 'start' | 'end';
    timeFieldName: 'startTime' | 'endTime';
    label: string;
  }> = ({ dateFieldName, timeFieldName, label }) => (
    <div className="flex space-x-4">
      <FormField
        control={form.control}
        name={dateFieldName}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>{label} Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date('1900-01-01')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={timeFieldName}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>{label} Time</FormLabel>
            <FormControl>
              <Input type="time" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DateTimeField
          dateFieldName="start"
          timeFieldName="startTime"
          label="Start"
        />
        <DateTimeField
          dateFieldName="end"
          timeFieldName="endTime"
          label="End"
        />

        <FormField
          control={form.control}
          name="videoLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value || null)}
                  className="h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button type="submit" className="mb-2 w-full sm:mb-0 sm:w-auto">
            {isEditMode ? 'Update Event' : 'Add Event'}
          </Button>
          {isEditMode && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={onDelete}
              className="w-full sm:w-auto"
            >
              Delete Event
            </Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EventForm;
