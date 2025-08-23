import { Player } from '../types/Player';

// Define valid positions for each fantasy slot
export const VALID_POSITIONS: Record<string, string[]> = {
  'QB': ['QB'],
  'RB1': ['RB'],
  'RB2': ['RB'],
  'WR1': ['WR'],
  'WR2': ['WR'],
  'TE': ['TE'],
  'Flex1': ['RB', 'WR', 'TE'],
  'Flex2': ['RB', 'WR', 'TE'],
  'K': ['K'],
  'Bench': ['QB', 'RB', 'WR', 'TE', 'K']
};

// Check if a player can be placed in a specific fantasy slot
export const canPlayerPlayPosition = (player: Player, fantasySlot: string): boolean => {
  const validPositions = VALID_POSITIONS[fantasySlot];
  if (!validPositions) return false;
  
  return validPositions.includes(player.position);
};

// Get all valid fantasy slots for a player
export const getValidFantasySlots = (player: Player): string[] => {
  return Object.entries(VALID_POSITIONS)
    .filter(([slot, positions]) => positions.includes(player.position))
    .map(([slot]) => slot);
};
