import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formatTime } from '@/utiles/VideoTimeFormat';
import { Textarea } from '@/components/ui/textarea';
import { useRecoilState } from 'recoil';
import { modalState } from '@/store/atoms/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  description: z.string().optional(),
});

interface BookmarkCreate {
  contentId: number;
  timestamp: number;
  title: string;
  description: string | undefined;
}

export function CreateBookmark() {
  const queryClient = useQueryClient();
  const [modal, setModal] = useRecoilState(modalState);

  const isOpen = modal.open && modal.type === 'CreateVideoBookmark';

  const onClose = () => {
    setModal({
      open: false,
      type: null,
      data: {},
    });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const createBookmark = async (postData: BookmarkCreate) => {
    const url = '/api/course/timestampBookmark';
    const { data: response } = await axios.post(url, postData);
    return response.data;
  };
  const { mutate } = useMutation({
    mutationFn: (postData: BookmarkCreate) => createBookmark(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['fetch-videoTimestamp-bookmark'],
      });
      toast.success('Bookmark created!', {
        style: {
          borderRadius: '10px',
          background: '#000',
          color: '#fff',
        },
      });
      form.reset();
      onClose();
    },
    onError: () => {
      toast.error('Please try again.', {
        style: {
          borderRadius: '10px',
          background: '#000',
          color: '#fff',
        },
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const postData: BookmarkCreate = {
      contentId: Number(modal?.data.contentId),
      timestamp: Number(modal?.data.bookmarkedTime),
      title: values.title,
      description: values.description,
    };
    mutate(postData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Bookmark</DialogTitle>
          <DialogDescription>
            Create bookmark at timestamp{' '}
            {formatTime(modal?.data && modal.data.bookmarkedTime)}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2">Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Bookmark title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel className="mb-2">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Bookmark description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="!text-white"
                disabled={isLoading}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
