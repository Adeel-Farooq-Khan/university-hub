import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Bell, FileText, Calendar, TrendingUp } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import AnnouncementCard from '@/components/AnnouncementCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories, type Announcement } from '@/data/sampleData';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/auth/AuthProvider';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const { data: announcements = [] } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await apiFetch<{ announcements: Announcement[] }>('/announcements');
      return res.announcements;
    },
  });

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter(announcement => {
      const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.author.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || announcement.category === activeFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [announcements, searchQuery, activeFilter]);

  const stats = useMemo(() => ({
    total: announcements.length,
    assignments: announcements.filter(a => a.category === 'assignment').length,
    events: announcements.filter(a => a.category === 'event').length,
    urgent: announcements.filter(a => a.category === 'urgent').length,
  }), [announcements]);

  return (
    <DashboardLayout role="student">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {user?.fullName?.split(' ')[0] || 'Student'}! 👋
        </h1>
        <p className="text-muted-foreground">
          Stay updated with the latest announcements from your university
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Posts', value: stats.total, icon: Bell, color: 'from-primary to-primary/70' },
          { label: 'Assignments', value: stats.assignments, icon: FileText, color: 'from-warning to-warning/70' },
          { label: 'Events', value: stats.events, icon: Calendar, color: 'from-success to-success/70' },
          { label: 'Urgent', value: stats.urgent, icon: TrendingUp, color: 'from-destructive to-destructive/70' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-card rounded-2xl p-5 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-4 shadow-card mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search announcements, assignments, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-border bg-secondary/30"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setActiveFilter('all')}
              className="rounded-full"
            >
              <Filter className="w-4 h-4 mr-1" />
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeFilter === category.value ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveFilter(category.value)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Announcements Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement, index) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              index={index}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-16"
          >
            <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;