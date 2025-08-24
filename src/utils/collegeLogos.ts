interface CollegeLogoData {
  id: string;
  school: string;
  mascot: string;
  abbreviation: string;
  alt_name1: string;
  alt_name2: string;
  alt_name3: string;
  conference: string;
  division: string;
  color: string;
  alt_color: string;
  logo: string;
  logos: string;
}

let collegeLogosData: CollegeLogoData[] | null = null;

export const loadCollegeLogos = async (): Promise<CollegeLogoData[]> => {
  if (collegeLogosData) {
    return collegeLogosData;
  }

  try {
    const response = await fetch('/college_logos.csv');
    const csvText = await response.text();
    
    // Parse CSV (simple parsing for this use case)
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    collegeLogosData = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',');
        const data: any = {};
        headers.forEach((header, index) => {
          data[header.trim()] = values[index]?.trim() || '';
        });
        return data as CollegeLogoData;
      });
    
    return collegeLogosData;
  } catch (error) {
    console.error('Failed to load college logos:', error);
    return [];
  }
};

export const findCollegeLogo = (collegeName: string): string | null => {
  if (!collegeLogosData || !collegeName) {
    return null;
  }

  // Try exact match first
  let match = collegeLogosData.find(college => 
    college.school.toLowerCase() === collegeName.toLowerCase()
  );

  if (match && match.logo) {
    return match.logo;
  }

  // Try alternative names
  match = collegeLogosData.find(college => 
    college.alt_name1?.toLowerCase() === collegeName.toLowerCase() ||
    college.alt_name2?.toLowerCase() === collegeName.toLowerCase() ||
    college.alt_name3?.toLowerCase() === collegeName.toLowerCase()
  );

  if (match && match.logo) {
    return match.logo;
  }

  // Try partial matches for common variations
  const normalizedCollegeName = collegeName.toLowerCase()
    .replace(/university|college|institute|tech|state|st\.?/gi, '')
    .trim();

  match = collegeLogosData.find(college => {
    const normalizedSchool = college.school.toLowerCase()
      .replace(/university|college|institute|tech|state|st\.?/gi, '')
      .trim();
    return normalizedSchool === normalizedCollegeName;
  });

  if (match && match.logo) {
    return match.logo;
  }

  // Try abbreviation match
  match = collegeLogosData.find(college => 
    college.abbreviation?.toLowerCase() === collegeName.toLowerCase()
  );

  if (match && match.logo) {
    return match.logo;
  }

  return null;
};

export const getCollegeDisplayInfo = (collegeName: string): { logoUrl: string | null; displayName: string } => {
  const logoUrl = findCollegeLogo(collegeName);
  return {
    logoUrl,
    displayName: collegeName
  };
};
