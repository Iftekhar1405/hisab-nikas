
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, PieChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border py-2 px-6 sm:py-4 animate-slide-up">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <NavItem
          to="/"
          icon={<LayoutDashboard size={24} />}
          label="Dashboard"
          isActive={isActive('/')}
        />
        <NavItem
          to="/reports"
          icon={<PieChart size={24} />}
          label="Reports"
          isActive={isActive('/reports')}
        />
        <NavItem
          to="/settings"
          icon={<Settings size={24} />}
          label="Settings"
          isActive={isActive('/settings')}
        />
      </div>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center justify-center px-4 py-2 rounded-lg transition-all-fast",
        isActive 
          ? "text-primary font-medium bg-primary/10" 
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
      )}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs">{label}</span>
    </Link>
  );
};

export default Navbar;
