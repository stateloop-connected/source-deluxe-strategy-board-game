// Official Ludo Game Engine & Board Path Mapping

export const PLAYERS = ['yellow', 'blue', 'red', 'green'];

export const PLAYER_CONFIG = {
  yellow: {
    id: 'yellow',
    name: 'Yellow',
    bg: '#F9B208',
    text: '#8A5C00',
    border: '#E69D00',
    startTrackIndex: 0, // Starts at track[0] = (6,1)
    homeEntryStep: 51,
  },
  blue: {
    id: 'blue',
    name: 'Blue',
    bg: '#1B86FF',
    text: '#00479E',
    border: '#0056BD',
    startTrackIndex: 13, // Starts at track[13] = (1,8)
    homeEntryStep: 51,
  },
  red: {
    id: 'red',
    name: 'Red',
    bg: '#E53935',
    text: '#8E1714',
    border: '#B71C1C',
    startTrackIndex: 26, // Starts at track[26] = (8,13)
    homeEntryStep: 51,
  },
  green: {
    id: 'green',
    name: 'Green',
    bg: '#22A349',
    text: '#0E5C25',
    border: '#147A33',
    startTrackIndex: 39, // Starts at track[39] = (13,6)
    homeEntryStep: 51,
  },
};

// 52 Coordinates around the standard 15x15 Ludo board (row, col)
export const TRACK_COORDINATES = [
  // Left arm (Yellow exit, moves right) - indices 0 to 4
  { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
  // Top-left vertical climb - indices 5 to 10
  { r: 5, c: 6 }, { r: 4, c: 6 }, { r: 3, c: 6 }, { r: 2, c: 6 }, { r: 1, c: 6 }, { r: 0, c: 6 },
  // Top turn - indices 11, 12
  { r: 0, c: 7 }, { r: 0, c: 8 },
  // Top-right vertical descent (Blue exit at index 13) - indices 13 to 17
  { r: 1, c: 8 }, { r: 2, c: 8 }, { r: 3, c: 8 }, { r: 4, c: 8 }, { r: 5, c: 8 },
  // Right arm top row - indices 18 to 23
  { r: 6, c: 9 }, { r: 6, c: 10 }, { r: 6, c: 11 }, { r: 6, c: 12 }, { r: 6, c: 13 }, { r: 6, c: 14 },
  // Right turn - indices 24, 25
  { r: 7, c: 14 }, { r: 8, c: 14 },
  // Right arm bottom row (Red exit at index 26) - indices 26 to 30
  { r: 8, c: 13 }, { r: 8, c: 12 }, { r: 8, c: 11 }, { r: 8, c: 10 }, { r: 8, c: 9 },
  // Bottom-right vertical descent - indices 31 to 36
  { r: 9, c: 8 }, { r: 10, c: 8 }, { r: 11, c: 8 }, { r: 12, c: 8 }, { r: 13, c: 8 }, { r: 14, c: 8 },
  // Bottom turn - indices 37, 38
  { r: 14, c: 7 }, { r: 14, c: 6 },
  // Bottom-left vertical climb (Green exit at index 39) - indices 39 to 43
  { r: 13, c: 6 }, { r: 12, c: 6 }, { r: 11, c: 6 }, { r: 10, c: 6 }, { r: 9, c: 6 },
  // Left arm bottom row - indices 44 to 49
  { r: 8, c: 5 }, { r: 8, c: 4 }, { r: 8, c: 3 }, { r: 8, c: 2 }, { r: 8, c: 1 }, { r: 8, c: 0 },
  // Left turn - indices 50, 51
  { r: 7, c: 0 }, { r: 6, c: 0 },
];

// Colored 5-step Home straight columns for each color leading into center
export const HOME_PATHS = {
  yellow: [
    { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 },
  ],
  blue: [
    { r: 1, c: 7 }, { r: 2, c: 7 }, { r: 3, c: 7 }, { r: 4, c: 7 }, { r: 5, c: 7 }, { r: 6, c: 7 },
  ],
  red: [
    { r: 7, c: 13 }, { r: 7, c: 12 }, { r: 7, c: 11 }, { r: 7, c: 10 }, { r: 7, c: 9 }, { r: 7, c: 8 },
  ],
  green: [
    { r: 13, c: 7 }, { r: 12, c: 7 }, { r: 11, c: 7 }, { r: 10, c: 7 }, { r: 9, c: 7 }, { r: 8, c: 7 },
  ],
};

// Safe squares (Stars on track) where pawns cannot be captured
export const SAFE_TRACK_INDICES = [
  0,  // Yellow start (6,1)
  8,  // Star in yellow quadrant (2,6)
  13, // Blue start (1,8)
  21, // Star in blue quadrant (6,12)
  26, // Red start (8,13)
  34, // Star in red quadrant (12,8)
  39, // Green start (13,6)
  47, // Star in green quadrant (8,2)
];

// Yard / Base spawn slots for 4 pawns per color (row, col)
export const YARD_SLOTS = {
  yellow: [
    { r: 2, c: 2 }, { r: 2, c: 3 },
    { r: 3, c: 2 }, { r: 3, c: 3 },
  ],
  blue: [
    { r: 2, c: 11 }, { r: 2, c: 12 },
    { r: 3, c: 11 }, { r: 3, c: 12 },
  ],
  green: [
    { r: 11, c: 2 }, { r: 11, c: 3 },
    { r: 12, c: 2 }, { r: 12, c: 3 },
  ],
  red: [
    { r: 11, c: 11 }, { r: 11, c: 12 },
    { r: 12, c: 11 }, { r: 12, c: 12 },
  ],
};

/**
 * Returns the exact (r, c) board coordinate for a pawn given its color, step (0..57), and pawn index (0..3).
 */
export function getPawnCoordinate(color, step, pawnIndex = 0) {
  // Step 0: In Yard
  if (step === 0) {
    return YARD_SLOTS[color][pawnIndex] || { r: 7, c: 7 };
  }

  // Step 1 to 51: On perimeter track
  if (step >= 1 && step <= 51) {
    const startIndex = PLAYER_CONFIG[color].startTrackIndex;
    const trackIndex = (startIndex + (step - 1)) % 52;
    return TRACK_COORDINATES[trackIndex];
  }

  // Step 52 to 56: In colored home column
  if (step >= 52 && step <= 56) {
    const homeIdx = step - 52;
    return HOME_PATHS[color][homeIdx] || { r: 7, c: 7 };
  }

  // Step 57: In Center Goal (Home)
  return HOME_PATHS[color][5] || { r: 7, c: 7 };
}

/**
 * Determines whether a pawn on the track is at a safe square.
 */
export function isPawnSafe(color, step) {
  if (step === 0 || step >= 52) return true; // Yard or Home path is safe
  const startIndex = PLAYER_CONFIG[color].startTrackIndex;
  const trackIndex = (startIndex + (step - 1)) % 52;
  return SAFE_TRACK_INDICES.includes(trackIndex);
}

/**
 * Checks if a specific pawn can move with the rolled dice value.
 */
export function canPawnMove(step, dice) {
  if (step === 0) {
    return dice === 6; // Requires 6 to emerge from yard
  }
  return step + dice <= 57; // Cannot overshoot home
}
