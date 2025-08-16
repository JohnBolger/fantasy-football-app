import React from 'react';
import './TeamFormation.css';
import { Player } from '../types/Player';
import PlayerCard from './PlayerCard';

interface TeamFormationProps {
  players: Player[];
}

const TeamFormation: React.FC<TeamFormationProps> = ({ players }) => {
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

  // Helper function to find player by position
  const getPlayerByPosition = (position: string): Player | null => {
    return players.find(player => player.position === position) || null;
  };

  // Helper function to get all players for a position group
  const getPlayersByPositions = (positions: string[]): (Player | null)[] => {
    return positions.map(pos => getPlayerByPosition(pos));
  };

  return (
    <div className="team-formation">
      {/* Header */}
      <div className="formation-header">
        <h1 className="team-title">Quattro's Team</h1>
      </div>

      {/* Football Field */}
      <div className="football-field">
        {/* Field markings */}
        <div className="field-markings">
          <div className="endzone-left">END ZONE</div>
          <div className="endzone-right">END ZONE</div>
          <div className="yard-lines">
            <div className="yard-line-10">10</div>
            <div className="yard-line-20">20</div>
            <div className="yard-line-30">30</div>
            <div className="yard-line-40">40</div>
            <div className="yard-line-50">50</div>
            <div className="yard-line-40-right">40</div>
            <div className="yard-line-30-right">30</div>
            <div className="yard-line-20-right">20</div>
            <div className="yard-line-10-right">10</div>
          </div>
          <div className="hash-marks"></div>
        </div>

        {/* Offensive Formation */}
        <div className="formation-section offense-section">
          <h3 className="section-title">OFFENSE</h3>
          
          {/* Kicker Row */}
          <div className="position-group kicker-row">
            {getPlayersByPositions(['K']).map((player, index) => (
              <PlayerCard
                key={`k-${index}`}
                player={player}
                position="K"
                className="k-player"
              />
            ))}
          </div>
          
          {/* Top Row: WR1, Flex1, TE, Flex2, WR2 */}
          <div className="position-group top-row">
            {/* WR1 */}
            <div className="position-group wr-group">
              {getPlayersByPositions(['WR1']).map((player, index) => (
                <PlayerCard
                  key={`wr1-${index}`}
                  player={player}
                  position="WR1"
                  className="wr-player"
                />
              ))}
            </div>
            
            {/* Flex1 */}
            <div className="position-group flex-group">
              {getPlayersByPositions(['Flex1']).map((player, index) => (
                <PlayerCard
                  key={`flex1-${index}`}
                  player={player}
                  position="Flex1"
                  className="flex-player"
                />
              ))}
            </div>
            
            {/* TE */}
            <div className="position-group te-group">
              {getPlayersByPositions(['TE']).map((player, index) => (
                <PlayerCard
                  key={`te-${index}`}
                  player={player}
                  position="TE"
                  className="te-player"
                />
              ))}
            </div>
            
            {/* Flex2 */}
            <div className="position-group flex-group">
              {getPlayersByPositions(['Flex2']).map((player, index) => (
                <PlayerCard
                  key={`flex2-${index}`}
                  player={player}
                  position="Flex2"
                  className="flex-player"
                />
              ))}
            </div>
            
            {/* WR2 */}
            <div className="position-group wr-group">
              {getPlayersByPositions(['WR2']).map((player, index) => (
                <PlayerCard
                  key={`wr2-${index}`}
                  player={player}
                  position="WR2"
                  className="wr-player"
                />
              ))}
            </div>
          </div>

          {/* Middle Row: QB */}
          <div className="position-group qb-group">
            {getPlayersByPositions(formation.offense.qb).map((player, index) => (
              <PlayerCard
                key={`qb-${index}`}
                player={player}
                position={formation.offense.qb[index]}
                className="qb-player"
              />
            ))}
          </div>

          {/* Bottom Row: RB1, RB2 */}
          <div className="position-group rb-group">
            {getPlayersByPositions(formation.offense.rb).map((player, index) => (
              <PlayerCard
                key={`rb-${index}`}
                player={player}
                position={formation.offense.rb[index]}
                className="rb-player"
              />
            ))}
          </div>
        </div>


      </div>

      {/* Bottom Section */}
      <div className="formation-footer">
        <div className="bench-label">BENCH</div>
        <div className="bench-players">
          {players
            .filter(player => player.position === 'Bench')
            .map((player, index) => (
              <PlayerCard
                key={`bench-${index}`}
                player={player}
                position="Bench"
                className="bench-player"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TeamFormation;
