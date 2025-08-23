import React from 'react';
import './PlayerInspect.css';
import { Player } from '../types/Player';

interface ChemistryConnection {
  position: string;
  type: string;
}

interface PlayerInspectProps {
  player: Player;
  position: string;
  multiplier?: number;
  onClose: () => void;
  isVisible: boolean;
  teamFormation?: { [key: string]: Player | undefined };
}

// Function to get chemistry connections for each position with dynamic connection types
const getChemistryConnections = (
  position: string, 
  selectedPlayer: Player, 
  teamFormation?: { [key: string]: Player | undefined }
): ChemistryConnection[] => {
  if (!teamFormation) return [];

  const connections: ChemistryConnection[] = [];
  
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
    const connectedPlayer = teamFormation[connectedPos];
    if (connectedPlayer) {
      const hasNFLTeamBoost = selectedPlayer.team && connectedPlayer.team && selectedPlayer.team === connectedPlayer.team;
      const hasCollegeConnection = selectedPlayer.college && connectedPlayer.college && selectedPlayer.college === connectedPlayer.college;
      
      // Add NFL Team Boost if applicable
      if (hasNFLTeamBoost) {
        connections.push({
          position: connectedPos,
          type: 'NFL Team Boost'
        });
      }
      
      // Add College Connection if applicable
      if (hasCollegeConnection) {
        connections.push({
          position: connectedPos,
          type: 'College Connection'
        });
      }
    }
  });

  return connections;
};

const PlayerInspect: React.FC<PlayerInspectProps> = ({ 
  player, 
  position, 
  multiplier, 
  onClose, 
  isVisible,
  teamFormation
}) => {
  if (!isVisible) return null;

  const basePoints = player.points || 0;
  const finalPoints = multiplier ? basePoints * multiplier : basePoints;
  const chemistryBonus = multiplier && multiplier > 1.0 ? Math.round((multiplier - 1) * 100) : 0;

  return (
    <div className="player-inspect-overlay" onClick={onClose}>
      <div className="player-inspect-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="inspect-header">
          <h2 className="inspect-title">Player Inspection</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Player Info Grid */}
        <div className="inspect-content">
          {/* Player Avatar and Basic Info */}
          <div className="player-basic-info">
            <div className="player-avatar-large">
              {player.photo_url ? (
                <img 
                  src={player.photo_url} 
                  alt={player.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`avatar-fallback-large ${player.photo_url ? 'hidden' : ''}`}>
                {player.name ? player.name.split(' ').map(n => n[0]).join('') : 'N/A'}
              </div>
            </div>
            
            <div className="player-details">
              <h3 className="player-name">{player.name || 'Unknown Player'}</h3>
              <div className="position-badge">{position}</div>
              {player.team && <div className="team-info">Team: {player.team}</div>}
              {player.college && <div className="college-info">College: {player.college}</div>}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Base Points</div>
              <div className="stat-value">{basePoints.toFixed(1)}</div>
            </div>
            
            {multiplier && multiplier > 1.0 && (
              <>
                <div className="stat-item">
                  <div className="stat-label">Chemistry Multiplier</div>
                  <div className="stat-value multiplier">{multiplier.toFixed(1)}x</div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-label">Chemistry Bonus</div>
                  <div className="stat-value bonus">+{chemistryBonus.toFixed(1)}%</div>
                </div>
              </>
            )}
            
            <div className="stat-item">
              <div className="stat-label">Final Points</div>
              <div className="stat-value final">{finalPoints.toFixed(1)}</div>
            </div>
          </div>

          {/* Chemistry Details */}
          {multiplier && multiplier > 1.0 && (
            <div className="chemistry-section">
              <h4 className="chemistry-title">Chemistry Bonuses</h4>
              <div className="chemistry-connections">
                                 {getChemistryConnections(position, player, teamFormation).map((connection, index) => (
                  <div key={index} className="connection-item">
                    <div className="connection-players">
                      <span className="player-pos">{position}</span>
                      <span className="connection-arrow">↔</span>
                      <span className="player-pos">{connection.position}</span>
                    </div>
                    <div className="connection-type">{connection.type}</div>
                                         <div className="connection-bonus">+10%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Player Info */}
          <div className="additional-info">
            <h4 className="info-title">Additional Information</h4>
            <div className="info-grid">
              {player.rank && (
                <div className="info-item">
                  <span className="info-label">Rank:</span>
                  <span className="info-value">#{player.rank}</span>
                </div>
              )}
              {player.position && (
                <div className="info-item">
                  <span className="info-label">Position:</span>
                  <span className="info-value">{player.position}</span>
                </div>
              )}
              {player.team && (
                <div className="info-item">
                  <span className="info-label">NFL Team:</span>
                  <span className="info-value">{player.team}</span>
                </div>
              )}
              {player.college && (
                <div className="info-item">
                  <span className="info-label">College:</span>
                  <span className="info-value">{player.college}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInspect;
