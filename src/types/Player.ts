export interface Player {
  id: string;
  name: string;
  position: string;        // Actual NFL position: QB, RB, WR, TE, K
  fantasySlot: string;     // Fantasy lineup position: QB, RB1, RB2, WR1, WR2, TE, Flex1, Flex2, K
  team: string;
  rank?: number;
  points?: number;
  projected_points?: number;
  status?: string;
  injury_status?: string;
  photo_url?: string;
  college?: string;
  multiplier?: number;
}

export interface SleeperPlayer {
  player_id: string;
  full_name: string;
  position: string;
  team: string;
  search_rank?: number;
  fantasy_points?: number;
  projected_fantasy_points?: number;
  status?: string;
  injury_status?: string;
  photo_url?: string;
  college?: string;
}
