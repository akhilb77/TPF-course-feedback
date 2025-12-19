import { Course, Review } from '../types';

// Published CSV URL from Google Sheets
const BASE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYOX-ShsAwxP5tYCuY5zHSGs1CFI8Zb7etmYZzHOWdnqxPGfMCapy6vyliFGNRlpfs0IROPxjJBxCr/pub?output=csv";

/**
 * Robust CSV parser that handles commas and newlines inside quotes.
 */
function parseCSV(text: string): { rows: any[], headers: string[] } {
  const result: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(cell.trim());
        cell = '';
      } else if (char === '\n' || (char === '\r' && next === '\n')) {
        row.push(cell.trim());
        if (row.some(val => val !== '')) result.push(row);
        row = [];
        cell = '';
        if (char === '\r') i++;
      } else {
        cell += char;
      }
    }
  }
  
  if (row.length > 0 || cell !== '') {
    row.push(cell.trim());
    if (row.some(val => val !== '')) result.push(row);
  }

  if (result.length < 2) return { rows: [], headers: [] };

  const headers = result[0];
  const rows = result.slice(1).map(r => {
    const obj: any = {};
    headers.forEach((header, idx) => {
      // Store by header name AND by index for easier specific column targeting
      obj[header] = r[idx] || '';
      obj[`__col_${idx}`] = r[idx] || ''; 
    });
    return obj;
  });

  return { rows, headers };
}

/**
 * Standardizes department names to merge variations like CS/CSE and Humanity/Humanities.
 */
const regularizeDepartment = (dept: string): string => {
  if (!dept || dept.trim() === '') return 'General';
  
  const d = dept.trim().toLowerCase();
  
  // CS / CSE mapping
  if (d === 'cs' || d === 'cse' || d.includes('computer science')) {
    return 'CSE';
  }
  
  // Humanity / Humanities mapping
  if (d.includes('humanit')) {
    return 'Humanities';
  }

  // Mechanical
  if (d.includes('mech')) {
    return 'Mechanical Engineering';
  }

  // Electrical
  if (d.includes('elect') || d === 'ee' || d === 'eee') {
    return 'Electrical Engineering';
  }

  // Standard Title Case for others
  return dept.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Advanced Fuzzy matching for column headers.
 */
const findValue = (row: any, searchTerms: string[], columnIndex?: number) => {
  if (!row) return '';
  
  // High priority: Column index
  if (columnIndex !== undefined) {
    const val = row[`__col_${columnIndex}`];
    if (val && val.toString().trim()) return val.toString().trim();
  }

  const keys = Object.keys(row).filter(k => !k.startsWith('__col_'));
  
  for (const term of searchTerms) {
    const normSearch = term.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Exact match check
    const exactMatch = keys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === normSearch);
    if (exactMatch && row[exactMatch]?.toString().trim()) return row[exactMatch].toString().trim();

    // Partial match check
    const partialMatch = keys.find(k => {
      const normKey = k.toLowerCase().replace(/[^a-z0-9]/g, '');
      return normKey.includes(normSearch) || normSearch.includes(normKey);
    });

    if (partialMatch && row[partialMatch]?.toString().trim()) {
      return row[partialMatch].toString().trim();
    }
  }
  return '';
};

/**
 * Validates if the year text actually looks like a year of study.
 * Rejects conversational junk like "Nah, its chill".
 */
const validateYear = (text: string): string => {
  if (!text || text.trim() === '') return 'N/A';
  
  const normalized = text.toLowerCase().trim();
  
  // If it's literally "N/A"
  if (normalized === 'n/a') return 'N/A';

  // Specific check for common year strings
  const yearPattern = /^(1st|2nd|3rd|4th|first|second|third|fourth|freshman|sophomore|junior|senior|year\s*[1-4]|[1-4]\s*year|yr\s*[1-4]|[1-4])$/;
  
  if (yearPattern.test(normalized)) {
    // Return a cleaned up capitalized version
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }

  // Look for any digit 1-4. If the string contains a digit and isn't too long, it might be a year
  const digitMatch = normalized.match(/[1-4]/);
  if (digitMatch && normalized.length <= 10) {
    // If it's just a digit, return as "Year X"
    if (/^[1-4]$/.test(normalized)) return `Year ${normalized}`;
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
  
  return 'N/A';
};

export async function fetchLiveReviews(): Promise<{ courses: Course[], reviews: Review[] }> {
  try {
    const response = await fetch(`${BASE_SHEET_URL}&cache_ts=${Date.now()}`);
    if (!response.ok) throw new Error("Sheet fetch failed");
    
    const csvText = await response.text();
    const { rows: rawData, headers } = parseCSV(csvText);

    if (rawData.length === 0) return { courses: [], reviews: [] };

    const reviews: Review[] = rawData.map((row, index) => {
      const courseName = findValue(row, ["nameofthecourse", "course", "subject", "title", "coursename", "whichcourse"]);
      // Column J is index 9
      const deptRaw = findValue(row, ["department", "dept", "chooseyourdepartment"], 9);
      const ratingRaw = findValue(row, ["howeasyisthecourse", "gradingisfair", "easiness", "rating", "easy", "difficulty"]);
      
      const yearRaw = findValue(row, ["currentyearofstudy", "year", "batch", "class", "studyyear", "whichyearareyouin", "youryear"]);

      return {
        id: `r-${index}-${Date.now()}`,
        courseId: courseName || 'Unknown Course',
        reviewerName: 'Anonymous',
        rating: parseInt(ratingRaw) || 3,
        teachingMethod: findValue(row, ["methodofteaching", "teachingstyle", "instruction", "teaching"]),
        examStructure: findValue(row, ["examstructure", "paperpattern", "assessments", "exam"]),
        leniency: findValue(row, ["leniencyofcourse", "strictness", "gradingleniency", "leniency"]),
        gradingComments: findValue(row, ["additionalcommentsaboutthegrading", "gradingpattern", "gradingdetails", "remarks", "paperpattern"]),
        extraClasses: findValue(row, ["extraclasses", "additionalclasses", "extra"]),
        comment: findValue(row, ["anythingyouwannasayaboutthecourse", "feedback", "generalcomments", "comment"]),
        timestamp: row['Timestamp'] || new Date().toLocaleString(),
        yearOfStudy: validateYear(yearRaw),
        section: findValue(row, ["section", "group", "div", "batch"]),
        department: regularizeDepartment(deptRaw)
      };
    });

    const validReviews = reviews.filter(r => r.courseId !== 'Unknown Course' && r.courseId.trim() !== '');
    const uniqueCourseNames = Array.from(new Set(validReviews.map(r => r.courseId)));
    
    const courses: Course[] = uniqueCourseNames.map(name => {
      const courseReviews = validReviews.filter(r => r.courseId === name);
      const avgRating = courseReviews.reduce((acc, curr) => acc + curr.rating, 0) / courseReviews.length;
      
      const findMetadata = (terms: string[], index?: number) => {
        for (const review of courseReviews) {
          const originalRow = rawData.find(row => 
            findValue(row, ["nameofthecourse", "course"]) === name
          );
          const val = findValue(originalRow, terms, index);
          if (val && val !== 'General' && val !== '0' && val !== 'N/A') return val;
        }
        return '';
      };

      const deptVal = findMetadata(["department", "dept", "chooseyourdepartment"], 9);
      const instructorVal = findMetadata(["instructor", "professor", "teacher", "faculty", "taughtby", "proff"]);

      return {
        id: name,
        code: name.split(' ')[0]?.toUpperCase() || name,
        name: name,
        department: regularizeDepartment(deptVal),
        instructor: instructorVal || "Various",
        credits: 3,
        description: `Feedback aggregation for ${name}.`,
        averageRating: avgRating,
        difficulty: 6 - avgRating
      };
    });

    return { courses, reviews: validReviews };
  } catch (error) {
    console.error("Error loading live reviews:", error);
    return { courses: [], reviews: [] };
  }
}
