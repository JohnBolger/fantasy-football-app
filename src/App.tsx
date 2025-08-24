import React, { useState, useEffect } from 'react';
import './App.css';
import TeamFormation from './components/TeamFormation';
import TeamBuilder from './components/TeamBuilder';
import { SleeperAPI } from './services/SleeperAPI';
import { Player } from './types/Player';
import { demoPlayers, transformPlayersForFormation } from './components/DemoMode';
import Background from './components/Background';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [viewMode, setViewMode] = useState<'formation' | 'builder'>('formation');

  useEffect(() => {
    if (demoMode) {
      // Use sample data for demo mode
      const transformedDemoPlayers = transformPlayersForFormation(demoPlayers);
      setPlayers(transformedDemoPlayers);
    } else {
      // Clear players when switching to Live Mode
      setPlayers([]);
      
      // Only fetch team data if a user is selected
      if (selectedUserId) {
        const fetchTeam = async () => {
          try {
            setLoading(true);
            
            // Get the specific user's team from the league
            const teamData = await SleeperAPI.getUserTeam(selectedUserId);
            setPlayers(teamData);
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(`Failed to fetch team data: ${errorMessage}`);
            console.error('Error fetching team:', err);
          } finally {
            setLoading(false);
          }
        };

        fetchTeam();
      }
    }
  }, [demoMode, selectedUserId]);

  if (loading) {
    return (
      <div className="app">
        <Background />
        <div className="loading">Loading your team...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Background />
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <p>Please select a user from the dropdown</p>
        </div>
      </div>
    );
  }

  // Always show TeamFormation when in Live Mode, even if no user is selected
  // The dropdown will be visible and allow user selection

  // Handle lineup changes
  const handleLineupChange = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
  };

  return (
    <div className="app">
      <Background />
      <div className="demo-toggle">
        <button 
          className={`toggle-btn ${viewMode === 'formation' && demoMode ? 'active' : ''}`}
          onClick={() => {
            setDemoMode(true);
            setViewMode('formation');
          }}
        >
          Demo Mode
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'formation' && !demoMode ? 'active' : ''}`}
          onClick={() => {
            setDemoMode(false);
            setViewMode('formation');
          }}
        >
          Live Mode
        </button>
        <button 
          className={`toggle-btn ${viewMode === 'builder' ? 'active' : ''}`}
          onClick={() => setViewMode('builder')}
        >
          Team Builder
        </button>
      </div>
      
      {viewMode === 'formation' ? (
        <TeamFormation 
          players={players} 
          demoMode={demoMode} 
          onUserSelect={setSelectedUserId}
          selectedUserId={selectedUserId}
          onLineupChange={handleLineupChange}
        />
      ) : (
        <TeamBuilder players={[]} />
      )}
    </div>
  );
}



export default App;
