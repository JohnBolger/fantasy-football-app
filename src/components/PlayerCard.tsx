import React from 'react';
import './PlayerCard.css';
import { Player } from '../types/Player';

interface PlayerCardProps {
  player: Player | null;
  position: string;
  className?: string;
  multiplier?: number;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, position, className = '', multiplier }) => {
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
                    <div className="player-team-college">
                      {player.team}
                      {player.college && (
                        <span className="college-separator"> • </span>
                      )}
                      {player.college}
                    </div>
                  </div>
      
      <div className="player-position">{position}</div>
      
      {multiplier && multiplier > 1.0 && (
        <div className="player-multiplier" title={`Multiplier: ${multiplier}x`}>
          {multiplier}x
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
