import { Player, SleeperPlayer } from '../types/Player';

interface SleeperRoster {
  owner_id: string;
  starters: string[];
  players: string[];
  roster_id: number;
}

export class SleeperAPI {
  private static baseUrl = 'https://api.sleeper.app/v1';
  private static leagueId = '1180234285068509184';
  
  // Rate limiting protection
  private static lastApiCall = 0;
  private static minInterval = 1000; // 1 second between calls

  // Get a specific user's team from the league rosters
  static async getUserTeam(userId?: string): Promise<Player[]> {
    try {
      // Rate limiting check
      const now = Date.now();
      if (now - this.lastApiCall < this.minInterval) {
        throw new Error('API calls too frequent. Please wait before making another request.');
      }
      this.lastApiCall = now;
      
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
      
      const rosters: SleeperRoster[] = await rostersResponse.json();
      console.log('Rosters received:', rosters);

      // Find the specific user's roster
      let userRoster;
      if (userId) {
        userRoster = rosters.find(roster => roster.owner_id === userId);
        if (!userRoster) {
          throw new Error(`No roster found for user ID: ${userId}`);
        }
        console.log('Using user roster:', userRoster);
      } else {
        // Fallback to first roster if no userId provided
        userRoster = rosters[0];
        if (!userRoster) {
          throw new Error('No rosters found in league');
        }
        console.log('Using first roster (fallback):', userRoster);
      }

      // Get starters and all players from the roster
      const starterIds = userRoster.starters || [];
      const allRosterPlayerIds = userRoster.players || [];
      
      console.log('Starter IDs found:', starterIds);
      console.log('All roster player IDs:', allRosterPlayerIds);

      // Load player details from local JSON file
      const allPlayers = await this.getPlayersFromLocal();
      
      // Map starters to fantasy slots in order
      const fantasySlotOrder = ['QB', 'RB1', 'RB2', 'WR1', 'WR2', 'TE', 'Flex1', 'Flex2', 'K'];
      const players: Player[] = [];
      
      // Add starters with fantasy slots
      for (let i = 0; i < starterIds.length && i < fantasySlotOrder.length; i++) {
        const playerId = starterIds[i];
        const fantasySlot = fantasySlotOrder[i];
        const sleeperPlayer = allPlayers[playerId];
        
        if (sleeperPlayer) {
          const player = this.transformPlayers({ [playerId]: sleeperPlayer })[0];
          // Set fantasy slot while keeping original position
          player.fantasySlot = fantasySlot;
          players.push(player);
        }
      }
      
      // Add bench players (players not in starters array)
      const benchPlayerIds = allRosterPlayerIds.filter(id => !starterIds.includes(id));
      console.log('Bench player IDs found:', benchPlayerIds);
      
      for (const playerId of benchPlayerIds) {
        const sleeperPlayer = allPlayers[playerId];
        
        if (sleeperPlayer) {
          const player = this.transformPlayers({ [playerId]: sleeperPlayer })[0];
          // Set fantasy slot to 'Bench' for bench players
          player.fantasySlot = 'Bench';
          players.push(player);
        }
      }

      console.log('Total players found (starters + bench):', players.length);
      console.log('Starters:', players.filter(p => p.position !== 'Bench').length);
      console.log('Bench players:', players.filter(p => p.position === 'Bench').length);
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
      position: sleeperPlayer.position, // Actual NFL position: QB, RB, WR, TE, K
      fantasySlot: '', // Will be set by caller based on fantasy lineup
      team: sleeperPlayer.team, // This should work as is
      rank: sleeperPlayer.search_rank, // Map from search_rank
      points: sleeperPlayer.fantasy_points || 0, // Default to 0 if not present
      projected_points: sleeperPlayer.projected_fantasy_points || 0, // Default to 0 if not present
      status: sleeperPlayer.status,
      injury_status: sleeperPlayer.injury_status,
      photo_url: `https://sleepercdn.com/content/nfl/players/thumb/${sleeperPlayer.player_id}.jpg`,
      college: sleeperPlayer.college,
    }));
  }
}
