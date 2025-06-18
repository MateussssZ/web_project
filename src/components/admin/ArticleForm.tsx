import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Article, ArticleCreatePayload, ArticleUpdatePayload } from '@/lib/types/article';

const articleFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(200).optional(),
  tags: z.string().optional(),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']),
});

type ArticleFormValues = z.infer<typeof articleFormSchema>;

interface ArticleFormProps {
  article?: Article;
  onSubmit: (values: ArticleCreatePayload | ArticleUpdatePayload) => Promise<void>;
  isSubmitting: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit,
  isSubmitting,
}) => {
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: article?.title || '',
      content: article?.content || '',
      excerpt: article?.excerpt || '',
      tags: article?.tags.join(', ') || '',
      imageUrl: article?.imageUrl || '',
      status: article?.status || 'draft',
    },
  });

  const handleSubmit = async (values: ArticleFormValues) => {
    const payload = {
      ...values,
      tags: values.tags ? values.tags.split(',').map(tag => tag.trim()) : [],
    };
    await onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Article title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Short description of the article"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief summary of the article (max 200 characters)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Article content"
                  className="min-h-[300px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="tag1, tag2, tag3"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Separate tags with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Article'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ArticleForm;