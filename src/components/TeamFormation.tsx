import React, { useRef, useEffect, useState } from 'react';
import './TeamFormation.css';
import { Player } from '../types/Player';
import PlayerCard from './PlayerCard';

interface TeamFormationProps {
  players: Player[];
  demoMode?: boolean;
  onUserSelect: (userId: string) => void;
  selectedUserId: string;
}

interface User {
  display_name: string;
  user_id: string;
  metadata?: {
    team_name?: string;
  };
}

interface Connection {
  from: string;
  to: string;
  color: string;
}

const TeamFormation: React.FC<TeamFormationProps> = ({ players, demoMode = false, onUserSelect, selectedUserId }) => {
  const [playerPositions, setPlayerPositions] = useState<Record<string, { x: number; y: number; width: number; height: number }>>({});
  const playerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  // Define the football formation positions
  const formation = {
    offense: {
      qb: ['QB'],           // Quarterback
      rb: ['RB1', 'RB2'],   // Running Backs
      wr: ['WR1', 'WR2'],   // Wide Receivers
      flex: ['Flex1', 'Flex2'], // Flex Positions
      te: ['TE']             // Tight End
    }
  };

  // Define connections between players
  const connections: Connection[] = [
    // QB connections
    { from: 'QB', to: 'WR1', color: 'transparent' },    // Transparent
    { from: 'QB', to: 'RB1', color: 'transparent' },    // Transparent
    { from: 'QB', to: 'Flex1', color: 'transparent' },  // Transparent
    { from: 'QB', to: 'TE', color: 'transparent' },     // Transparent
    
    // RB1 connections
    { from: 'RB1', to: 'RB2', color: 'transparent' },   // Transparent
    { from: 'RB1', to: 'Flex1', color: 'transparent' }, // Transparent
    { from: 'RB1', to: 'WR1', color: 'transparent' },   // Transparent
    
    // RB2 connections
    { from: 'RB2', to: 'K', color: 'transparent' },     // Transparent
    { from: 'RB2', to: 'Flex2', color: 'transparent' }, // Gray
    { from: 'RB2', to: 'WR2', color: 'transparent' },   // Transparent
    
    // WR1 connections
    { from: 'WR1', to: 'Flex1', color: 'transparent' }, // Transparent
    { from: 'WR1', to: 'WR2', color: 'transparent' },   // Transparent
    
    // WR2 connections
    { from: 'WR2', to: 'K', color: 'transparent' },     // Transparent
    { from: 'WR2', to: 'Flex2', color: 'transparent' }, // Transparent
    
    // TE connections
    { from: 'TE', to: 'K', color: 'transparent' },      // Transparent
    { from: 'TE', to: 'Flex1', color: 'transparent' },  // Transparent
    { from: 'TE', to: 'Flex2', color: 'transparent' },  // Transparent
    
         // Flex1 connections removed - no direct connection between Flex1 and Flex2
    
    // K connections
    { from: 'K', to: 'Flex2', color: 'transparent' },   // Transparent
  ];

  // Helper function to find player by fantasy slot
  const getPlayerByFantasySlot = (fantasySlot: string): Player | null => {
    return players.find(player => player.fantasySlot === fantasySlot) || null;
  };

  // Helper function to get all players for a fantasy slot group
  const getPlayersByFantasySlots = (fantasySlots: string[]): Player[] => {
    const result = fantasySlots.map(slot => getPlayerByFantasySlot(slot)).filter((player): player is Player => player !== null);
    console.log(`getPlayersByFantasySlots for ${fantasySlots.join(', ')}:`, result);
    return result;
  };

  // Handle user selection
  const handleUserChange = (userId: string) => {
    onUserSelect(userId);
    const selectedUser = users.find(user => user.user_id === userId);
    if (selectedUser) {
      setUsername(selectedUser.display_name);
    }
  };

  // Fetch users from users.json
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users.json');
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (!demoMode) {
      fetchUsers();
    } else {
      // Clear selected user when switching to demo mode
      onUserSelect('');
      setUsername('');
    }
  }, [demoMode, onUserSelect]);

  // Calculate player positions for SVG connections
  useEffect(() => {
    const positions: Record<string, { x: number; y: number; height: number; width: number }> = {};
    
    Object.keys(playerRefs.current).forEach(position => {
      const element = playerRefs.current[position];
      if (element) {
        const rect = element.getBoundingClientRect();
        const fieldRect = element.closest('.football-field')?.getBoundingClientRect();
        
        if (fieldRect) {
          positions[position] = {
            x: rect.left - fieldRect.left + rect.width / 2,
            y: rect.top - fieldRect.top + rect.height / 2,
            width: rect.width,
            height: rect.height
          };
        }
      }
    });
    
    setPlayerPositions(positions);
  }, [players]);

  // Calculate player multipliers based on connections
  const calculatePlayerMultiplier = (fantasySlot: string): number => {
    let multiplier = 1.0; // Base multiplier
    
    connections.forEach(connection => {
      if (connection.from === fantasySlot || connection.to === fantasySlot) {
        const fromPlayer = getPlayerByFantasySlot(connection.from);
        const toPlayer = getPlayerByFantasySlot(connection.to);
        
        if (fromPlayer && toPlayer) {
          // Same team AND same college = Purple (+0.2)
          if (fromPlayer.team === toPlayer.team && fromPlayer.college === toPlayer.college) {
            multiplier += 0.2;
          }
          // Same team OR same college = Green (+0.1)
          else if (fromPlayer.team === toPlayer.team || fromPlayer.college === toPlayer.college) {
            multiplier += 0.1;
          }
        }
      }
    });
    
    return Math.round(multiplier * 10) / 10; // Round to 1 decimal place
  };

  // Calculate connection line endpoints at card edges
  const getConnectionEndpoints = (fromPos: { x: number; y: number; width: number; height: number }, 
                                  toPos: { x: number; y: number; width: number; height: number },
                                  fromSlot: string,
                                  toSlot: string) => {
    // Special case for WR1 to WR2 connection - start at top corners
    if ((fromSlot === 'WR1' && toSlot === 'WR2') || (fromSlot === 'WR2' && toSlot === 'WR1')) {
      // For WR1 to WR2, start at top-left corner of first card and top-right corner of second card
      const isWR1ToWR2 = fromSlot === 'WR1';
      const firstCard = isWR1ToWR2 ? fromPos : toPos;
      const secondCard = isWR1ToWR2 ? toPos : fromPos;
      
      // Top-left corner of first card, moved down 2px
      const x1 = firstCard.x - firstCard.width / 2 + 130;
      const y1 = firstCard.y - firstCard.height / 2 + 2;
      
      // Top-right corner of second card, moved down 2px
      const x2 = secondCard.x + secondCard.width / 2 - 130;
      const y2 = secondCard.y - secondCard.height / 2 + 2;
      
      return { x1, y1, x2, y2 };
    }
    
    // Default behavior for other connections
    // Calculate the direction vector between centers
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return { x1: fromPos.x, y1: fromPos.y, x2: toPos.x, y2: toPos.y };
    
    // Normalize the direction vector
    const unitX = dx / distance;
    const unitY = dy / distance;
    
    // Calculate the radius of each card (half of width/height)
    const fromRadius = Math.max(fromPos.width, fromPos.height) / 2;
    const toRadius = Math.max(toPos.width, toPos.height) / 2;
    
    // Calculate start point (edge of first card) - stop exactly at the edge
    const x1 = fromPos.x + unitX * (fromRadius - 1);
    const y1 = fromPos.y + unitY * (fromRadius - 1);
    
    // Calculate end point (edge of second card) - stop exactly at the edge
    const x2 = toPos.x - unitX * (toRadius - 1);
    const y2 = toPos.y - unitY * (toRadius - 1);
    
    return { x1, y1, x2, y2 };
  };

  // Get connection color based on player attributes
  const getConnectionColor = (from: string, to: string, defaultColor: string): string => {
    const fromPlayer = getPlayerByFantasySlot(from);
    const toPlayer = getPlayerByFantasySlot(to);
    
    if (!fromPlayer || !toPlayer) return defaultColor;
    
    // Same team AND same college = Purple
    if (fromPlayer.team === toPlayer.team && fromPlayer.college === toPlayer.college) {
      return '#8b5cf6'; // Purple
    }
    
    // Same team OR same college = Green
    if (fromPlayer.team === toPlayer.team || fromPlayer.college === toPlayer.college) {
      return '#22c55e'; // Green
    }
    
    // Different team and college = Default color with transparency
    return defaultColor + '80'; // Add transparency
  };

  // Debug logging
  console.log('TeamFormation render:', { demoMode, usersCount: users.length, selectedUserId, playersCount: players.length });
  console.log('Players data:', players);

  return (
    <div className="team-formation">
      {/* Header */}
      <div className="formation-header">
        {!demoMode && (
          <div className="username-input-container">
            <select
              value={selectedUserId}
              onChange={(e) => handleUserChange(e.target.value)}
              className="username-select"
            >
              <option value="">Select a user</option>
              {users.length > 0 ? (
                users.map(user => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.display_name} {user.metadata?.team_name ? `(${user.metadata.team_name})` : ''}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading users...</option>
              )}
            </select>
          </div>
        )}
        <h1 className="team-title">{demoMode ? "Demo Team" : (username ? `${username}'s Team` : "My Team")}</h1>
      </div>

      {/* Football Field */}
      <div className="football-field">
        {/* SVG Connection Lines */}
        <svg className="connection-lines" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
          {connections.map((connection, index) => {
            const fromPos = playerPositions[connection.from];
            const toPos = playerPositions[connection.to];
            
            if (!fromPos || !toPos) return null;
            
            const color = getConnectionColor(connection.from, connection.to, connection.color);
            const endpoints = getConnectionEndpoints(fromPos, toPos, connection.from, connection.to);
            
            return (
              <line
                key={`${connection.from}-${connection.to}-${index}`}
                x1={endpoints.x1}
                y1={endpoints.y1}
                x2={endpoints.x2}
                y2={endpoints.y2}
                stroke={color}
                strokeWidth="2"
                strokeOpacity="0.7"
                className="player-connection"
              />
            );
          })}
        </svg>

        {/* Offensive Formation */}
        <div className="formation-section offense-section">
          <h3 className="section-title">Starters</h3>
          
          {/* Kicker Row */}
          <div className="position-group kicker-row">
            {getPlayersByFantasySlots(['K']).map((player, index) => (
              <div
                key={`k-${index}`}
                ref={(el) => { playerRefs.current['K'] = el; }}
              >
                <PlayerCard
                  player={player}
                  position="K"
                  className="k-player"
                  multiplier={calculatePlayerMultiplier('K')}
                />
              </div>
            ))}
          </div>
          
          {/* Top Row: WR1, Flex1, TE, Flex2, WR2 */}
          <div className="position-group top-row">
            {/* WR1 */}
            <div className="position-group wr-group">
              {getPlayersByFantasySlots(['WR1']).map((player, index) => (
                <div
                  key={`wr1-${index}`}
                  ref={(el) => { playerRefs.current['WR1'] = el; }}
                >
                  <PlayerCard
                    player={player}
                    position="WR1"
                    className="wr-player"
                    multiplier={calculatePlayerMultiplier('WR1')}
                  />
                </div>
              ))}
            </div>
            
            {/* Flex1 */}
            <div className="position-group flex-group">
              {getPlayersByFantasySlots(['Flex1']).map((player, index) => (
                <div
                  key={`flex1-${index}`}
                  ref={(el) => { playerRefs.current['Flex1'] = el; }}
                >
                  <PlayerCard
                    player={player}
                    position="Flex1"
                    className="flex-player"
                    multiplier={calculatePlayerMultiplier('Flex1')}
                  />
                </div>
              ))}
            </div>
            
            {/* TE */}
            <div className="position-group te-group">
              {getPlayersByFantasySlots(['TE']).map((player, index) => (
                <div
                  key={`te-${index}`}
                  ref={(el) => { playerRefs.current['TE'] = el; }}
                >
                  <PlayerCard
                    player={player}
                    position="TE"
                    className="flex-player"
                    multiplier={calculatePlayerMultiplier('TE')}
                  />
                </div>
              ))}
            </div>
            
            {/* Flex2 */}
            <div className="position-group flex-group">
              {getPlayersByFantasySlots(['Flex2']).map((player, index) => (
                <div
                  key={`flex2-${index}`}
                  ref={(el) => { playerRefs.current['Flex2'] = el; }}
                >
                  <PlayerCard
                    player={player}
                    position="Flex2"
                    className="flex-player"
                    multiplier={calculatePlayerMultiplier('Flex2')}
                  />
                </div>
              ))}
            </div>
            
            {/* WR2 */}
            <div className="position-group wr-group">
              {getPlayersByFantasySlots(['WR2']).map((player, index) => (
                <div
                  key={`wr2-${index}`}
                  ref={(el) => { playerRefs.current['WR2'] = el; }}
                >
                  <PlayerCard
                    player={player}
                    position="WR2"
                    className="wr-player"
                    multiplier={calculatePlayerMultiplier('WR2')}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle Row: QB */}
          <div className="position-group qb-group">
            {getPlayersByFantasySlots(formation.offense.qb).map((player, index) => (
              <div
                key={`qb-${index}`}
                ref={(el) => { playerRefs.current['QB'] = el; }}
              >
                <PlayerCard
                  player={player}
                  position={formation.offense.qb[index]}
                  className="qb-player"
                  multiplier={calculatePlayerMultiplier('QB')}
                />
              </div>
            ))}
          </div>

          {/* Bottom Row: RB1, RB2 */}
          <div className="position-group rb-group">
            {getPlayersByFantasySlots(formation.offense.rb).map((player, index) => (
              <div
                key={`rb-${index}`}
                ref={(el) => { playerRefs.current[formation.offense.rb[index]] = el; }}
              >
                <PlayerCard
                  player={player}
                  position={formation.offense.rb[index]}
                  className="rb-player"
                  multiplier={calculatePlayerMultiplier(formation.offense.rb[index])}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="formation-footer">
        <div className="bench-label">BENCH</div>
        <div className="bench-players">
          {players
            .filter(player => player.fantasySlot === 'Bench')
            .map((player, index) => (
              <PlayerCard
                key={`bench-${index}`}
                player={player}
                position="Bench"
                className="bench-player"
                multiplier={calculatePlayerMultiplier('Bench')}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamFormation;
