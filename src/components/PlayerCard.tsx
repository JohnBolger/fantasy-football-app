import React from 'react';
import './PlayerCard.css';
import { Player } from '../types/Player';

interface PlayerCardProps {
  player: Player | null;
  position: string;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, position, className = '' }) => {
  if (!player) {
    // Display placeholder when no player is assigned
    return (
      <div className={`player-card placeholder ${className}`}>
        <div className="player-photo-placeholder">
          <span className="placeholder-text">GG</span>
        </div>
        <div className="player-position">{position}</div>
      </div>
    );
  }

  return (
    <div className={`player-card ${className}`}>
      <div className="player-photo">
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
        <div className={`player-photo-fallback ${player.photo_url ? 'hidden' : ''}`}>
          {player.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      
                        <div className="player-info">
                    <div className="player-name">{player.name}</div>
                    <div className="player-team">{player.team}</div>
                    {player.college && (
                      <div className="player-college">{player.college}</div>
                    )}
                  </div>
      
      <div className="player-position">{position}</div>
      
      {player.injury_status && player.injury_status !== 'Active' && (
        <div className="injury-indicator" title={player.injury_status}>
          ⚠️
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
