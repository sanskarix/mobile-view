import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ScrollText, CalendarCheck, MoreHorizontal } from 'lucide-react';

export const BottomNavigation = () => {
  const navigationItems = [
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
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};