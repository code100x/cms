'use client';

import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  return (
    <div>
      <Card className="mx-auto w-full max-w-6xl overflow-y-auto lg:mt-10">
        <CardHeader>
          <CardTitle>Create a new course</CardTitle>
          <CardDescription>Fill in the course details below</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-4 pt-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 lg:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Course name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Image url</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the url of Image" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the Description of course"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Course slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Course ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adminSecret"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Admin Secret</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the Admin Secret" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appxCourseId"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>app x course id</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the appx course ID"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discordRoleId"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Discord Role Id</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the Discord Role Id"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="lg:col-span-2">
                {isLoading ? (
                  <Button>Loading...</Button>
                ) : (
                  <Button type="submit">Create</Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="mx-auto w-full max-w-6xl overflow-y-auto lg:mt-10">
        <CardHeader>
          <CardTitle>Allow user another account in cohort 3</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 p-4 pt-0">
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="text"
            placeholder="Admin Password"
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              axios.post('/api/admin/discordReset', {
                email,
                adminPassword,
              });
            }}
          >
            Reset
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
