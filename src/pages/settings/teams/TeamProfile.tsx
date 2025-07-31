import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Upload, Trash2, X } from 'lucide-react';

export const TeamProfile = () => {
  const { teamId } = useParams();
  const [teamName, setTeamName] = useState('Test1');
  const [teamUrl, setTeamUrl] = useState('test1');
  const [bio, setBio] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoUrl(url);
    }
  };

  const handleDeleteTeam = () => {
    if (confirm('Are you sure you want to delete this team? This action cannot be undone.')) {
      // Handle team deletion logic here
      console.log('Team deleted');
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center animate-fade-in">
      <div className="p-8 w-full max-w-4xl">
        <div className="border rounded-lg p-6 bg-card hover:bg-muted/20 transition-colors duration-200">
          <div className="space-y-6">
            {/* Team Logo Upload Section */}
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="team-logo">Team Logo</Label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {logoUrl ? (
                    <div className="relative group">
                      <img 
                        src={logoUrl} 
                        alt="Team Logo" 
                        className="w-20 h-20 rounded-lg object-cover border-2 border-muted transition-transform duration-200 hover:scale-105"
                      />
                      <button
                        onClick={() => setLogoUrl('')}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors duration-200">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    id="team-logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload a team logo (JPG, PNG, GIF up to 10MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="team-name">Team Name</Label>
              <Input 
                id="team-name" 
                value={teamName} 
                onChange={e => setTeamName(e.target.value)} 
                placeholder="Enter team name"
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="team-url">Team URL</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  cal.id/team/
                </span>
                <Input 
                  id="team-url" 
                  value={teamUrl} 
                  onChange={e => setTeamUrl(e.target.value)} 
                  className="rounded-l-none transition-all duration-200 focus:ring-2 focus:ring-primary/20" 
                  placeholder="team-url" 
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                value={bio} 
                onChange={e => setBio(e.target.value)} 
                placeholder="A little something about your team" 
                rows={4}
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex justify-between items-center pt-4 animate-fade-in">
              <Button 
                variant="destructive" 
                onClick={handleDeleteTeam}
                className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Team</span>
              </Button>
              
              <Button className="hover:scale-105 transition-transform duration-200">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
