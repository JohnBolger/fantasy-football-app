import { Player, SleeperPlayer } from '../types/Player';

export class SleeperAPI {
  private static baseUrl = 'https://api.sleeper.app/v1';
  private static leagueId = '1180234285068509184';

  // Get the first team from the league rosters
  static async getFirstTeam(): Promise<Player[]> {
    try {
      // Get rosters from API to get current team assignments
      const rosterUrl = `${this.baseUrl}/league/${this.leagueId}/rosters`;
      console.log('Fetching rosters from:', rosterUrl);
      
      const rostersResponse = await fetch(rosterUrl);
      console.log('Roster response status:', rostersResponse.status);
      console.log('Roster response headers:', rostersResponse.headers);
      
      if (!rostersResponse.ok) {
        const errorText = await rostersResponse.text();
        console.error('Roster error response body:', errorText);
        throw new Error(`Failed to fetch roster data: ${rostersResponse.status} ${rostersResponse.statusText}`);
      }
      
      // Check if response is actually JSON
      const contentType = rostersResponse.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await rostersResponse.text();
        console.error('Response is not JSON. Content-Type:', contentType);
        console.error('Response body:', responseText);
        throw new Error('API returned non-JSON response');
      }
      
      const rosters = await rostersResponse.json();
      console.log('Rosters received:', rosters);

      // Get the first roster (first team in the league)
      const firstRoster = rosters[0];
      if (!firstRoster) {
        throw new Error('No rosters found in league');
      }
      
      console.log('Using first roster:', firstRoster);

      // Get only the starters from the roster (in order: QB, RB1, RB2, WR1, WR2, Flex1, Flex2, TE)
      const starterIds = firstRoster.starters || [];
      
      console.log('Starter IDs found:', starterIds);

      // Load player details from local JSON file
      const allPlayers = await this.getPlayersFromLocal();
      
      // Map starters to positions in order
      const positionOrder = ['QB', 'RB1', 'RB2', 'WR1', 'WR2', 'TE', 'Flex1', 'Flex2', 'K'];
      const players: Player[] = [];
      
      for (let i = 0; i < starterIds.length && i < positionOrder.length; i++) {
        const playerId = starterIds[i];
        const position = positionOrder[i];
        const sleeperPlayer = allPlayers[playerId];
        
        if (sleeperPlayer) {
          const player = this.transformPlayers({ [playerId]: sleeperPlayer })[0];
          // Override the position with our mapped position
          player.position = position;
          players.push(player);
        }
      }

      console.log('Players found in local data:', players);
      return players;
    } catch (error) {
      console.error('Error in getFirstTeam:', error);
      throw error;
    }
  }

  // Load all players from local JSON file
  static async getPlayersFromLocal(): Promise<Record<string, SleeperPlayer>> {
    try {
      console.log('Attempting to fetch players.json from /players.json');
      const response = await fetch('/players.json');
      console.log('Local players response status:', response.status);
      console.log('Local players response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Local players error response body:', errorText);
        throw new Error(`Failed to fetch local players data: ${response.status} ${response.statusText}`);
      }
      
      // Check if response is actually JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Local players response is not JSON. Content-Type:', contentType);
        console.error('Local players response body:', responseText);
        throw new Error('Local players file returned non-JSON response');
      }
      
      const data = await response.json();
      console.log('Local players data loaded successfully. Player count:', Object.keys(data).length);
      return data;
    } catch (error) {
      console.error('Error loading local players:', error);
      throw error;
    }
  }

  // Get user's leagues for the current year
  static async getUserLeagues(userId: string): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/user/${userId}/leagues/nfl/${new Date().getFullYear()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user leagues');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getUserLeagues:', error);
      throw error;
    }
  }

  // Get league info for the specific league
  static async getLeagueInfo(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/league/${this.leagueId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch league data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getLeagueInfo:', error);
      throw error;
    }
  }

  // Get user info by username
  static async getUserByUsername(username: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/user/${username}`;
      console.log('Fetching user info from:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('User data received:', data);
      return data;
    } catch (error) {
      console.error('Error in getUserByUsername:', error);
      throw error;
    }
  }

  // Transform Sleeper player data to our Player interface
  private static transformPlayers(sleeperPlayers: Record<string, SleeperPlayer>): Player[] {
    return Object.values(sleeperPlayers).map(sleeperPlayer => ({
      id: sleeperPlayer.player_id,
      name: sleeperPlayer.full_name, // Map from full_name
      position: sleeperPlayer.position,
      team: sleeperPlayer.team, // This should work as is
      rank: sleeperPlayer.search_rank, // Map from search_rank
      points: sleeperPlayer.fantasy_points || 0, // Default to 0 if not present
      projected_points: sleeperPlayer.projected_fantasy_points || 0, // Default to 0 if not present
      status: sleeperPlayer.status,
      injury_status: sleeperPlayer.injury_status,
      photo_url: sleeperPlayer.photo_url,
      college: sleeperPlayer.college,
    }));
  }
}
