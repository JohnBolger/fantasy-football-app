import { Player } from '../types/Player';

// Sample data for demo purposes with realistic football players
export const demoPlayers: Player[] = [
  // Starters - All Eagles players
  {
    id: '4039',
    name: 'Jalen Hurts',
    position: 'QB',           // Actual NFL position
    fantasySlot: 'QB',        // Fantasy lineup position
    team: 'PHI',
    college: 'Oklahoma',
    rank: 1,
    points: 22,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4039.jpg'
  },
  {
    id: '642',
    name: 'D\'Andre Swift',
    position: 'RB',           // Actual NFL position
    fantasySlot: 'RB1',       // Fantasy lineup position
    team: 'PHI',
    college: 'Georgia',
    rank: 15,
    points: 9,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/642.jpg'
  },
  {
    id: '4034',
    name: 'Kenneth Gainwell',
    position: 'RB',           // Actual NFL position
    fantasySlot: 'RB2',       // Fantasy lineup position
    team: 'PHI',
    college: 'Memphis',
    rank: 45,
    points: 3.4,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4034.jpg'
  },
  {
    id: '147',
    name: 'A.J. Brown',
    position: 'WR',           // Actual NFL position
    fantasySlot: 'WR1',       // Fantasy lineup position
    team: 'PHI',
    college: 'Ole Miss',
    rank: 5,
    points: 10.5,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/147.jpg'
  },
  {
    id: '4038',
    name: 'DeVonta Smith',
    position: 'WR',           // Actual NFL position
    fantasySlot: 'WR2',       // Fantasy lineup position
    team: 'PHI',
    college: 'Alabama',
    rank: 12,
    points: 19.3,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4038.jpg'
  },
  {
    id: '515',
    name: 'Dallas Goedert',
    position: 'TE',           // Actual NFL position
    fantasySlot: 'TE',        // Fantasy lineup position
    team: 'PHI',
    college: 'South Dakota State',
    rank: 8,
    points: 6.2,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/515.jpg'
  },
  {
    id: '4149',
    name: 'Quez Watkins',
    position: 'WR',           // Actual NFL position
    fantasySlot: 'Flex1',     // Fantasy lineup position
    team: 'PHI',
    college: 'Southern Miss',
    rank: 65,
    points: 1.2,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4149.jpg'
  },
  {
    id: '2257',
    name: 'Olamide Zaccheaus',
    position: 'WR',           // Actual NFL position
    fantasySlot: 'Flex2',     // Fantasy lineup position
    team: 'PHI',
    college: 'Virginia',
    rank: 85,
    points: 7.3,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/2257.jpg'
  },
  {
    id: '2307',
    name: 'Jake Elliott',
    position: 'K',            // Actual NFL position
    fantasySlot: 'K',         // Fantasy lineup position
    team: 'PHI',
    college: 'Memphis',
    rank: 3,
    points: 10.2,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/2307.jpg'
  },
  // Bench players - Also Eagles
  {
    id: '2309',
    name: 'Marcus Mariota',
    position: 'QB',           // Actual NFL position
    fantasySlot: 'Bench',     // Fantasy lineup position
    team: 'PHI',
    college: 'Oregon',
    rank: 25,
    points: 3.5,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/2309.jpg'
  },
  {
    id: '4035',
    name: 'Rashaad Penny',
    position: 'RB',           // Actual NFL position
    fantasySlot: 'Bench',     // Fantasy lineup position
    team: 'PHI',
    college: 'San Diego State',
    rank: 35,
    points: 1,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/4035.jpg'
  },
  {
    id: '4381',
    name: 'Britain Covey',
    position: 'WR',           // Actual NFL position
    fantasySlot: 'Bench',     // Fantasy lineup position
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
    position: 'TE',           // Actual NFL position
    fantasySlot: 'Bench',     // Fantasy lineup position
    team: 'PHI',
    college: 'SMU',
    rank: 28,
    points: 0,
    projected_points: 0,
    status: 'Active',
    photo_url: 'https://sleepercdn.com/content/nfl/players/thumb/5849.jpg'
  }
];

// Transform fantasy football players to football formation positions
// Now we use fantasySlot for lineup positions, so no transformation needed
export const transformPlayersForFormation = (players: Player[]): Player[] => {
  return players; // No transformation needed since fantasySlot is already set
};
