import React, { useState, useEffect } from 'react';
import './PlayerCard.css';
import { Player } from '../types/Player';
import { loadCollegeLogos, getCollegeDisplayInfo } from '../utils/collegeLogos';
import { loadNFLTeamLogos, getNFLTeamDisplayInfo } from '../utils/nflTeamLogos';

interface PlayerCardProps {
  player: Player | undefined;
  position: string;
  className?: string;
  multiplier?: number;
  onClick?: () => void;
  isSelected?: boolean;
  onInspect?: () => void;
  onSwap?: () => void;
  showPoints?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, position, className = '', multiplier, onClick, isSelected = false, onInspect, onSwap, showPoints = true }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collegeLogoUrl, setCollegeLogoUrl] = useState<string | null>(null);
  const [collegeDisplayName, setCollegeDisplayName] = useState<string>('');
  const [nflTeamLogoUrl, setNflTeamLogoUrl] = useState<string | null>(null);
  const [nflTeamDisplayName, setNflTeamDisplayName] = useState<string>('');
  const [teamColors, setTeamColors] = useState<{ primary: string; secondary: string } | null>(null);

  // Close context menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Don't close if clicking on the context menu itself
      const target = e.target as Element;
      if (target.closest('.context-menu')) {
        return;
      }
      setShowContextMenu(false);
      setIsMenuOpen(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowContextMenu(false);
        setIsMenuOpen(false);
      }
    };

    if (showContextMenu) {
      // Use a small delay to prevent immediate closing
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [showContextMenu]);

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log('Context menu state changed:', showContextMenu);
  }, [showContextMenu]);

  // Load college logos and find logo for current player
  useEffect(() => {
    if (player?.college) {
      const loadLogo = async () => {
        console.log(`Loading college logo for: ${player.college}`);
        await loadCollegeLogos();
        const { logoUrl, displayName } = getCollegeDisplayInfo(player.college!);
        console.log(`College logo result for ${player.college}:`, { logoUrl, displayName });
        setCollegeLogoUrl(logoUrl);
        setCollegeDisplayName(displayName);
      };
      loadLogo();
    } else {
      setCollegeLogoUrl(null);
      setCollegeDisplayName('');
    }
  }, [player?.college]);

  // Load NFL team logos and find logo for current player
  useEffect(() => {
    if (player?.team) {
      const loadTeamLogo = async () => {
        console.log(`Loading NFL team logo for: ${player.team}`);
        await loadNFLTeamLogos();
        const { logoUrl, displayName, colors } = getNFLTeamDisplayInfo(player.team!);
        console.log(`NFL team logo result for ${player.team}:`, { logoUrl, displayName, colors });
        setNflTeamLogoUrl(logoUrl);
        setNflTeamDisplayName(displayName);
        setTeamColors(colors);
      };
      loadTeamLogo();
    } else {
      setNflTeamLogoUrl(null);
      setNflTeamDisplayName('');
      setTeamColors(null);
    }
  }, [player?.team]);

  if (!player) {
    // Display placeholder when no player is assigned
    return (
      <div 
        className={`player-card placeholder clickable ${className}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        data-multiplier="1.0"
      >
        <div className="card-header">
          <div 
            className="card-cover"
            style={{
              background: teamColors?.primary ? teamColors.primary : '#dee2e6'
            }}
          ></div>
          {/* Avatar section removed for placeholder cards */}
        </div>
        <div className="card-body">
          <div className="card-info">
            <h3 className="card-name">Empty Slot</h3>
            <p className="card-position">{position}</p>
          </div>
        </div>
      </div>
    );
  }

  // Check if this is a placeholder card
  const isPlaceholder = player.id && player.id.startsWith('placeholder-');

  if (isPlaceholder) {
    // Display placeholder card with "Select <Position>" text
    return (
      <div 
        className={`player-card placeholder clickable ${className}`}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
        data-multiplier="1.0"
      >
        <div className="card-header">
          <div 
            className="card-cover"
            style={{
              background: teamColors?.primary ? teamColors.primary : '#adb5bd'
            }}
          ></div>
          {/* Avatar section removed for placeholder cards */}
        </div>
        <div className="card-body">
          <div className="card-info">
            <h3 className="card-name">{player.name}</h3>
            <p className="card-position">{position}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
         <div 
       className={`player-card clickable ${isSelected ? 'selected' : ''} ${showContextMenu ? 'context-menu-open' : ''} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Prevent multiple rapid clicks
        if (isMenuOpen) {
          return;
        }
        
        console.log('PlayerCard clicked!', { player: player?.name, position });
        
        // Calculate position for context menu
        const rect = e.currentTarget.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Default position at click point
        let x = e.clientX;
        let y = e.clientY;
        
        // Adjust if menu would go off-screen
        if (x + 180 > viewportWidth) { // 180px is menu width
          x = viewportWidth - 190;
        }
        if (y + 120 > viewportHeight) { // 120px is approximate menu height
          y = viewportHeight - 130;
        }
        
        console.log('Setting context menu position:', { x, y });
        setContextMenuPosition({ x, y });
        setIsMenuOpen(true);
        setShowContextMenu(true);
        console.log('Context menu state set to true');
      }}
      style={{ cursor: 'pointer' }}
      data-multiplier={multiplier ? multiplier.toFixed(1) : undefined}
    >
      {/* Multiplier badge */}
      {multiplier && multiplier > 1.0 && (
        <div className="player-multiplier" title={`Multiplier: ${multiplier}x`}>
          {multiplier}x
        </div>
      )}
      
      <div className="card-header">
        <div 
          className="card-cover"
          style={{
            background: teamColors?.primary ? teamColors.primary : '#9c7a7a'
          }}
        ></div>
        <div className="card-position-badge">{position}</div>
        <div className="card-name-header">{player.name || 'Unknown Player'}</div>
        <div className="card-avatar">
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
          <div className={`avatar-fallback ${player.photo_url ? 'hidden' : ''}`}>
            {player.name ? player.name.split(' ').map(n => n[0]).join('') : 'N/A'}
          </div>
        </div>
      </div>
      
      <div className="card-body">
        <div className="card-info">
          {/* Points display */}
          {showPoints && player.points !== undefined && (
            <div className="card-points">
              {multiplier && multiplier > 1.0 
                ? `${(player.points * multiplier).toFixed(1)} pts`
                : `${player.points.toFixed(1)} pts`
              }
            </div>
          )}
        </div>
        
        {/* Team positioned in bottom left corner */}
        <div className="card-team">
          {nflTeamLogoUrl ? (
            <img 
              src={nflTeamLogoUrl} 
              alt={nflTeamDisplayName}
              className="team-logo"
              onError={() => {
                // Fallback to text if logo fails to load
                setNflTeamLogoUrl(null);
              }}
              onLoad={() => {
                // Logo loaded successfully
                console.log(`NFL team logo loaded for ${nflTeamDisplayName}`);
              }}
            />
          ) : (
            <span className="team-text" title={nflTeamDisplayName}>
              {player.team || 'N/A'}
            </span>
          )}
        </div>
        
        {/* College positioned in bottom right corner */}
        {player.college && (
          <div className="card-college">
            {collegeLogoUrl ? (
              <img 
                src={collegeLogoUrl} 
                alt={collegeDisplayName}
                className="college-logo"
                onError={() => {
                  // Fallback to text if logo fails to load
                  setCollegeLogoUrl(null);
                }}
                onLoad={() => {
                  // Logo loaded successfully
                  console.log(`College logo loaded for ${collegeDisplayName}`);
                }}
              />
            ) : (
              <span className="college-text" title={collegeDisplayName}>
                {collegeDisplayName.length > 8 ? 
                  collegeDisplayName.substring(0, 8) + '...' : 
                  collegeDisplayName
                }
              </span>
            )}
          </div>
        )}
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div className="context-menu-overlay" onClick={() => {
          setShowContextMenu(false);
          setIsMenuOpen(false);
        }}>
          <div 
            className="context-menu"
            style={{ 
              left: contextMenuPosition.x, 
              top: contextMenuPosition.y,
              position: 'fixed'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {onInspect && (
              <button 
                className="context-menu-item inspect-item"
                                 onClick={() => {
                   setShowContextMenu(false);
                   setIsMenuOpen(false);
                   onInspect();
                 }}
              >
                <span className="context-icon">🔍</span>
                <span className="context-text">Inspect Player</span>
              </button>
            )}
            
            {onSwap && (
              <button 
                className="context-menu-item swap-item"
                                 onClick={() => {
                   setShowContextMenu(false);
                   setIsMenuOpen(false);
                   onSwap();
                 }}
              >
                <span className="context-icon">🔄</span>
                <span className="context-text">Swap Player</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;
