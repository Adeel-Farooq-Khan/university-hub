import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<'teacher' | 'student' | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-elevated"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Uni<span className="gradient-text">Board</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Your gateway to academic announcements and resources
          </p>
        </motion.div>

        {/* Role Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 w-full max-w-2xl mb-8"
        >
          {/* Teacher Card */}
          <motion.button
            onClick={() => setSelectedRole('teacher')}
            className={`relative p-8 rounded-2xl text-left transition-all duration-300 group ${
              selectedRole === 'teacher'
                ? 'bg-card shadow-elevated ring-2 ring-primary'
                : 'bg-card/80 backdrop-blur-xl shadow-card hover:shadow-elevated'
            }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            {selectedRole === 'teacher' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            )}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Teacher</h3>
            <p className="text-muted-foreground text-sm">
              Post announcements, upload assignments, and manage your courses
            </p>
          </motion.button>

          {/* Student Card */}
          <motion.button
            onClick={() => setSelectedRole('student')}
            className={`relative p-8 rounded-2xl text-left transition-all duration-300 group ${
              selectedRole === 'student'
                ? 'bg-card shadow-elevated ring-2 ring-primary'
                : 'bg-card/80 backdrop-blur-xl shadow-card hover:shadow-elevated'
            }`}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            {selectedRole === 'student' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            )}
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Student</h3>
            <p className="text-muted-foreground text-sm">
              View announcements, download assignments, and stay updated
            </p>
          </motion.button>
        </motion.div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="hero"
            size="xl"
            onClick={handleLogin}
            disabled={!selectedRole}
            className="group"
          >
            Continue as {selectedRole ? selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1) : '...'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          Demo version with sample data
        </motion.p>
      </div>
    </div>
  );
};

export default Login;