import React, { useState, useEffect } from 'react';
import { Player } from '../types/Player';
import PlayerCard from './PlayerCard';
import PlayerSelectionModal from './PlayerSelectionModal';

// Interface for the raw player data from players.json
interface PlayersJsonPlayer {
  player_id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  position: string;
  team: string;
  college: string;
  age: number;
  years_exp: number;
  height: string;
  weight: string;
  status: string;
  fantasy_positions: string[];
  search_rank: number;
  hashtag: string;
}

// TeamBuilder React Component
interface TeamBuilderProps {
  players: Player[];
}

interface TeamFormation {
  QB?: Player;
  RB1?: Player;
  RB2?: Player;
  WR1?: Player;
  WR2?: Player;
  Flex1?: Player;
  Flex2?: Player;
  TE?: Player;
  K?: Player;
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({ players }) => {
  const [teamFormation, setTeamFormation] = useState<TeamFormation>({});
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chemistryEnabled, setChemistryEnabled] = useState(true);

  // Initialize with default placeholder cards
  useEffect(() => {
    const defaultFormation: TeamFormation = {
      QB: { id: 'placeholder-qb', name: 'Select QB', position: 'QB', fantasySlot: 'QB', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      RB1: { id: 'placeholder-rb1', name: 'Select RB1', position: 'RB', fantasySlot: 'RB1', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      RB2: { id: 'placeholder-rb2', name: 'Select RB2', position: 'RB', fantasySlot: 'RB2', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      WR1: { id: 'placeholder-wr1', name: 'Select WR1', position: 'WR', fantasySlot: 'WR1', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      WR2: { id: 'placeholder-wr2', name: 'Select WR2', position: 'WR', fantasySlot: 'WR2', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      Flex1: { id: 'placeholder-flex1', name: 'Select Flex1', position: 'FLEX', fantasySlot: 'Flex1', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      Flex2: { id: 'placeholder-flex2', name: 'Select Flex2', position: 'FLEX', fantasySlot: 'Flex2', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      TE: { id: 'placeholder-te', name: 'Select TE', position: 'TE', fantasySlot: 'TE', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      K: { id: 'placeholder-k', name: 'Select K', position: 'K', fantasySlot: 'K', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
    };
    setTeamFormation(defaultFormation);
  }, []);

  // Load players from players.json on component mount
  useEffect(() => {
    const loadPlayers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/players.json');
        if (!response.ok) {
          throw new Error('Failed to load players');
        }
        
        const playersData: { [key: string]: PlayersJsonPlayer } = await response.json();
        
        // Transform the raw data to match our Player interface
        const transformedPlayers: Player[] = Object.values(playersData)
          .filter(player => player.fantasy_positions && player.fantasy_positions.length > 0)
          .map(player => ({
            id: player.player_id,
            name: player.full_name,
            position: player.position,
            fantasySlot: player.fantasy_positions[0], // Use first fantasy position
            team: player.team,
            college: player.college,
            rank: player.search_rank || 999,
            points: 0, // Default points since this is for team building
            projected_points: 0,
            status: player.status,
            photo_url: `https://sleepercdn.com/content/nfl/players/thumb/${player.player_id}.jpg`
          }));
        
        setAllPlayers(transformedPlayers);
        setError(null);
      } catch (err) {
        setError('Failed to load players. Please try again.');
        console.error('Error loading players:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  // Helper function to find player by fantasy slot
  const getPlayerByPosition = (position: string): Player | undefined => {
    return teamFormation[position as keyof TeamFormation];
  };

  // Handle position click to open player selection modal
  const handlePositionClick = (position: string) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  // Handle player selection from modal
  const handlePlayerSelect = (player: Player, targetPosition: string) => {
    setTeamFormation(prev => ({
      ...prev,
      [targetPosition]: player
    }));
    setIsModalOpen(false);
    setSelectedPosition(null);
  };

  // Calculate player multipliers based on chemistry connections (same as DemoMode)
  const calculatePlayerMultiplier = (position: string): number => {
    // If chemistry is disabled, return 1.0 (no multiplier)
    if (!chemistryEnabled) return 1.0;
    
    const player = getPlayerByPosition(position);
    if (!player) return 1.0;

    let multiplier = 1.0;
    
    // Define which positions each position connects to
    const positionConnections: { [key: string]: string[] } = {
      'QB': ['WR1', 'RB1', 'Flex1', 'TE'],
      'RB1': ['QB', 'RB2', 'Flex1', 'WR1'],
      'RB2': ['K', 'RB1', 'Flex2', 'WR2'],
      'WR1': ['QB', 'RB1', 'Flex1', 'WR2'],
      'WR2': ['K', 'RB2', 'Flex2', 'WR1'],
      'Flex1': ['QB', 'RB1', 'WR1', 'TE'],
      'Flex2': ['K', 'RB2', 'WR2', 'TE'],
      'TE': ['QB', 'K', 'Flex1', 'Flex2'],
      'K': ['RB2', 'Flex2', 'WR2', 'TE']
    };

    const connectedPositions = positionConnections[position] || [];
    
    connectedPositions.forEach(connectedPos => {
      const connectedPlayer = getPlayerByPosition(connectedPos);
      if (connectedPlayer) {
        // Same team AND same college = +0.2
        if (player.team && connectedPlayer.team && player.team === connectedPlayer.team &&
            player.college && connectedPlayer.college && player.college === connectedPlayer.college) {
          multiplier += 0.2;
        }
        // Same team OR same college = +0.1
        else if (player.team && connectedPlayer.team && player.team === connectedPlayer.team ||
                 player.college && connectedPlayer.college && player.college === connectedPlayer.college) {
          multiplier += 0.1;
        }
      }
    });
    
    return Math.round(multiplier * 10) / 10;
  };

  // Clear all players from the team
  const clearTeam = () => {
    const defaultFormation: TeamFormation = {
      QB: { id: 'placeholder-qb', name: 'Select QB', position: 'QB', fantasySlot: 'QB', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      RB1: { id: 'placeholder-rb1', name: 'Select RB1', position: 'RB', fantasySlot: 'RB1', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      RB2: { id: 'placeholder-rb2', name: 'Select RB2', position: 'RB', fantasySlot: 'RB2', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      WR1: { id: 'placeholder-wr1', name: 'Select WR1', position: 'WR', fantasySlot: 'WR1', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      WR2: { id: 'placeholder-wr2', name: 'Select WR2', position: 'WR', fantasySlot: 'WR2', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      Flex1: { id: 'placeholder-flex1', name: 'Select Flex1', position: 'FLEX', fantasySlot: 'Flex1', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      Flex2: { id: 'placeholder-flex2', name: 'Select Flex2', position: 'FLEX', fantasySlot: 'Flex2', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      TE: { id: 'placeholder-te', name: 'Select TE', position: 'TE', fantasySlot: 'TE', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
      K: { id: 'placeholder-k', name: 'Select K', position: 'K', fantasySlot: 'K', team: '', college: '', rank: 0, points: 0, projected_points: 0, status: '', photo_url: '' } as Player,
    };
    setTeamFormation(defaultFormation);
  };

  // Get filtered players for search
  const getFilteredPlayers = () => {
    if (!searchTerm) return allPlayers;
    
    const term = searchTerm.toLowerCase();
    return allPlayers.filter(player => 
      player.name?.toLowerCase().includes(term) ||
      player.team?.toLowerCase().includes(term) ||
      player.college?.toLowerCase().includes(term) ||
      player.position?.toLowerCase().includes(term)
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className="team-formation">
        <div className="formation-header">
          <h1 className="formation-title">Team Builder</h1>
          <div className="loading">Loading players...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="team-formation">
        <div className="formation-header">
          <h1 className="formation-title">Team Builder</h1>
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="team-formation">
      {/* Header */}
      <div className="formation-header">
        <h1 className="formation-title">Team Builder</h1>
        <p className="formation-subtitle">Build your dream team from {allPlayers.length} available players</p>
        <div className="header-buttons">
          <button 
            className="clear-team-btn"
            onClick={clearTeam}
            title="Reset team to default placeholder cards"
          >
            Clear Team
          </button>
          <button 
            className={`chemistry-toggle-btn ${chemistryEnabled ? 'active' : ''}`}
            onClick={() => setChemistryEnabled(!chemistryEnabled)}
            title={chemistryEnabled ? 'Chemistry enabled - Click to disable' : 'Chemistry disabled - Click to enable'}
          >
            {chemistryEnabled ? 'Chemistry ON' : 'Chemistry OFF'}
          </button>
        </div>
      </div>

      {/* Football Field */}
      <div className="football-field">
        {/* Offensive Formation */}
        <div className="formation-section offense-section">
          <h3 className="section-title">Your Team</h3>
          
          {/* Kicker Row */}
          <div className="position-group kicker-row">
            <div className="player-slot">
              <PlayerCard
                player={getPlayerByPosition('K')}
                position="K"
                className="k-player"
                multiplier={calculatePlayerMultiplier('K')}
                onClick={() => handlePositionClick('K')}
                onSwap={() => handlePositionClick('K')}
                showPoints={false}
              />
            </div>
          </div>
          
          {/* Top Row: WR1, Flex1, TE, Flex2, WR2 */}
          <div className="position-group top-row">
            {/* WR1 */}
            <div className="position-group wr-group">
              <div className="player-slot">
                <PlayerCard
                  player={getPlayerByPosition('WR1')}
                  position="WR1"
                  className="wr-player"
                  multiplier={calculatePlayerMultiplier('WR1')}
                  onClick={() => handlePositionClick('WR1')}
                  onSwap={() => handlePositionClick('WR1')}
                  showPoints={false}
                />
              </div>
            </div>
            
            {/* Flex1 */}
            <div className="position-group flex-group">
              <div className="player-slot">
                <PlayerCard
                  player={getPlayerByPosition('Flex1')}
                  position="Flex1"
                  className="flex-player"
                  multiplier={calculatePlayerMultiplier('Flex1')}
                  onClick={() => handlePositionClick('Flex1')}
                  onSwap={() => handlePositionClick('Flex1')}
                  showPoints={false}
                />
              </div>
            </div>
            
            {/* TE */}
            <div className="position-group te-group">
              <div className="player-slot">
                <PlayerCard
                  player={getPlayerByPosition('TE')}
                  position="TE"
                  className="te-player"
                  multiplier={calculatePlayerMultiplier('TE')}
                  onClick={() => handlePositionClick('TE')}
                  onSwap={() => handlePositionClick('TE')}
                  showPoints={false}
                />
              </div>
            </div>
            
            {/* Flex2 */}
            <div className="position-group flex-group">
              <div className="player-slot">
                <PlayerCard
                  player={getPlayerByPosition('Flex2')}
                  position="Flex2"
                  className="flex-player"
                  multiplier={calculatePlayerMultiplier('Flex2')}
                  onClick={() => handlePositionClick('Flex2')}
                  onSwap={() => handlePositionClick('Flex2')}
                  showPoints={false}
                />
              </div>
            </div>
            
            {/* WR2 */}
            <div className="position-group wr-group">
              <div className="player-slot">
                <PlayerCard
                  player={getPlayerByPosition('WR2')}
                  position="WR2"
                  className="wr-player"
                  multiplier={calculatePlayerMultiplier('WR2')}
                  onClick={() => handlePositionClick('WR2')}
                  onSwap={() => handlePositionClick('WR2')}
                  showPoints={false}
                />
              </div>
            </div>
          </div>

          {/* Middle Row: QB */}
          <div className="position-group qb-group">
            <div className="player-slot">
              <PlayerCard
                player={getPlayerByPosition('QB')}
                position="QB"
                className="qb-player"
                multiplier={calculatePlayerMultiplier('QB')}
                onClick={() => handlePositionClick('QB')}
                onSwap={() => handlePositionClick('QB')}
                showPoints={false}
              />
            </div>
          </div>

          {/* Bottom Row: RB1, RB2 */}
          <div className="position-group rb-group">
            {/* RB1 */}
            <div className="position-group rb-subgroup">
              <div className="player-slot">
                <PlayerCard
                  player={getPlayerByPosition('RB1')}
                  position="RB1"
                  className="rb-player"
                  multiplier={calculatePlayerMultiplier('RB1')}
                  onClick={() => handlePositionClick('RB1')}
                  onSwap={() => handlePositionClick('RB1')}
                  showPoints={false}
                />
              </div>
            </div>
            
            {/* RB2 */}
            <div className="position-group rb-subgroup">
              <div className="player-slot">
                <PlayerCard
                  player={getPlayerByPosition('RB2')}
                  position="RB2"
                  className="rb-player"
                  multiplier={calculatePlayerMultiplier('RB2')}
                  onClick={() => handlePositionClick('RB2')}
                  onSwap={() => handlePositionClick('RB2')}
                  showPoints={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Summary */}
      <div className="team-summary">
        <h3 className="summary-title">Team Summary</h3>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Chemistry Status:</span>
            <span className="stat-value">
              {chemistryEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          {chemistryEnabled && (
            <div className="stat-item">
              <span className="stat-label">Chemistry Multipliers:</span>
              <span className="stat-value">
                {Object.keys(teamFormation).filter(pos => calculatePlayerMultiplier(pos) > 1.0).length} active
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Player Selection Modal */}
      <PlayerSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        position={selectedPosition || ''}
        availablePlayers={getFilteredPlayers()}
        onPlayerSelect={handlePlayerSelect}
      />
    </div>
  );
};

export default TeamBuilder;
