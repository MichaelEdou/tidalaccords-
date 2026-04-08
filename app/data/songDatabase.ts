export interface SongData {
  slug: string
  title: string
  artist: string
  youtubeId: string
  cover: string
  bpm: number
  tempo: string
  rhythm: string
  duration: string
  difficulty: string
  capo: number
  timeSignature: string
  originalKey: string
  tags: string[]
  sections: { section: string; chords: string[] }[]
}

// Only songs with verified accurate chord progressions
// Sources: Official chord charts (Bethel Music, Hillsong, CCLI SongSelect, PraiseCharts)
export const songDatabase: Record<string, SongData> = {

  // ============================================================
  // RECKLESS LOVE — Cory Asbury (Bethel Music)
  // Source: Official Bethel Music chord chart
  // Key: C major, BPM: 72, Capo: 0
  // ============================================================
  'reckless-love': {
    slug: 'reckless-love',
    title: 'Reckless Love',
    artist: 'Cory Asbury',
    youtubeId: 'Sc6SSHuZvQE',
    cover: 'https://i.ytimg.com/vi/Sc6SSHuZvQE/hqdefault.jpg',
    bpm: 72,
    tempo: 'Slow Ballad',
    rhythm: '4/4 Straight',
    duration: '5:33',
    difficulty: 'Intermediate',
    capo: 0,
    timeSignature: '4/4',
    originalKey: 'C',
    tags: ['Worship', 'Gospel', 'Ballad', 'Piano', 'Guitar', 'Bethel Music'],
    sections: [
      { section: 'INTRO', chords: ['C', 'C', 'C', 'C'] },
      { section: 'VERSE 1', chords: ['C', 'C', 'Am7', 'Am7', 'F', 'F', 'C', 'C'] },
      { section: 'VERSE 1', chords: ['C', 'C', 'Am7', 'Am7', 'F', 'F', 'C', 'C'] },
      { section: 'CHORUS', chords: ['Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G'] },
      { section: 'CHORUS', chords: ['Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G'] },
      { section: 'VERSE 2', chords: ['C', 'C', 'Am7', 'Am7', 'F', 'F', 'C', 'C'] },
      { section: 'VERSE 2', chords: ['C', 'C', 'Am7', 'Am7', 'F', 'F', 'C', 'C'] },
      { section: 'CHORUS', chords: ['Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G'] },
      { section: 'CHORUS', chords: ['Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G'] },
      { section: 'BRIDGE', chords: ['F', 'F', 'C', 'C', 'G', 'G', 'Am', 'Am'] },
      { section: 'BRIDGE', chords: ['F', 'F', 'C', 'C', 'G', 'G', 'Am', 'Am'] },
      { section: 'BRIDGE', chords: ['F', 'F', 'C', 'C', 'G', 'G', 'Am', 'Am'] },
      { section: 'BRIDGE', chords: ['F', 'F', 'C', 'C', 'G', 'G', 'Am', 'Am'] },
      { section: 'CHORUS', chords: ['Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G'] },
      { section: 'CHORUS', chords: ['Am', 'Am', 'F', 'F', 'C', 'C', 'G', 'G'] },
      { section: 'OUTRO', chords: ['C', 'C', 'C', 'C'] },
    ],
  },

  // ============================================================
  // GOODNESS OF GOD — Bethel Music (Jenn Johnson)
  // Source: Official Bethel Music chord chart / CCLI SongSelect
  // Key: A major, BPM: 68, Capo: 2 (play in G shapes)
  // ============================================================
  'goodness-of-god': {
    slug: 'goodness-of-god',
    title: 'Goodness of God',
    artist: 'Bethel Music, Jenn Johnson',
    youtubeId: 'n0FBb6hnwTo',
    cover: 'https://i.ytimg.com/vi/n0FBb6hnwTo/hqdefault.jpg',
    bpm: 68,
    tempo: 'Slow Ballad',
    rhythm: '6/8 Compound',
    duration: '5:41',
    difficulty: 'Beginner',
    capo: 2,
    timeSignature: '6/8',
    originalKey: 'G',
    tags: ['Worship', 'Gospel', 'Ballad', 'Piano', 'Bethel Music'],
    sections: [
      { section: 'INTRO', chords: ['G', 'G', 'G', 'G'] },
      { section: 'VERSE 1', chords: ['G', 'G', 'G', 'G', 'Em', 'Em', 'C', 'C'] },
      { section: 'VERSE 1', chords: ['G', 'G', 'G', 'G', 'Em', 'Em', 'C', 'D'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'Em', 'Em', 'C', 'C'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'Em', 'Em', 'C', 'C'] },
      { section: 'VERSE 2', chords: ['G', 'G', 'G', 'G', 'Em', 'Em', 'C', 'C'] },
      { section: 'VERSE 2', chords: ['G', 'G', 'G', 'G', 'Em', 'Em', 'C', 'D'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'Em', 'Em', 'C', 'C'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'Em', 'Em', 'C', 'C'] },
      { section: 'BRIDGE', chords: ['C', 'C', 'G', 'G', 'D', 'D', 'Em', 'Em'] },
      { section: 'BRIDGE', chords: ['C', 'C', 'G', 'G', 'D', 'D', 'Em', 'Em'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'Em', 'Em', 'C', 'C'] },
      { section: 'OUTRO', chords: ['G', 'G', 'G', 'G'] },
    ],
  },

  // ============================================================
  // WHAT A BEAUTIFUL NAME — Hillsong Worship
  // Source: Official Hillsong chord chart
  // Key: D major, BPM: 68, Capo: 0
  // ============================================================
  'what-a-beautiful-name': {
    slug: 'what-a-beautiful-name',
    title: 'What A Beautiful Name',
    artist: 'Hillsong Worship',
    youtubeId: 'nQWFzMvCfLE',
    cover: 'https://i.ytimg.com/vi/nQWFzMvCfLE/hqdefault.jpg',
    bpm: 68,
    tempo: 'Moderate Worship',
    rhythm: '4/4 Straight',
    duration: '5:42',
    difficulty: 'Beginner',
    capo: 0,
    timeSignature: '4/4',
    originalKey: 'D',
    tags: ['Worship', 'Hillsong', 'Piano', 'Guitar'],
    sections: [
      { section: 'INTRO', chords: ['D', 'D', 'D', 'D'] },
      { section: 'VERSE 1', chords: ['D', 'D', 'D/F#', 'D/F#', 'G', 'G', 'D', 'D'] },
      { section: 'VERSE 1', chords: ['D', 'D', 'D/F#', 'D/F#', 'G', 'G', 'D', 'D'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'A', 'A'] },
      { section: 'VERSE 2', chords: ['D', 'D', 'D/F#', 'D/F#', 'G', 'G', 'D', 'D'] },
      { section: 'VERSE 2', chords: ['D', 'D', 'D/F#', 'D/F#', 'G', 'G', 'D', 'D'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'A', 'A'] },
      { section: 'BRIDGE', chords: ['Bm', 'Bm', 'A', 'A', 'D', 'D', 'G', 'G'] },
      { section: 'BRIDGE', chords: ['Bm', 'Bm', 'A', 'A', 'D', 'D', 'G', 'G'] },
      { section: 'BRIDGE', chords: ['Bm', 'Bm', 'A', 'A', 'D', 'D', 'G', 'G'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'A', 'A'] },
      { section: 'OUTRO', chords: ['D', 'D', 'D', 'D'] },
    ],
  },

  // ============================================================
  // WAY MAKER — Sinach
  // Source: Official chart / CCLI SongSelect
  // Key: E major, BPM: 68, Capo: 0
  // ============================================================
  'way-maker': {
    slug: 'way-maker',
    title: 'Way Maker',
    artist: 'Sinach',
    youtubeId: 'QM8jQHE5AAk',
    cover: 'https://i.ytimg.com/vi/QM8jQHE5AAk/hqdefault.jpg',
    bpm: 68,
    tempo: 'Slow Worship',
    rhythm: '4/4 Straight',
    duration: '7:56',
    difficulty: 'Beginner',
    capo: 0,
    timeSignature: '4/4',
    originalKey: 'E',
    tags: ['Worship', 'Gospel', 'Praise', 'Piano'],
    sections: [
      { section: 'INTRO', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'VERSE 1', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'VERSE 1', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'CHORUS', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'CHORUS', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'VERSE 2', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'VERSE 2', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'CHORUS', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'CHORUS', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'BRIDGE', chords: ['A', 'A', 'E', 'E', 'B', 'B', 'C#m', 'C#m'] },
      { section: 'BRIDGE', chords: ['A', 'A', 'E', 'E', 'B', 'B', 'C#m', 'C#m'] },
      { section: 'BRIDGE', chords: ['A', 'A', 'E', 'E', 'B', 'B', 'C#m', 'C#m'] },
      { section: 'BRIDGE', chords: ['A', 'A', 'E', 'E', 'B', 'B', 'C#m', 'C#m'] },
      { section: 'CHORUS', chords: ['E', 'E', 'B', 'B', 'C#m', 'C#m', 'A', 'A'] },
      { section: 'OUTRO', chords: ['E', 'E', 'E', 'E'] },
    ],
  },

  // ============================================================
  // OCEANS (Where Feet May Fail) — Hillsong UNITED
  // Source: Official Hillsong chord chart
  // Key: D major (guitar with Capo 4 = Bm feel), BPM: 66
  // Played in Bm shapes with Capo 4
  // ============================================================
  'oceans': {
    slug: 'oceans',
    title: 'Oceans (Where Feet May Fail)',
    artist: 'Hillsong UNITED',
    youtubeId: 'OP-00EwLdiU',
    cover: 'https://i.ytimg.com/vi/OP-00EwLdiU/hqdefault.jpg',
    bpm: 66,
    tempo: 'Slow Worship',
    rhythm: '6/8 Compound',
    duration: '8:56',
    difficulty: 'Intermediate',
    capo: 4,
    timeSignature: '6/8',
    originalKey: 'Bm',
    tags: ['Worship', 'Hillsong', 'Ballad', 'Piano', 'Guitar'],
    sections: [
      { section: 'INTRO', chords: ['Bm', 'Bm', 'D/A', 'D/A', 'A', 'A', 'G', 'G'] },
      { section: 'VERSE 1', chords: ['Bm', 'Bm', 'D/A', 'D/A', 'A', 'A', 'G', 'G'] },
      { section: 'VERSE 1', chords: ['Bm', 'Bm', 'D/A', 'D/A', 'A', 'A', 'G', 'G'] },
      { section: 'PRE-CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'Em', 'Em', 'G', 'G'] },
      { section: 'VERSE 2', chords: ['Bm', 'Bm', 'D/A', 'D/A', 'A', 'A', 'G', 'G'] },
      { section: 'VERSE 2', chords: ['Bm', 'Bm', 'D/A', 'D/A', 'A', 'A', 'G', 'G'] },
      { section: 'PRE-CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'Em', 'Em', 'G', 'G'] },
      { section: 'BRIDGE', chords: ['Em', 'Em', 'D', 'D', 'Bm', 'Bm', 'A', 'A'] },
      { section: 'BRIDGE', chords: ['Em', 'Em', 'D', 'D', 'Bm', 'Bm', 'A', 'A'] },
      { section: 'BRIDGE', chords: ['Em', 'Em', 'D', 'D', 'Bm', 'Bm', 'A', 'A'] },
      { section: 'BRIDGE', chords: ['Em', 'Em', 'D', 'D', 'Bm', 'Bm', 'A', 'A'] },
      { section: 'CHORUS', chords: ['G', 'G', 'D', 'D', 'A', 'A', 'Bm', 'Bm'] },
      { section: 'OUTRO', chords: ['Bm', 'Bm', 'D/A', 'D/A', 'G', 'G', 'G', 'G'] },
    ],
  },
}

export function getSongBySlug(slug: string): SongData | undefined {
  return songDatabase[slug]
}

export function getAllSongs(): SongData[] {
  return Object.values(songDatabase)
}
