import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Users } from 'lucide-react';
import { CreateTeamModal } from '../components/CreateTeamModal';
import { TeamCard } from '../components/TeamCard';
export const Teams = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);

  // Load teams from localStorage on component mount
  useEffect(() => {
    const loadTeams = () => {
      const savedTeams = localStorage.getItem('teams');
      if (savedTeams) {
        try {
          const parsedTeams = JSON.parse(savedTeams);
          setTeams(parsedTeams);
        } catch (error) {
          console.error('Error loading teams:', error);
        }
      }
    };
    loadTeams();

    // Listen for storage changes to update teams in real-time
    const handleStorageChange = () => {
      loadTeams();
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('teamsUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('teamsUpdated', handleStorageChange);
    };
  }, []);
  const handleTeamUpdate = (teamId: string, completedActions: string[]) => {
    const updatedTeams = teams.map(team => team.id === teamId ? {
      ...team,
      completedActions
    } : team);
    setTeams(updatedTeams);

    // Save to localStorage
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('teamsUpdated'));
  };
  const handleTeamDelete = (teamId: string) => {
    const updatedTeams = teams.filter(team => team.id !== teamId);
    setTeams(updatedTeams);

    // Save to localStorage
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('teamsUpdated'));
  };
  const handleTeamCreated = (team: any) => {
    const newTeam = {
      ...team,
      completedActions: []
    };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);

    // Save to localStorage
    localStorage.setItem('teams', JSON.stringify(updatedTeams));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('teamsUpdated'));
  };
  return <div className="p-8">
      {teams.length === 0 ?
    // Empty state
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-8">
            <Users className="h-16 w-16 text-muted-foreground" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-4">Create a team to get started</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Create your first team and invite other users to work together.
          </p>
          
          <Button onClick={() => setShowCreateModal(true)}>
            Create a new team
          </Button>
        </div> :
    // Teams display
    <div className="max-w-6xl mx-auto">
          

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team, index) => (
              <div key={team.id} className="bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 hover:bg-muted/70 transition-colors group/icon">
                      <Users className="h-5 w-5 group-hover/icon:scale-110 transition-transform" style={{ color: team.color || '#6366f1' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-2 space-x-3">
                        <h3 className="font-semibold text-foreground text-base">{team.name}</h3>
                        <div className="relative flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
                          <span>cal.id/team/{team.url}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{team.description}</p>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-xs rounded mr-2">
                          <Users className="h-3 w-3 mr-1" />
                          {team.memberCount || 1} member{(team.memberCount || 1) !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add new team button */}
          <div className="mt-8 text-center">
            <Button onClick={() => setShowCreateModal(true)} variant="outline">
              Create another team
            </Button>
          </div>
        </div>}

      <CreateTeamModal open={showCreateModal} onClose={() => setShowCreateModal(false)} onTeamCreated={handleTeamCreated} />
    </div>;
};