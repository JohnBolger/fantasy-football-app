import { Player } from '../types/Player';

// Sample data for demo purposes with realistic football players
export const samplePlayers: Player[] = [
  {
    id: '1',
    name: 'Patrick Mahomes',
    position: 'QB',
    team: 'KC',
    points: 24.5,
    projected_points: 22.8,
    photo_url: 'https://en.wikipedia.org/wiki/Patrick_Mahomes#/media/File:Patrick_Mahomes_Chiefs_Military_Appreciation_8123166_(cropped).jpg',
    college: 'Texas Tech'
  },
  {
    id: '2',
    name: 'Christian McCaffrey',
    position: 'RB1',
    team: 'SF',
    points: 28.3,
    projected_points: 25.2,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/christian-mccaffrey.jpg',
    college: 'Stanford'
  },
  {
    id: '3',
    name: 'Saquon Barkley',
    position: 'RB2',
    team: 'PHI',
    points: 19.6,
    projected_points: 17.8,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/saquon-barkley.jpg',
    college: 'Penn State'
  },
  {
    id: '4',
    name: 'Tyreek Hill',
    position: 'WR1',
    team: 'MIA',
    points: 26.1,
    projected_points: 24.5,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/tyreek-hill.jpg',
    college: 'West Alabama'
  },
  {
    id: '5',
    name: 'Stefon Diggs',
    position: 'WR2',
    team: 'HOU',
    points: 22.4,
    projected_points: 20.1,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/stefon-diggs.jpg',
    college: 'Maryland'
  },
  {
    id: '6',
    name: 'Davante Adams',
    position: 'Flex1',
    team: 'LV',
    points: 16.9,
    projected_points: 19.2,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/davante-adams.jpg',
    college: 'Fresno State'
  },
  {
    id: '7',
    name: 'Travis Kelce',
    position: 'TE',
    team: 'KC',
    points: 18.7,
    projected_points: 16.8,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/travis-kelce.jpg',
    college: 'Cincinnati'
  },
  {
    id: '8',
    name: 'Mark Andrews',
    position: 'Flex2',
    team: 'BAL',
    points: 14.3,
    projected_points: 15.6,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/mark-andrews.jpg',
    college: 'Oklahoma'
  },
  {
    id: '15',
    name: 'Jake Elliott',
    position: 'K',
    team: 'PHI',
    points: 12.8,
    projected_points: 13.2,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/jake-elliott.jpg',
    college: 'Memphis'
  },
  // Bench Players
  {
    id: '9',
    name: 'Josh Allen',
    position: 'Bench',
    team: 'BUF',
    points: 22.1,
    projected_points: 23.5,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/josh-allen.jpg',
    college: 'Wyoming'
  },
  {
    id: '10',
    name: 'Derrick Henry',
    position: 'Bench',
    team: 'BAL',
    points: 18.7,
    projected_points: 19.2,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/derrick-henry.jpg',
    college: 'Alabama'
  },
  {
    id: '11',
    name: 'CeeDee Lamb',
    position: 'Bench',
    team: 'DAL',
    points: 20.3,
    projected_points: 21.8,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/ceeedee-lamb.jpg',
    college: 'Oklahoma'
  },
  {
    id: '12',
    name: 'Sam LaPorta',
    position: 'Bench',
    team: 'DET',
    points: 16.2,
    projected_points: 17.1,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/sam-laporta.jpg',
    college: 'Iowa'
  },
  {
    id: '13',
    name: 'Jalen Hurts',
    position: 'Bench',
    team: 'PHI',
    points: 19.8,
    projected_points: 20.5,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/jalen-hurts.jpg',
    college: 'Oklahoma'
  },
  {
    id: '14',
    name: 'Breece Hall',
    position: 'Bench',
    team: 'NYJ',
    points: 17.4,
    projected_points: 18.2,
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/breece-hall.jpg',
    college: 'Iowa State'
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
