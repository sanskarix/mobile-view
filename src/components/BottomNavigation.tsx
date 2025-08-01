import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ScrollText, CalendarCheck, MoreHorizontal } from 'lucide-react';

export const BottomNavigation = () => {
  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Event Types',
      href: '/event-types',
      icon: ScrollText,
    },
    {
      name: 'Bookings',
      href: '/bookings',
      icon: CalendarCheck,
    },
    {
      name: 'More',
      href: '/more',
      icon: MoreHorizontal,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden">
      <div className="grid grid-cols-4 h-16">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
