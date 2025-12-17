export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'announcement' | 'assignment' | 'event' | 'urgent';
  author: string;
  authorRole: string;
  department: string;
  createdAt: string;
  dueDate?: string;
  attachments?: {
    name: string;
    type: 'pdf' | 'doc' | 'image' | 'zip';
    size: string;
  }[];
  image?: string;
}

export const departments = [
  'Computer Science',
  'Physics',
  'Mathematics',
  'Engineering',
  'Business',
  'Arts & Humanities',
  'Biology',
  'Chemistry',
];

export const categories = [
  { value: 'announcement', label: 'Announcement', color: 'bg-info' },
  { value: 'assignment', label: 'Assignment', color: 'bg-warning' },
  { value: 'event', label: 'Event', color: 'bg-success' },
  { value: 'urgent', label: 'Urgent', color: 'bg-destructive' },
];