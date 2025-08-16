import { Player } from '../types/Player';

// Sample data for demo purposes with realistic football players
export const demoPlayers: Player[] = [
  // Starters - All Eagles players
  {
    id: '4039',
    name: 'Jalen Hurts',
    position: 'QB',
    team: 'PHI',
    college: 'Oklahoma',
    rank: 1,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4039.jpg'
  },
  {
    id: '642',
    name: 'D\'Andre Swift',
    position: 'RB1',
    team: 'PHI',
    college: 'Georgia',
    rank: 15,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/642.jpg'
  },
  {
    id: '4034',
    name: 'Kenneth Gainwell',
    position: 'RB2',
    team: 'PHI',
    college: 'Memphis',
    rank: 45,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4034.jpg'
  },
  {
    id: '147',
    name: 'A.J. Brown',
    position: 'WR1',
    team: 'PHI',
    college: 'Ole Miss',
    rank: 5,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/147.jpg'
  },
  {
    id: '4038',
    name: 'DeVonta Smith',
    position: 'WR2',
    team: 'PHI',
    college: 'Alabama',
    rank: 12,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4038.jpg'
  },
  {
    id: '515',
    name: 'Dallas Goedert',
    position: 'TE',
    team: 'PHI',
    college: 'South Dakota State',
    rank: 8,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/515.jpg'
  },
  {
    id: '4149',
    name: 'Quez Watkins',
    position: 'Flex1',
    team: 'PHI',
    college: 'Southern Miss',
    rank: 65,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4149.jpg'
  },
  {
    id: '2257',
    name: 'Olamide Zaccheaus',
    position: 'Flex2',
    team: 'PHI',
    college: 'Virginia',
    rank: 85,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/2257.jpg'
  },
  {
    id: '2307',
    name: 'Jake Elliott',
    position: 'K',
    team: 'PHI',
    college: 'Memphis',
    rank: 3,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/2307.jpg'
  },
  // Bench players - Also Eagles
  {
    id: '2309',
    name: 'Marcus Mariota',
    position: 'Bench',
    team: 'PHI',
    college: 'Oregon',
    rank: 25,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/2309.jpg'
  },
  {
    id: '4035',
    name: 'Rashaad Penny',
    position: 'Bench',
    team: 'PHI',
    college: 'San Diego State',
    rank: 35,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4035.jpg'
  },
  {
    id: '4381',
    name: 'Britain Covey',
    position: 'Bench',
    team: 'PHI',
    college: 'Utah',
    rank: 95,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4381.jpg'
  },
  {
    id: '5849',
    name: 'Grant Calcaterra',
    position: 'Bench',
    team: 'PHI',
    college: 'SMU',
    rank: 28,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/5849.jpg'
  }
];

// Map fantasy football positions to football formation positions
export const positionMapping: Record<string, string> = {
  // Offense
  'QB': 'QB',           // Quarterback
  'RB': 'RB1',          // Running Back
  'RB1': 'RB1',         // Running Back 1
  'RB2': 'RB2',         // Running Back 2
  'WR': 'WR1',          // Wide Receiver
  'WR1': 'WR1',         // Wide Receiver 1
  'WR2': 'WR2',         // Wide Receiver 2
  'Flex1': 'Flex1',     // Flex Position 1
  'Flex2': 'Flex2',     // Flex Position 2
  'TE': 'TE',           // Tight End
  'Bench': 'Bench'      // Bench Players
};

// Transform fantasy football players to football formation positions
export const transformPlayersForFormation = (players: Player[]): Player[] => {
  return players.map(player => ({
    ...player,
    position: positionMapping[player.position] || player.position
  }));
};
