interface NFLTeamLogoData {
  team_abbr: string;
  team_name: string;
  team_id: string;
  team_nick: string;
  team_conf: string;
  team_division: string;
  team_color: string;
  team_color2: string;
  team_color3: string;
  team_color4: string;
  team_logo_wikipedia: string;
  team_logo_espn: string;
  team_wordmark: string;
  team_conference_logo: string;
  team_league_logo: string;
  team_logo_squared: string;
}

let nflTeamLogosData: NFLTeamLogoData[] | null = null;

export const loadNFLTeamLogos = async (): Promise<NFLTeamLogoData[]> => {
  if (nflTeamLogosData) {
    console.log('Returning cached NFL team logos data');
    return nflTeamLogosData;
  }

  try {
    console.log('Loading NFL team logos from CSV...');
    const csvUrl = '/NFL_logos.csv';
    console.log('Fetching from URL:', csvUrl);
    
    const response = await fetch(csvUrl);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('CSV loaded, length:', csvText.length);
    
    // Parse CSV with simple comma splitting (no quoted values in this format)
    const lines = csvText.split('\n').filter(line => line.trim());
    console.log('Number of lines:', lines.length);
    
    if (lines.length < 2) {
      throw new Error('CSV file is empty or has no data rows');
    }
    
    const headers = lines[0].split(',').map(h => h.trim());
    console.log('CSV headers:', headers);
    
    nflTeamLogosData = lines.slice(1)
      .filter(line => line.trim())
      .map((line, index) => {
        try {
          const values = line.split(',').map(v => v.trim());
          const data: any = {};
          
          headers.forEach((header, headerIndex) => {
            data[header] = values[headerIndex] || '';
          });
          
          return data as NFLTeamLogoData;
        } catch (rowError) {
          console.error(`Error parsing row ${index + 1}:`, line, rowError);
          return null;
        }
      })
      .filter(Boolean) as NFLTeamLogoData[];
    
    console.log('Successfully parsed NFL team logos:', nflTeamLogosData.length, 'teams');
    console.log('Sample team data:', nflTeamLogosData[0]);
    
    return nflTeamLogosData;
  } catch (error) {
    console.error('Failed to load NFL team logos:', error);
    return [];
  }
};

export const findNFLTeamLogo = (teamName: string): string | null => {
  if (!nflTeamLogosData || !teamName) {
    console.log('findNFLTeamLogo: No data or team name', { nflTeamLogosData: !!nflTeamLogosData, teamName });
    return null;
  }

  console.log('Searching for team logo:', teamName);

  // Try exact match with team_abbr first (this should work for most cases)
  let match = nflTeamLogosData.find(team => 
    team.team_abbr?.toLowerCase() === teamName.toLowerCase()
  );

  if (match && match.team_logo_espn) {
    console.log('Found team_abbr match:', match.team_abbr, 'Logo:', match.team_logo_espn);
    return match.team_logo_espn;
  }

  // Try exact match with team_name
  match = nflTeamLogosData.find(team => 
    team.team_name?.toLowerCase() === teamName.toLowerCase()
  );

  if (match && match.team_logo_espn) {
    console.log('Found team_name match:', match.team_name, 'Logo:', match.team_logo_espn);
    return match.team_logo_espn;
  }

  // Try partial matches for common variations
  const normalizedTeamName = teamName.toLowerCase()
    .replace(/football|team|club/gi, '')
    .trim();

  match = nflTeamLogosData.find(team => {
    const normalizedTeam = team.team_name?.toLowerCase()
      .replace(/football|team|club/gi, '')
      .trim();
    return normalizedTeam === normalizedTeamName;
  });

  if (match && match.team_logo_espn) {
    console.log('Found partial match:', match.team_name, 'Logo:', match.team_logo_espn);
    return match.team_logo_espn;
  }

  console.log('No logo found for team:', teamName);
  return null;
};

export const findNFLTeamColors = (teamName: string): { primary: string; secondary: string } | null => {
  if (!nflTeamLogosData || !teamName) {
    return null;
  }

  // Try exact match with team_abbr first
  let match = nflTeamLogosData.find(team => 
    team.team_abbr?.toLowerCase() === teamName.toLowerCase()
  );

  if (match && match.team_color) {
    return {
      primary: match.team_color,
      secondary: match.team_color2 || match.team_color
    };
  }

  // Try exact match with team_name
  match = nflTeamLogosData.find(team => 
    team.team_name?.toLowerCase() === teamName.toLowerCase()
  );

  if (match && match.team_color) {
    return {
      primary: match.team_color,
      secondary: match.team_color2 || match.team_color
    };
  }

  return null;
};

export const getNFLTeamDisplayInfo = (teamName: string): { logoUrl: string | null; displayName: string; colors: { primary: string; secondary: string } | null } => {
  const logoUrl = findNFLTeamLogo(teamName);
  const colors = findNFLTeamColors(teamName);
  console.log('getNFLTeamDisplayInfo result:', { teamName, logoUrl, colors });
  return {
    logoUrl,
    displayName: teamName,
    colors
  };
};

