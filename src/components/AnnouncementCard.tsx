import { motion } from 'framer-motion';
import { Calendar, Clock, Download, FileText, Image, Archive, User, Building2 } from 'lucide-react';
import { Announcement, categories } from '@/data/sampleData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AnnouncementCardProps {
  announcement: Announcement;
  index: number;
}

const fileIcons = {
  pdf: FileText,
  doc: FileText,
  image: Image,
  zip: Archive,
};

const AnnouncementCard = ({ announcement, index }: AnnouncementCardProps) => {
  const category = categories.find(c => c.value === announcement.category);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group bg-card rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden"
    >
      {/* Image Banner */}
      {announcement.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <Badge 
            variant="secondary" 
            className={`${category?.color} text-primary-foreground font-medium px-3 py-1`}
          >
            {category?.label}
          </Badge>
          {announcement.dueDate && (
            <div className="flex items-center gap-1.5 text-sm text-destructive font-medium">
              <Clock className="w-4 h-4" />
              Due: {formatDate(announcement.dueDate)}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {announcement.title}
        </h3>

        {/* Content */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {announcement.content}
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-secondary/50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">{announcement.author}</p>
            <p className="text-xs text-muted-foreground truncate">{announcement.authorRole}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Building2 className="w-3.5 h-3.5" />
            <span className="truncate max-w-20">{announcement.department}</span>
          </div>
        </div>

        {/* Attachments */}
        {announcement.attachments && announcement.attachments.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Attachments
            </p>
            <div className="flex flex-wrap gap-2">
              {announcement.attachments.map((file, i) => {
                const Icon = fileIcons[file.type];
                return (
                  <Button
                    key={i}
                    variant="glass"
                    size="sm"
                    className="gap-2 text-xs"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="truncate max-w-24">{file.name}</span>
                    <Download className="w-3 h-3 opacity-50" />
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(announcement.createdAt)} at {formatTime(announcement.createdAt)}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default AnnouncementCard;