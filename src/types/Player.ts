export interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  rank?: number;
  points?: number;
  projected_points?: number;
  status?: string;
  injury_status?: string;
  photo_url?: string;
  college?: string;
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
