import React, { useState } from 'react';
import Link from 'next/link';
import { Article, ArticlesResponse } from '@/lib/types/article';
import { articlesApiClient } from '@/lib/api/articles';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye, Archive, Send } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface ArticleTableProps {
  articles: Article[];
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  onArchive: (id: string) => void;
}

const ArticleTable: React.FC<ArticleTableProps> = ({
  articles,
  onDelete,
  onPublish,
  onArchive,
}) => {
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="destructive">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Published</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <TableRow key={article.id}>
            <TableCell className="font-medium">{article.title}</TableCell>
            <TableCell>{article.authorName}</TableCell>
            <TableCell>{getStatusBadge(article.status)}</TableCell>
            <TableCell>
              {format(new Date(article.createdAt), 'MMM dd, yyyy')}
            </TableCell>
            <TableCell>
              {article.publishedAt
                ? format(new Date(article.publishedAt), 'MMM dd, yyyy')
                : '-'}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => router.push(`/admin/articles/${article.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/admin/articles/${article.id}/edit`)
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {article.status === 'draft' && (
                    <DropdownMenuItem onClick={() => onPublish(article.id)}>
                      <Send className="mr-2 h-4 w-4" />
                      Publish
                    </DropdownMenuItem>
                  )}
                  {article.status !== 'archived' && (
                    <DropdownMenuItem onClick={() => onArchive(article.id)}>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={() => onDelete(article.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ArticleTable;