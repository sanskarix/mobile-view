
import React from 'react';
import { Construction } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-8">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <Construction className="h-24 w-24 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Coming Soon</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            We're working hard to bring you an amazing new experience. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
