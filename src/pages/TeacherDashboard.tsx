import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Bell, 
  FileText, 
  Users, 
  TrendingUp,
  Upload,
  X,
  Image,
  File,
  Send
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import AnnouncementCard from '@/components/AnnouncementCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sampleAnnouncements, categories, departments, Announcement } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';

const TeacherDashboard = () => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleAnnouncements);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    department: '',
    dueDate: '',
  });
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const myAnnouncements = announcements.filter(a => a.author === 'Dr. Sarah Mitchell');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category as Announcement['category'],
      author: 'Dr. Sarah Mitchell',
      authorRole: 'Dean of Academics',
      department: formData.department,
      createdAt: new Date().toISOString(),
      dueDate: formData.dueDate || undefined,
      attachments: attachedFiles.map(f => ({
        name: f.name,
        type: f.type.includes('pdf') ? 'pdf' : f.type.includes('image') ? 'image' : 'doc',
        size: `${(f.size / 1024).toFixed(1)} KB`,
      })),
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: '', content: '', category: '', department: '', dueDate: '' });
    setAttachedFiles([]);
    setShowCreateForm(false);

    toast({
      title: "Announcement Posted! 🎉",
      description: "Your announcement has been published successfully.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  return (
    <DashboardLayout role="teacher">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Teacher Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your announcements and assignments
          </p>
        </div>
        <Button
          variant="gradient"
          size="lg"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="gap-2"
        >
          {showCreateForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showCreateForm ? 'Cancel' : 'New Post'}
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Posts', value: myAnnouncements.length, icon: Bell, color: 'from-primary to-primary/70' },
          { label: 'Assignments', value: myAnnouncements.filter(a => a.category === 'assignment').length, icon: FileText, color: 'from-warning to-warning/70' },
          { label: 'Students Reached', value: '2.4K', icon: Users, color: 'from-success to-success/70' },
          { label: 'Engagement', value: '89%', icon: TrendingUp, color: 'from-accent to-accent/70' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-card rounded-2xl p-5 shadow-card"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Create Form */}
      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-card rounded-2xl p-6 shadow-elevated mb-8"
        >
          <h2 className="text-xl font-bold text-foreground mb-6">Create New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
                  required
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date (optional)</Label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write your announcement content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                rows={5}
                className="resize-none"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <Label>Attachments</Label>
              <div className="flex flex-wrap gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload files</span>
                  </div>
                </label>

                {attachedFiles.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-secondary"
                  >
                    {file.type.includes('image') ? (
                      <Image className="w-4 h-4 text-primary" />
                    ) : (
                      <File className="w-4 h-4 text-primary" />
                    )}
                    <span className="text-sm text-foreground max-w-32 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="secondary" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="gradient" className="gap-2">
                <Send className="w-4 h-4" />
                Publish Post
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* My Posts */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-6">Recent Posts</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {announcements.slice(0, 6).map((announcement, index) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              index={index}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;