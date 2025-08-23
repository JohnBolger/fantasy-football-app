import React, { useState } from 'react';
import { Player } from '../types/Player';
import { canPlayerPlayPosition } from '../utils/positionValidation';
import './PlayerSelectionModal.css';

interface PlayerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: string;
  availablePlayers: Player[];
  onPlayerSelect: (player: Player, targetSlot: string) => void;
}

const PlayerSelectionModal: React.FC<PlayerSelectionModalProps> = ({
  isOpen,
  onClose,
  position,
  availablePlayers,
  onPlayerSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filter players by valid positions and search term
  const validPlayers = availablePlayers.filter(player => 
    canPlayerPlayPosition(player, position) &&
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayerSelect = (player: Player) => {
    onPlayerSelect(player, position);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Select Player for {position}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="players-list">
          {validPlayers.length === 0 ? (
            <p className="no-players">No valid players available for {position}</p>
          ) : (
            validPlayers.map(player => (
              <div
                key={player.id}
                className="player-option"
                onClick={() => handlePlayerSelect(player)}
              >
                <img 
                  src={player.photo_url} 
                  alt={player.name}
                  className="player-photo"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/40x40?text=?';
                  }}
                />
                <div className="player-info">
                  <div className="player-name">{player.name}</div>
                  <div className="player-details">
                    {player.team} • {player.position} • {player.college}
                  </div>
                </div>
                <div className="current-slot">{player.fantasySlot}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerSelectionModal;
