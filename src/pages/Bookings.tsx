
import React, { useState, useRef, useEffect } from 'react';
import { Filter, Download, Search, Calendar, MapPin, Video, MoreHorizontal, Edit, UserPlus, Clock, X, Bold, Italic, Underline, Strikethrough, List, ListOrdered, Undo, Redo, Check, Copy, Eye, ChevronDown, ChevronUp, Mail, Globe, Trash2, Info, CheckCircle, XCircle, Plus, Rocket, Zap, Users, Palette, Briefcase, CalendarDays, UserCheck, Smartphone, MessageSquare, TrendingUp, Target, FileText, Settings, Monitor, Lightbulb, Shield, Coffee, BookOpen, Star, Heart, Headphones, Globe2, Mic, Camera, Phone, Wifi, Database, Server, Code, GitBranch, Package, Layers, Cloud, HardDrive, Cpu, Memory, Network, Lock, Key, Award, Trophy, Medal, Flag, Compass, Map, Navigation, Route, Signpost, Home, Building, Store, Factory, School, Hospital, Church, Library, Museum, Theater, Stadium, Hotel, Restaurant, ShoppingBag, Car, Bus, Train, Plane, Ship, Bike, Truck, Tractor, Helicopter, Rocket as RocketIcon, Satellite, Anchor, Waves, Mountain, Tree, Flower, Sun, Moon, Star as StarIcon, Cloud as CloudIcon, Rain, Snow, Wind, Thermometer, Umbrella, Sunglasses, Shirt, Pants, Shoes, Hat, Glasses, Watch, Ring, Necklace, Earrings, Bracelet, Wallet, Purse, Backpack, Suitcase, Briefcase as BriefcaseIcon, Laptop, Desktop, Tablet, Smartphone as SmartphoneIcon, Headphones as HeadphonesIcon, Speaker, Microphone, Camera as CameraIcon, Printer, Scanner, Keyboard, Mouse, Monitor as MonitorIcon, Tv, Radio, Battery, Plug, Lightbulb as LightbulbIcon, Flashlight, Candle, Fire, Flame, Droplet, Snowflake, Leaf, Flower2, Sprout, Seedling, Cactus, PalmTree, Evergreen, Deciduous, Bamboo, Mushroom, Apple, Banana, Orange, Grape, Strawberry, Cherry, Peach, Pear, Pineapple, Watermelon, Lemon, Lime, Coconut, Avocado, Tomato, Carrot, Corn, Pepper, Eggplant, Broccoli, Cabbage, Lettuce, Spinach, Onion, Garlic, Potato, Bread, Cheese, Meat, Fish, Egg, Milk, Butter, Honey, Sugar, Salt, Oil, Vinegar, Spice, Herb, Tea, Coffee as CoffeeIcon, Juice, Water, Wine, Beer, Cocktail, Cake, Cookie, Donut, Icecream, Candy, Chocolate, Pizza, Hamburger, Hotdog, Sandwich, Salad, Soup, Pasta, Rice, Noodle, Sushi, Taco, Burrito, Fries, Popcorn, Pretzel, Bagel, Muffin, Pancake, Waffle, Cereal, Oatmeal, Yogurt, Smoothie, Shake, Lollipop, Gum, Mint, Pill, Bandage, Thermometer as ThermometerIcon, Stethoscope, Syringe, Pill as PillIcon, Bandage as BandageIcon, Mask, Gloves, Soap, Toothbrush, Toothpaste, Shampoo, Conditioner, Lotion, Perfume, Lipstick, Mascara, Eyeshadow, Blush, Foundation, Powder, Brush, Comb, Mirror, Scissors, Razor, Tweezers, Nail, Polish, File, Clippers, Towel, Washcloth, Sponge, Bucket, Mop, Broom, Vacuum, Dustpan, Trash, Recycle, Compost, Laundry, Detergent, Fabric, Softener, Iron, Hanger, Clothesline, Basket, Hamper, Drawer, Closet, Shelf, Rack, Hook, Hanger as HangerIcon, Box, Bag, Container, Jar, Bottle, Can, Package as PackageIcon, Wrapper, Label, Sticker, Tape, Glue, Stapler, Paperclip, Rubber, Band, Elastic, String, Rope, Chain, Wire, Cable, Cord, Plug as PlugIcon, Socket, Switch, Button, Knob, Handle, Lever, Wheel, Gear, Screw, Nail as NailIcon, Hammer, Wrench, Screwdriver, Pliers, Saw, Drill, Ruler, Measuring, Tape as TapeIcon, Level, Square, Triangle, Circle, Rectangle, Pentagon, Hexagon, Octagon, Diamond, Oval, Heart as HeartIcon, Star as StarIcon2, Arrow, Line, Curve, Angle, Point, Dot, Dash, Slash, Backslash, Underscore, Hyphen, Plus as PlusIcon, Minus, Multiply, Divide, Equals, Percent, Dollar, Euro, Pound, Yen, Cent, Degree, At, Hash, Ampersand, Asterisk, Question, Exclamation, Period, Comma, Semicolon, Colon, Apostrophe, Quote, Parenthesis, Bracket, Brace, Less, Greater, Pipe, Tilde, Caret, Grave, Acute, Circumflex, Diaeresis, Cedilla, Macron, Breve, Ring, Ogonek, Stroke, Double, Acute as AcuteIcon, Grave as GraveIcon, Circumflex as CircumflexIcon, Tilde as TildeIcon, Diaeresis as DiaeresisIcon, Ring as RingIcon, Cedilla as CedillaIcon, Macron as MacronIcon, Breve as BreveIcon, Ogonek as OgonekIcon, Stroke as StrokeIcon, Double as DoubleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';
import { Button } from '../components/ui/button';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Checkbox } from '../components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';
import { AddGuestsModal } from '../components/AddGuestsModal';
import { useToast } from '../hooks/use-toast';
import type { DateRange } from 'react-day-picker';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  attendees: Array<{
    name: string;
    email: string;
    avatar?: string;
    timezone?: string;
  }>;
  location: {
    type: 'online' | 'physical';
    name: string;
    address?: string;
    logo?: string;
  };
  notes?: string;
  eventType: string;
  status: 'upcoming' | 'unconfirmed' | 'recurring' | 'past' | 'canceled';
  recurringInfo?: string;
  isToday?: boolean;
  duration?: string;
  recurringDates?: string[];
  host?: string;
  isHost?: boolean;
  recurringSchedule?: {
    interval: number;
    totalMeetings: number;
    meetings: Array<{
      date: string;
      time: string;
      completed: boolean;
    }>;
  };
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Product Hunt Chats',
    date: 'Mon, 14 Jul',
    time: '9:00am',
    endTime: '9:30am',
    duration: '30 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Sanskar Yadav',
        email: 'sanskar@example.com',
        timezone: 'Asia/Calcutta'
      }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: 'Product Hunt Chats',
    status: 'upcoming',
    isToday: true
  },
  {
    id: '2',
    title: 'Discovery Call',
    date: 'Mon, 14 Jul',
    time: '2:00pm',
    endTime: '2:15pm',
    duration: '15 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Emily Rodriguez',
        email: 'emily.r@techcorp.com',
        timezone: 'America/New_York'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Discovery Call',
    status: 'upcoming',
    isToday: true
  },
  {
    id: '3',
    title: 'Team Strategy Session',
    date: 'Tue, 15 Jul',
    time: '10:00am',
    endTime: '11:00am',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Alex Chen',
        email: 'alex.chen@company.com',
        timezone: 'Asia/Singapore'
      },
      {
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com',
        timezone: 'Europe/Madrid'
      },
      {
        name: 'John Smith',
        email: 'john.smith@company.com',
        timezone: 'America/New_York'
      }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: 'Team Strategy Session',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '4',
    title: 'Design Review',
    date: 'Wed, 16 Jul',
    time: '2:00pm',
    endTime: '3:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@design.com',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'David Kim',
        email: 'david.kim@design.com',
        timezone: 'Asia/Seoul'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Design Review',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '5',
    title: 'Client Presentation',
    date: 'Thu, 17 Jul',
    time: '3:00pm',
    endTime: '4:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Michael Brown',
        email: 'michael.brown@client.com',
        timezone: 'America/Chicago'
      },
      {
        name: 'Lisa Johnson',
        email: 'lisa.johnson@client.com',
        timezone: 'America/Chicago'
      },
      {
        name: 'Robert Davis',
        email: 'robert.davis@client.com',
        timezone: 'America/Chicago'
      }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: 'Client Presentation',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '6',
    title: 'Product Demo',
    date: 'Fri, 18 Jul',
    time: '1:00pm',
    endTime: '2:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Jennifer Lee',
        email: 'jennifer.lee@prospect.com',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'Tom Wilson',
        email: 'tom.wilson@prospect.com',
        timezone: 'America/Los_Angeles'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Product Demo',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '7',
    title: 'Quarterly Review',
    date: 'Fri, 18 Jul',
    time: '4:00pm',
    endTime: '5:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Amanda Taylor',
        email: 'amanda.taylor@company.com',
        timezone: 'America/New_York'
      },
      {
        name: 'Kevin Zhang',
        email: 'kevin.zhang@company.com',
        timezone: 'Asia/Shanghai'
      },
      {
        name: 'Rachel Green',
        email: 'rachel.green@company.com',
        timezone: 'Europe/London'
      },
      {
        name: 'Mark Thompson',
        email: 'mark.thompson@company.com',
        timezone: 'America/Denver'
      }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: 'Quarterly Review',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '8',
    title: 'Marketing Campaign Review',
    date: 'Sat, 19 Jul',
    time: '10:00am',
    endTime: '11:00am',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Sophie Martinez',
        email: 'sophie.martinez@marketing.com',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'Oliver Johnson',
        email: 'oliver.johnson@marketing.com',
        timezone: 'Europe/London'
      },
      {
        name: 'Emma Williams',
        email: 'emma.williams@marketing.com',
        timezone: 'America/New_York'
      },
      {
        name: 'Lucas Brown',
        email: 'lucas.brown@marketing.com',
        timezone: 'Australia/Sydney'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Marketing Campaign Review',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '9',
    title: 'Technical Architecture Discussion',
    date: 'Sat, 19 Jul',
    time: '2:00pm',
    endTime: '3:30pm',
    duration: '90 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Daniel Rodriguez',
        email: 'daniel.rodriguez@tech.com',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'Isabella Chen',
        email: 'isabella.chen@tech.com',
        timezone: 'Asia/Singapore'
      },
      {
        name: 'Ethan Davis',
        email: 'ethan.davis@tech.com',
        timezone: 'America/Chicago'
      },
      {
        name: 'Ava Wilson',
        email: 'ava.wilson@tech.com',
        timezone: 'Europe/Berlin'
      },
      {
        name: 'Mason Taylor',
        email: 'mason.taylor@tech.com',
        timezone: 'America/New_York'
      }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: 'Technical Architecture Discussion',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '10',
    title: 'Customer Success Review',
    date: 'Sun, 20 Jul',
    time: '11:00am',
    endTime: '12:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Grace Anderson',
        email: 'grace.anderson@support.com',
        timezone: 'America/Denver'
      },
      {
        name: 'Nathan White',
        email: 'nathan.white@support.com',
        timezone: 'Europe/London'
      },
      {
        name: 'Chloe Garcia',
        email: 'chloe.garcia@support.com',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'Ryan Martinez',
        email: 'ryan.martinez@support.com',
        timezone: 'Asia/Tokyo'
      }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: 'Customer Success Review',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '11',
    title: 'Product Roadmap Planning',
    date: 'Sun, 20 Jul',
    time: '3:00pm',
    endTime: '4:30pm',
    duration: '90 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Logan Thompson',
        email: 'logan.thompson@product.com',
        timezone: 'America/New_York'
      },
      {
        name: 'Aria Johnson',
        email: 'aria.johnson@product.com',
        timezone: 'Europe/Paris'
      },
      {
        name: 'Carter Miller',
        email: 'carter.miller@product.com',
        timezone: 'America/Chicago'
      },
      {
        name: 'Zoe Davis',
        email: 'zoe.davis@product.com',
        timezone: 'Asia/Seoul'
      },
      {
        name: 'Eli Wilson',
        email: 'eli.wilson@product.com',
        timezone: 'Australia/Melbourne'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Product Roadmap Planning',
    status: 'upcoming',
    isToday: false
  },
  {
    id: '12',
    title: 'Sales Strategy Meeting',
    date: 'Mon, 21 Jul',
    time: '9:00am',
    endTime: '10:00am',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Liam Brown',
        email: 'liam.brown@sales.com',
        timezone: 'America/Los_Angeles'
      },
      {
        name: 'Maya Singh',
        email: 'maya.singh@sales.com',
        timezone: 'Asia/Mumbai'
      },
      {
        name: 'Jackson Lee',
        email: 'jackson.lee@sales.com',
        timezone: 'America/New_York'
      },
      {
        name: 'Luna Martinez',
        email: 'luna.martinez@sales.com',
        timezone: 'Europe/Madrid'
      }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: 'Sales Strategy Meeting',
    status: 'upcoming',
    isToday: false
  }
];

const unconfirmedMeetings: Meeting[] = [
  {
    id: 'unconf-1',
    title: 'Strategy Session',
    date: 'Tue, 15 Jul',
    time: '10:00am',
    endTime: '10:30am',
    duration: '30 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Alex Chen',
        email: 'alex.chen@startup.io',
        timezone: 'Asia/Singapore'
      }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: 'Strategy Session',
    status: 'unconfirmed',
    isToday: false
  },
  {
    id: 'unconf-2',
    title: 'Client Consultation',
    date: 'Wed, 16 Jul',
    time: '3:00pm',
    endTime: '4:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'Sarah Wilson',
        email: 'sarah.w@agency.co',
        timezone: 'America/Los_Angeles'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Client Consultation',
    status: 'unconfirmed',
    isToday: false
  }
];

const recurringMeetings: Meeting[] = [
  {
    id: 'recur-1',
    title: 'Design Review',
    date: 'Thu, 17 Jul',
    time: '11:00am',
    endTime: '12:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    recurringSchedule: {
      interval: 7,
      totalMeetings: 5,
      meetings: [
        {
          date: '14 July 2025',
          time: '2:30pm',
          completed: true
        },
        {
          date: '21 July 2025',
          time: '2:30pm',
          completed: false
        },
        {
          date: '28 July 2025',
          time: '2:30pm',
          completed: false
        },
        {
          date: '4 August 2025',
          time: '2:30pm',
          completed: false
        },
        {
          date: '11 August 2025',
          time: '2:30pm',
          completed: false
        }
      ]
    },
    attendees: [
      {
        name: 'James Thompson',
        email: 'james.t@design.studio',
        timezone: 'Europe/London'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Design Review',
    status: 'recurring',
    isToday: false
  },
  {
    id: 'recur-2',
    title: 'Weekly Standup',
    date: 'Mon, 14 Jul',
    time: '9:00am',
    endTime: '9:30am',
    duration: '30 minutes',
    host: 'You',
    isHost: true,
    recurringSchedule: {
      interval: 7,
      totalMeetings: 5,
      meetings: [
        {
          date: '14 July 2025',
          time: '9:00am',
          completed: true
        },
        {
          date: '21 July 2025',
          time: '9:00am',
          completed: false
        },
        {
          date: '28 July 2025',
          time: '9:00am',
          completed: false
        },
        {
          date: '4 August 2025',
          time: '9:00am',
          completed: false
        },
        {
          date: '11 August 2025',
          time: '9:00am',
          completed: false
        }
      ]
    },
    attendees: [
      {
        name: 'Maria Garcia',
        email: 'maria.garcia@consulting.com',
        timezone: 'Europe/Madrid'
      }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: 'Weekly Standup',
    status: 'recurring',
    isToday: true
  },
  {
    id: 'recur-3',
    title: 'Sprint Planning',
    date: 'Tue, 15 Jul',
    time: '10:00am',
    endTime: '11:00am',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    recurringSchedule: {
      interval: 14,
      totalMeetings: 5,
      meetings: [
        {
          date: '15 July 2025',
          time: '10:00am',
          completed: false
        },
        {
          date: '29 July 2025',
          time: '10:00am',
          completed: false
        },
        {
          date: '12 August 2025',
          time: '10:00am',
          completed: false
        },
        {
          date: '26 August 2025',
          time: '10:00am',
          completed: false
        },
        {
          date: '9 September 2025',
          time: '10:00am',
          completed: false
        }
      ]
    },
    attendees: [
      {
        name: 'Alex Chen',
        email: 'alex.chen@dev.com',
        timezone: 'Asia/Singapore'
      }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: 'Sprint Planning',
    status: 'recurring',
    isToday: false
  },
  {
    id: 'recur-4',
    title: 'Monthly Review',
    date: 'Wed, 16 Jul',
    time: '2:00pm',
    endTime: '3:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    recurringSchedule: {
      interval: 30,
      totalMeetings: 5,
      meetings: [
        {
          date: '16 July 2025',
          time: '2:00pm',
          completed: false
        },
        {
          date: '15 August 2025',
          time: '2:00pm',
          completed: false
        },
        {
          date: '14 September 2025',
          time: '2:00pm',
          completed: false
        },
        {
          date: '14 October 2025',
          time: '2:00pm',
          completed: false
        },
        {
          date: '13 November 2025',
          time: '2:00pm',
          completed: false
        }
      ]
    },
    attendees: [
      {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        timezone: 'America/Los_Angeles'
      }
    ],
    location: {
      type: 'online',
      name: 'Zoom',
      logo: '📹'
    },
    eventType: 'Monthly Review',
    status: 'recurring',
    isToday: false
  },
  {
    id: 'recur-5',
    title: 'Team Sync',
    date: 'Thu, 17 Jul',
    time: '1:00pm',
    endTime: '1:30pm',
    duration: '30 minutes',
    host: 'You',
    isHost: true,
    recurringSchedule: {
      interval: 7,
      totalMeetings: 5,
      meetings: [
        {
          date: '17 July 2025',
          time: '1:00pm',
          completed: false
        },
        {
          date: '24 July 2025',
          time: '1:00pm',
          completed: false
        },
        {
          date: '31 July 2025',
          time: '1:00pm',
          completed: false
        },
        {
          date: '7 August 2025',
          time: '1:00pm',
          completed: false
        },
        {
          date: '14 August 2025',
          time: '1:00pm',
          completed: false
        }
      ]
    },
    attendees: [
      {
        name: 'David Kim',
        email: 'david.kim@team.com',
        timezone: 'Asia/Seoul'
      }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: 'Team Sync',
    status: 'recurring',
    isToday: false
  }
];

const pastMeetings: Meeting[] = [
  {
    id: 'past-1',
    title: 'Onboarding Call',
    date: 'Fri, 12 Jul',
    time: '2:00pm',
    endTime: '3:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'John Doe',
        email: 'john.doe@company.com',
        timezone: 'America/New_York'
      }
    ],
    location: {
      type: 'online',
      name: 'Teams',
      logo: '📹'
    },
    eventType: 'Onboarding Call',
    status: 'past',
    isToday: false
  }
];

const canceledMeetings: Meeting[] = [
  {
    id: 'cancel-1',
    title: 'Product Demo',
    date: 'Wed, 16 Jul',
    time: '3:00pm',
    endTime: '4:00pm',
    duration: '60 minutes',
    host: 'You',
    isHost: true,
    attendees: [
      {
        name: 'David Kim',
        email: 'david.kim@enterprise.com',
        timezone: 'Asia/Seoul'
      }
    ],
    location: {
      type: 'online',
      name: 'Google Meet',
      logo: '📹'
    },
    eventType: 'Product Demo',
    status: 'canceled',
    isToday: false
  }
];

const allMeetings = {
  upcoming: mockMeetings,
  unconfirmed: unconfirmedMeetings,
  recurring: recurringMeetings,
  past: pastMeetings,
  canceled: canceledMeetings
};

const teamNames = ['Personal', 'Development Team', 'Design Team', 'Marketing Team', 'Sales Team', 'Engineering Team', 'Product Team', 'Customer Success'];

export default function Bookings() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedMeeting, setExpandedMeeting] = useState<string | null>(null);
  const [showAddGuests, setShowAddGuests] = useState(false);
  const [showMeetingNotes, setShowMeetingNotes] = useState(false);
  const [showNoShow, setShowNoShow] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showCancelSelection, setShowCancelSelection] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [meetingNotes, setMeetingNotes] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showEditDropdown, setShowEditDropdown] = useState<string | null>(null);
  const [showAttendeesDropdown, setShowAttendeesDropdown] = useState<string | null>(null);
  const [showAttendeeDetails, setShowAttendeeDetails] = useState<string | null>(null);
  const [selectedRecurringDates, setSelectedRecurringDates] = useState<string[]>([]);
  const [showRecurringHover, setShowRecurringHover] = useState<string | null>(null);
  const [guestEmails, setGuestEmails] = useState<string[]>(['']);
  const [filteredAttendee, setFilteredAttendee] = useState('All');
  const [filteredHost, setFilteredHost] = useState('All');
  const [filteredEventType, setFilteredEventType] = useState('All');
  const [filteredTeam, setFilteredTeam] = useState('All');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const currentMeetings = allMeetings[activeTab as keyof typeof allMeetings] || [];
  const todayMeetings = currentMeetings.filter(m => m.isToday);
  const otherMeetings = currentMeetings.filter(m => !m.isToday);

  const handleExport = () => {
    toast({
      description: "Export successful: Your bookings will be sent to your email shortly.",
      duration: 3000,
    });
  };

  const handleReschedule = () => {
    navigate('/scheduling-coming-soon');
  };

  const handleCancelEvent = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    if (meeting.status === 'recurring') {
      setShowCancelSelection(true);
    } else {
      setShowCancelConfirm(true);
    }
  };

  const handleMarkNoShow = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setShowNoShow(true);
  };

  const addGuestEmail = () => {
    setGuestEmails([...guestEmails, '']);
  };

  const removeGuestEmail = (index: number) => {
    const newEmails = guestEmails.filter((_, i) => i !== index);
    setGuestEmails(newEmails.length > 0 ? newEmails : ['']);
  };

  const updateGuestEmail = (index: number, value: string) => {
    const newEmails = [...guestEmails];
    newEmails[index] = value;
    setGuestEmails(newEmails);
  };

  const isCurrentTime = (time: string) => {
    const currentHour = new Date().getHours();
    const meetingHour = parseInt(time.split(':')[0]);
    return currentHour > meetingHour;
  };

  const getAttendeeDisplay = (meeting: Meeting) => {
    const attendees = meeting.attendees;
    if (attendees.length === 0) return null;
    if (attendees.length === 1) return attendees[0].name.split(' ')[0];
    if (attendees.length === 2) return `${attendees[0].name.split(' ')[0]}, ${attendees[1].name.split(' ')[0]}`;
    return {
      display: `${attendees[0].name.split(' ')[0]}, ${attendees[1].name.split(' ')[0]}`,
      moreCount: attendees.length - 2
    };
  };

  const getAllAttendees = () => {
    const allAttendees = new Set<string>();
    Object.values(allMeetings).flat().forEach(meeting => {
      meeting.attendees.forEach(attendee => {
        allAttendees.add(attendee.name);
      });
    });
    return Array.from(allAttendees);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Email copied to clipboard",
      duration: 2000,
    });
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'Product Hunt Chats':
        return <Rocket className="h-5 w-5" />;
      case 'Discovery Call':
        return <Search className="h-5 w-5" />;
      case 'Strategy Session':
        return <Zap className="h-5 w-5" />;
      case 'Design Review':
        return <Palette className="h-5 w-5" />;
      case 'Client Consultation':
        return <Briefcase className="h-5 w-5" />;
      case 'Weekly Standup':
        return <CalendarDays className="h-5 w-5" />;
      case 'Onboarding Call':
        return <UserCheck className="h-5 w-5" />;
      case 'Product Demo':
        return <Monitor className="h-5 w-5" />;
      case 'Team Strategy Session':
        return <Users className="h-5 w-5" />;
      case 'Client Presentation':
        return <FileText className="h-5 w-5" />;
      case 'Quarterly Review':
        return <TrendingUp className="h-5 w-5" />;
      case 'Sprint Planning':
        return <Target className="h-5 w-5" />;
      case 'Monthly Review':
        return <Calendar className="h-5 w-5" />;
      case 'Team Sync':
        return <MessageSquare className="h-5 w-5" />;
      case 'Marketing Campaign Review':
        return <Zap className="h-5 w-5" />;
      case 'Technical Architecture Discussion':
        return <Settings className="h-5 w-5" />;
      case 'Customer Success Review':
        return <Heart className="h-5 w-5" />;
      case 'Product Roadmap Planning':
        return <Map className="h-5 w-5" />;
      case 'Sales Strategy Meeting':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Video className="h-5 w-5" />;
    }
  };

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
    const isExpanded = expandedMeeting === meeting.id;
    const attendeeDisplay = getAttendeeDisplay(meeting);
    const showActionButtons = meeting.status !== 'past' && meeting.status !== 'canceled';
    const showExpandedActions = meeting.status !== 'past' && meeting.status !== 'canceled';
    const isHost = meeting.isHost;

    const getActionButtons = () => {
      if (meeting.status === 'past' || meeting.status === 'canceled') {
        return isHost ? (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setExpandedMeeting(isExpanded ? null : meeting.id);
            }}
          >
            Details
          </Button>
        ) : null;
      }

      if (meeting.status === 'unconfirmed') {
        return (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  description: "Meeting accepted",
                  duration: 2000,
                });
              }}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                toast({
                  description: "Meeting rejected",
                  duration: 2000,
                });
              }}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        );
      }

      if (meeting.status === 'recurring') {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCancelEvent(meeting);
            }}
          >
            Cancel
          </Button>
        );
      }

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleReschedule();
            }}
          >
            Reschedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCancelEvent(meeting);
            }}
          >
            Cancel
          </Button>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setShowEditDropdown(showEditDropdown === meeting.id ? null : meeting.id);
              }}
            >
              Edit
            </Button>
            {showEditDropdown === meeting.id && (
              <div className="absolute top-full right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-48">
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMeeting(meeting);
                    setShowEditLocation(true);
                    setShowEditDropdown(null);
                  }}
                >
                  <MapPin className="h-4 w-4" />
                  Edit location
                </button>
                <button
                  className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMeeting(meeting);
                    setShowAddGuests(true);
                    setShowEditDropdown(null);
                  }}
                >
                  <UserPlus className="h-4 w-4" />
                  Add guests
                </button>
              </div>
            )}
          </div>
        </div>
      );
    };

    return (
      <div
        className={`bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow animate-fade-in ${
          isHost ? 'cursor-pointer' : ''
        }`}
        onClick={() => {
          if (isHost) {
            setExpandedMeeting(isExpanded ? null : meeting.id);
          }
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                {getEventIcon(meeting.eventType)}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title and Attendees */}
              <div className="flex items-center space-x-2 mb-2">
                <h3 className={`text-lg font-semibold ${meeting.status === 'canceled' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {meeting.title}
                </h3>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center space-x-1">
                  {attendeeDisplay && (
                    <div className="relative">
                      {typeof attendeeDisplay === 'object' ? (
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-muted-foreground">{attendeeDisplay.display}</span>
                          <button
                            className="text-sm text-muted-foreground hover:text-foreground font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowAttendeesDropdown(showAttendeesDropdown === meeting.id ? null : meeting.id);
                            }}
                          >
                            + {attendeeDisplay.moreCount} More
                          </button>
                        </div>
                      ) : (
                        <button
                          className="text-sm text-muted-foreground hover:text-foreground font-medium"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(meeting.attendees[0].email);
                          }}
                        >
                          {attendeeDisplay}
                        </button>
                      )}
                      
                      {showAttendeesDropdown === meeting.id && typeof attendeeDisplay === 'object' && (
                        <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-48">
                          <div className="p-2">
                            <div className="text-xs font-medium text-muted-foreground mb-2">All Attendees</div>
                            {meeting.attendees.map((attendee, index) => (
                              <button
                                key={index}
                                className="w-full text-left text-sm text-foreground hover:bg-accent hover:text-accent-foreground py-1 px-2 rounded"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(attendee.email);
                                  setShowAttendeesDropdown(null);
                                }}
                              >
                                {attendee.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Time */}
              <div className="text-sm text-muted-foreground mb-3">
                {meeting.isToday ? 'Today' : meeting.date} • {meeting.time} - {meeting.endTime}
              </div>

              {/* Location/Meeting Link */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    {meeting.location.type === 'online' ? (
                      <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors">
                        <Video className="h-4 w-4" />
                        <span>Join {meeting.location.name}</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{meeting.location.address}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Recurring info for recurring tab */}
                  {meeting.status === 'recurring' && meeting.recurringSchedule && (
                    <div className="relative">
                      <button
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        onMouseEnter={() => setShowRecurringHover(meeting.id)}
                        onMouseLeave={() => setShowRecurringHover(null)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Every {meeting.recurringSchedule.interval} days for {meeting.recurringSchedule.totalMeetings} occurrences
                      </button>
                      
                      {showRecurringHover === meeting.id && (
                        <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-64 p-3">
                          <div className="space-y-1">
                            {meeting.recurringSchedule.meetings.map((recurringMeeting, index) => (
                              <div
                                key={index}
                                className={`text-sm ${
                                  recurringMeeting.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                                }`}
                              >
                                {recurringMeeting.time} - {recurringMeeting.date}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {showActionButtons && getActionButtons()}
        </div>

        {/* Details button - moved to bottom right of card */}
        <div className="flex justify-end mt-4">
          {isHost ? (
            <button
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedMeeting(isExpanded ? null : meeting.id);
              }}
            >
              <span>Details</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          ) : (
            <span className="text-sm text-muted-foreground">Attendee</span>
          )}
        </div>

        {/* Expanded Details */}
        {isExpanded && isHost && (
          <div className="mt-4 pt-4 border-t border-border animate-fade-in bg-muted/30 -mx-6 px-6 py-4 rounded-b-lg -mb-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Duration</div>
                  <div className="text-sm text-muted-foreground">{meeting.duration}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-foreground mb-2">Invitee Details</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{meeting.attendees[0]?.name}</span>
                    <span>•</span>
                    <span>{meeting.attendees[0]?.timezone}</span>
                    <span>•</span>
                    <span>{meeting.attendees[0]?.email}</span>
                    <button
                      onClick={() => copyToClipboard(meeting.attendees[0]?.email)}
                      className="ml-1 text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {meeting.attendees.length > 1 && (
                  <div>
                    <div className="text-sm font-medium text-foreground mb-2">Attendees</div>
                    <div className="flex flex-wrap gap-2">
                      {meeting.attendees.slice(1).map((attendee, index) => (
                        <div key={index} className="relative">
                          <button
                            className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full hover:bg-secondary/80 hover:shadow-sm transition-all"
                            onClick={() => setShowAttendeeDetails(showAttendeeDetails === `${meeting.id}-${index}` ? null : `${meeting.id}-${index}`)}
                          >
                            {attendee.name.split(' ')[0]}
                          </button>
                          {showAttendeeDetails === `${meeting.id}-${index}` && (
                            <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-64">
                              <div className="p-3 space-y-2">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-foreground">{attendee.email}</span>
                                  <button
                                    onClick={() => copyToClipboard(attendee.email)}
                                    className="ml-1 text-muted-foreground hover:text-foreground"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-foreground">{attendee.timezone}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Expanded View */}
              {showExpandedActions && (
                <div className="flex flex-col items-end space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-44"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMeeting(meeting);
                      setShowMeetingNotes(true);
                    }}
                  >
                    Meeting Notes
                  </Button>
                  {meeting.isToday && isCurrentTime(meeting.time) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-44"
                      style={{ backgroundColor: '#007ee5', color: 'white' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkNoShow(meeting);
                      }}
                    >
                      Mark as No-Show
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
        {/* Overlay for popups */}
        {(showMeetingNotes || showCancelConfirm || showCancelSelection || showNoShow || showEditLocation || showAddGuests) && (
          <div className="fixed inset-0 bg-black/50 z-40" />
        )}

        {/* Header with Tabs and Action Buttons */}
        <div className="flex items-center justify-between">
          {/* Tabs - Updated styling to match teams tabs */}
          <div className="flex border-b border-border bg-muted/30 rounded-t-lg">
            {[
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'unconfirmed', label: 'Unconfirmed' },
              { value: 'recurring', label: 'Recurring' },
              { value: 'past', label: 'Past' },
              { value: 'canceled', label: 'Canceled' }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-300 ease-in-out animate-fade-in relative ${
                  activeTab === tab.value
                    ? 'text-foreground bg-background border-b-2 border-primary rounded-t-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleExport}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export All</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg transition-all duration-300 ease-in-out animate-fade-in transform translate-y-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Attendee: {filteredAttendee}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-md text-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All</span>
                    <Checkbox
                      checked={filteredAttendee === 'All'}
                      onCheckedChange={() => setFilteredAttendee('All')}
                    />
                  </div>
                  {getAllAttendees().map((attendee, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{attendee}</span>
                      <Checkbox
                        checked={filteredAttendee === attendee}
                        onCheckedChange={() => setFilteredAttendee(attendee)}
                      />
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Host: {filteredHost}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All Users</span>
                    <Checkbox
                      checked={filteredHost === 'All'}
                      onCheckedChange={() => setFilteredHost('All')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">You</span>
                    <Checkbox
                      checked={filteredHost === 'You'}
                      onCheckedChange={() => setFilteredHost('You')}
                    />
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Event Type: {filteredEventType}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All event types</span>
                    <Checkbox
                      checked={filteredEventType === 'All'}
                      onCheckedChange={() => setFilteredEventType('All')}
                    />
                  </div>
                  <hr />
                  <div>
                    <p className="text-sm font-medium mb-2">Personal</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">15 Min Meeting</span>
                      <Checkbox />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">Teams: {filteredTeam}</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-60 overflow-auto scrollbar-hide" align="start">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">All</span>
                    <Checkbox
                      checked={filteredTeam === 'All'}
                      onCheckedChange={() => setFilteredTeam('All')}
                    />
                  </div>
                  {teamNames.map((team, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{team}</span>
                      <Checkbox
                        checked={filteredTeam === team}
                        onCheckedChange={() => setFilteredTeam(team)}
                      />
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {dateRange?.from
                    ? dateRange.to
                      ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                      : dateRange.from.toLocaleDateString()
                    : "Pick a date range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  className="rounded-md border pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFilteredAttendee('All');
                setFilteredHost('All');
                setFilteredEventType('All');
                setFilteredTeam('All');
                setDateRange(undefined);
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Meetings List */}
        <div className="space-y-6">
          {todayMeetings.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">Today</h2>
              <div className="space-y-3">
                {todayMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            </div>
          )}
          
          {otherMeetings.length > 0 && (
            <div className={`space-y-3 ${todayMeetings.length > 0 ? 'mt-6' : ''}`}>
              <div className="space-y-3">
                {otherMeetings.map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}
              </div>
            </div>
          )}

          {todayMeetings.length === 0 && otherMeetings.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No {activeTab} bookings
            </div>
          )}
        </div>

        {/* Add Guests Modal - Updated with new design */}
        {showAddGuests && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-2">Add Guests</h2>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-gray-600">Add email addresses to add guests.</span>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>An email invite will be sent to these guests automatically</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="space-y-3 mb-6">
                {guestEmails.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="email"
                      placeholder="guest@example.com"
                      value={email}
                      onChange={(e) => updateGuestEmail(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {guestEmails.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeGuestEmail(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  variant="ghost"
                  onClick={addGuestEmail}
                  className="w-full justify-start text-muted-foreground hover:bg-muted"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add More
                </Button>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddGuests(false);
                    setGuestEmails(['']);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowAddGuests(false);
                    setGuestEmails(['']);
                    toast({
                      description: "Guests added successfully",
                      duration: 2000,
                    });
                  }}
                >
                  Add Guests
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Meeting Notes Modal */}
        {showMeetingNotes && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl">
              <h2 className="text-xl font-semibold mb-2">Meeting Notes</h2>
              <p className="text-sm text-gray-600 mb-6">Add notes to your meeting</p>
              
              <div className="mb-6">
                <div className="flex items-center space-x-1 mb-3 p-3 border border-gray-200 rounded-t-md bg-gray-50">
                  <Button variant="ghost" size="sm"><Bold className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Italic className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Underline className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Strikethrough className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><List className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><ListOrdered className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Undo className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Redo className="h-4 w-4" /></Button>
                </div>
                <textarea
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-200 rounded-b-md border-t-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add your meeting notes here..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowMeetingNotes(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowMeetingNotes(false)}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Selection Modal - First popup for recurring events */}
        {showCancelSelection && selectedMeeting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">Cancel Event</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-900">Select the meetings you want to cancel</label>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                    <span className="text-sm font-medium">Select All</span>
                    <Checkbox
                      checked={selectedRecurringDates.length === selectedMeeting.recurringSchedule?.meetings.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRecurringDates(selectedMeeting.recurringSchedule?.meetings.map(m => `${m.date} • ${m.time}`) || []);
                        } else {
                          setSelectedRecurringDates([]);
                        }
                      }}
                    />
                  </div>
                  {selectedMeeting.recurringSchedule?.meetings.map((meeting, index) => {
                    const dateTime = `${meeting.date} • ${meeting.time}`;
                    return (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded border">
                        <span className="text-sm">{dateTime}</span>
                        <Checkbox
                          checked={selectedRecurringDates.includes(dateTime)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRecurringDates([...selectedRecurringDates, dateTime]);
                            } else {
                              setSelectedRecurringDates(selectedRecurringDates.filter(d => d !== dateTime));
                            }
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCancelSelection(false);
                    setSelectedMeeting(null);
                    setSelectedRecurringDates([]);
                  }}
                >
                  Nevermind
                </Button>
                <Button
                  onClick={() => {
                    setShowCancelSelection(false);
                    setShowCancelConfirm(true);
                  }}
                  disabled={selectedRecurringDates.length === 0}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Event Modal - Updated with invitees and host info */}
        {showCancelConfirm && selectedMeeting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 text-center">Cancel Event</h2>
              <p className="text-sm text-gray-600 mb-6 text-center">We sent an email with a calendar invitation with the details to everyone</p>
              
              {/* Host and Attendees */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {/* Host */}
                  <div className="relative">
                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                      <span>{selectedMeeting.host}</span>
                      <span
                        className="px-2 py-0.5 text-xs rounded-full"
                        style={{ backgroundColor: '#007ee5', color: 'white' }}
                      >
                        Host
                      </span>
                    </button>
                  </div>
                  
                  {/* Attendees */}
                  {selectedMeeting.attendees.map((attendee, index) => (
                    <div key={index} className="relative">
                      <button
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                        onMouseEnter={() => setShowAttendeeDetails(`cancel-${selectedMeeting.id}-${index}`)}
                        onMouseLeave={() => setShowAttendeeDetails(null)}
                      >
                        {attendee.name}
                      </button>
                      {showAttendeeDetails === `cancel-${selectedMeeting.id}-${index}` && (
                        <div className="absolute top-full left-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 min-w-64">
                          <div className="p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{attendee.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">{attendee.timezone}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedMeeting.status === 'recurring' && selectedRecurringDates.length > 0 ? (
                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">Event:</span>
                    <span className="text-gray-900">{selectedMeeting.eventType}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">When:</span>
                    <div className="text-gray-900">
                      {selectedRecurringDates.map((date, index) => (
                        <div key={index}>{date}</div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">With:</span>
                    <span className="text-gray-900">{selectedMeeting.attendees.map(a => a.name).join(', ')}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">Where:</span>
                    <span className="text-gray-900">{selectedMeeting.location.name}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">Event:</span>
                    <span className="text-gray-900">{selectedMeeting.eventType}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">When:</span>
                    <span className="text-gray-900">{selectedMeeting.date} {selectedMeeting.time} - {selectedMeeting.endTime}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">With:</span>
                    <span className="text-gray-900">{selectedMeeting.attendees.map(a => a.name).join(', ')}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-medium text-gray-600 min-w-16">Where:</span>
                    <span className="text-gray-900">{selectedMeeting.location.name}</span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 text-gray-900">Reason for cancellation (optional)</label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full h-24 p-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Why are you cancelling?"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setSelectedMeeting(null);
                    setCancelReason('');
                    setSelectedRecurringDates([]);
                  }}
                >
                  Nevermind
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setSelectedMeeting(null);
                    setCancelReason('');
                    setSelectedRecurringDates([]);
                    toast({
                      description: "Event cancelled successfully.",
                      duration: 3000,
                    });
                  }}
                >
                  Cancel Event
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* No Show Modal */}
        {showNoShow && selectedMeeting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-2">Mark as No-Show</h2>
              <p className="text-sm text-gray-600 mb-6">Select attendees to mark as no-show</p>
              
              <div className="space-y-4 mb-6">
                {selectedMeeting.attendees.map((attendee, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {attendee.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{attendee.name}</span>
                    </div>
                    <Checkbox />
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowNoShow(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowNoShow(false)}>
                  Mark as No-Show
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Location Modal - Updated with comprehensive dropdown */}
        {showEditLocation && selectedMeeting && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-semibold mb-2">Edit Location</h2>
              <p className="text-sm text-gray-600 mb-6">
                Current Location: {selectedMeeting.location.logo} {selectedMeeting.location.name}
              </p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Meeting Location</label>
                <select className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="google-meet">Google Meet</option>
                  <option value="zoom">Zoom</option>
                  <option value="teams">Microsoft Teams</option>
                  <option value="webex">Cisco Webex</option>
                  <option value="gotomeeting">GoToMeeting</option>
                  <option value="jitsi">Jitsi Meet</option>
                  <option value="around">Around</option>
                  <option value="riverside">Riverside.fm</option>
                  <option value="whereby">Whereby</option>
                  <option value="in-person">In-person meeting</option>
                  <option value="phone">Phone call</option>
                  <option value="custom">Custom link</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowEditLocation(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowEditLocation(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
