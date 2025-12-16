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

export const sampleAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Final Exam Schedule Released',
    content: 'The final examination schedule for the Fall 2024 semester has been released. Please check your respective department portals for detailed timings and room allocations. Make sure to bring your student ID cards to the examination hall.',
    category: 'urgent',
    author: 'Dr. Sarah Mitchell',
    authorRole: 'Dean of Academics',
    department: 'Academic Affairs',
    createdAt: '2024-12-15T09:00:00Z',
    attachments: [
      { name: 'exam_schedule_fall_2024.pdf', type: 'pdf', size: '2.4 MB' },
    ],
  },
  {
    id: '2',
    title: 'Machine Learning Assignment #4',
    content: 'Complete the neural network implementation using PyTorch. The assignment covers backpropagation, gradient descent optimization, and model evaluation metrics. Submit your code along with a detailed report explaining your approach.',
    category: 'assignment',
    author: 'Prof. James Chen',
    authorRole: 'Associate Professor',
    department: 'Computer Science',
    createdAt: '2024-12-14T14:30:00Z',
    dueDate: '2024-12-28T23:59:00Z',
    attachments: [
      { name: 'assignment_4_instructions.pdf', type: 'pdf', size: '1.2 MB' },
      { name: 'starter_code.zip', type: 'zip', size: '5.8 MB' },
    ],
  },
  {
    id: '3',
    title: 'Annual Tech Symposium 2024',
    content: 'Join us for the annual technology symposium featuring keynote speakers from leading tech companies. Topics include AI, blockchain, quantum computing, and sustainable technology. Registration is now open!',
    category: 'event',
    author: 'Tech Club',
    authorRole: 'Student Organization',
    department: 'Student Affairs',
    createdAt: '2024-12-13T11:00:00Z',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
  },
  {
    id: '4',
    title: 'Library Extended Hours During Finals',
    content: 'The university library will operate 24/7 during the final examination period from December 20th to January 5th. Additional study rooms have been opened on the 3rd floor. Free coffee will be available at the student lounge.',
    category: 'announcement',
    author: 'Library Services',
    authorRole: 'Administration',
    department: 'Campus Services',
    createdAt: '2024-12-12T16:00:00Z',
  },
  {
    id: '5',
    title: 'Research Paper Submission - Advanced Algorithms',
    content: 'Submit your research paper on algorithmic complexity analysis. The paper should be 8-10 pages, following IEEE format. Include abstract, methodology, results, and conclusions sections.',
    category: 'assignment',
    author: 'Dr. Emily Roberts',
    authorRole: 'Professor',
    department: 'Computer Science',
    createdAt: '2024-12-11T10:00:00Z',
    dueDate: '2024-12-30T23:59:00Z',
    attachments: [
      { name: 'ieee_template.doc', type: 'doc', size: '890 KB' },
      { name: 'submission_guidelines.pdf', type: 'pdf', size: '456 KB' },
    ],
  },
  {
    id: '6',
    title: 'Campus WiFi Maintenance Notice',
    content: 'Scheduled maintenance on campus WiFi infrastructure will occur this Saturday from 2 AM to 6 AM. Please save your work and expect intermittent connectivity during this period.',
    category: 'announcement',
    author: 'IT Department',
    authorRole: 'Technical Services',
    department: 'IT Services',
    createdAt: '2024-12-10T08:00:00Z',
  },
  {
    id: '7',
    title: 'Winter Break Internship Fair',
    content: 'Top companies are coming to campus for our winter internship fair! Bring your resume and prepare for on-spot interviews. Companies include Google, Microsoft, Amazon, and 50+ startups.',
    category: 'event',
    author: 'Career Services',
    authorRole: 'Career Center',
    department: 'Student Development',
    createdAt: '2024-12-09T13:00:00Z',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop',
  },
  {
    id: '8',
    title: 'Physics Lab Report - Quantum Mechanics',
    content: 'Document your findings from the double-slit experiment. Include wave function calculations, interference pattern analysis, and discuss the implications of quantum superposition.',
    category: 'assignment',
    author: 'Prof. Michael Torres',
    authorRole: 'Department Head',
    department: 'Physics',
    createdAt: '2024-12-08T09:30:00Z',
    dueDate: '2024-12-22T17:00:00Z',
    attachments: [
      { name: 'lab_data_sets.zip', type: 'zip', size: '12.3 MB' },
    ],
  },
];

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