import React, { useState, useEffect } from 'react';
import './App.css';
import TeamFormation from './components/TeamFormation';
import { SleeperAPI } from './services/SleeperAPI';
import { Player } from './types/Player';
import { samplePlayers, transformPlayersForFormation } from './components/DemoMode';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(true);

  useEffect(() => {
    if (demoMode) {
      // Use sample data for demo mode
      const demoPlayers = transformPlayersForFormation(samplePlayers);
      setPlayers(demoPlayers);
    } else {
      // Fetch real data from Sleeper API
      const fetchTeam = async () => {
        try {
          setLoading(true);
          
          // Get the first team from the league
          const teamData = await SleeperAPI.getFirstTeam();
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
  }, [demoMode]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">Loading your team...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <h2>Error</h2>
          <p>{error}</p>
          <p>Please update the user ID in src/App.tsx</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="demo-toggle">
        <button 
          className={`toggle-btn ${demoMode ? 'active' : ''}`}
          onClick={() => setDemoMode(true)}
        >
          Demo Mode
        </button>
        <button 
          className={`toggle-btn ${!demoMode ? 'active' : ''}`}
          onClick={() => setDemoMode(false)}
        >
          Live Mode
        </button>
      </div>
      <TeamFormation players={players} />
    </div>
  );
}

export default App;
