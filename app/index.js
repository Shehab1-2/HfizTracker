// App.js
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Provider as PaperProvider,
  TextInput,
  Button,
  Title,
  Text,
  Card,
  ProgressBar,
  Portal,
  Modal,
  DefaultTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from 'react-native-chart-kit';

/* -------------------------
   THEME & CONSTANTS
-------------------------- */
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8C00',     // Orange accent
    accent: '#FFA500',
    background: '#000000',  // Dark background
    surface: '#1A1A1A',
    text: '#FF8C00',
    placeholder: '#FF8C00',
  },
};

/* 
  Full Surah list, in order, from 1 -> 114.
  IMPORTANT: The array index must match surahNumber - 1.
*/
const SURAHS = [
  { name: "Al-Fatihah", verses: 7, translation: "The Opening" },         // surah #1
  { name: "Al-Baqarah", verses: 286, translation: "The Cow" },           // #2
  { name: "Ali 'Imran", verses: 200, translation: "Family of Imran" },   // #3
  { name: "An-Nisa", verses: 176, translation: "The Women" },            // #4
  { name: "Al-Ma'idah", verses: 120, translation: "The Table Spread" },  
  { name: "Al-An'am", verses: 165, translation: "The Cattle" },
  { name: "Al-A'raf", verses: 206, translation: "The Heights" },
  { name: "Al-Anfal", verses: 75, translation: "The Spoils of War" },
  { name: "At-Taubah", verses: 129, translation: "The Repentance" },
  { name: "Yunus", verses: 109, translation: "Jonah" },
  { name: "Hud", verses: 123, translation: "Hud" },
  { name: "Yusuf", verses: 111, translation: "Joseph" },
  { name: "Ar-Ra'd", verses: 43, translation: "The Thunder" },
  { name: "Ibrahim", verses: 52, translation: "Abraham" },
  { name: "Al-Hijr", verses: 99, translation: "The Rocky Track" },
  { name: "An-Nahl", verses: 128, translation: "The Bee" },
  { name: "Al-Isra", verses: 111, translation: "The Night Journey" },
  { name: "Al-Kahf", verses: 110, translation: "The Cave" },
  { name: "Maryam", verses: 98, translation: "Mary" },
  { name: "Taha", verses: 135, translation: "Ta-Ha" },
  { name: "Al-Anbiya", verses: 112, translation: "The Prophets" },
  { name: "Al-Hajj", verses: 78, translation: "The Pilgrimage" },
  { name: "Al-Mu'minun", verses: 118, translation: "The Believers" },
  { name: "An-Nur", verses: 64, translation: "The Light" },
  { name: "Al-Furqan", verses: 77, translation: "The Criterion" },
  { name: "Ash-Shu'ara", verses: 227, translation: "The Poets" },
  { name: "An-Naml", verses: 93, translation: "The Ants" },
  { name: "Al-Qasas", verses: 88, translation: "The Stories" },
  { name: "Al-'Ankabut", verses: 69, translation: "The Spider" },
  { name: "Ar-Rum", verses: 60, translation: "The Romans" },
  { name: "Luqman", verses: 34, translation: "Luqman" },
  { name: "As-Sajdah", verses: 30, translation: "The Prostration" },
  { name: "Al-Ahzab", verses: 73, translation: "The Confederates" },
  { name: "Saba", verses: 54, translation: "Sheba" },
  { name: "Fatir", verses: 45, translation: "The Originator" },
  { name: "Ya-Sin", verses: 83, translation: "Ya-Sin" },
  { name: "As-Saffat", verses: 182, translation: "Those Ranged in Ranks" },
  { name: "Sad", verses: 88, translation: "Sad" },
  { name: "Az-Zumar", verses: 75, translation: "The Groups" },
  { name: "Ghafir", verses: 85, translation: "The Forgiver" },
  { name: "Fussilat", verses: 54, translation: "Explained in Detail" },
  { name: "Ash-Shura", verses: 53, translation: "Consultation" },
  { name: "Az-Zukhruf", verses: 89, translation: "Ornaments of Gold" },
  { name: "Ad-Dukhan", verses: 59, translation: "The Smoke" },
  { name: "Al-Jathiyah", verses: 37, translation: "The Crouching" },
  { name: "Al-Ahqaf", verses: 35, translation: "Wind-Curved Sandhills" },
  { name: "Muhammad", verses: 38, translation: "Muhammad" },
  { name: "Al-Fath", verses: 29, translation: "The Victory" },
  { name: "Al-Hujurat", verses: 18, translation: "The Rooms" },
  { name: "Qaf", verses: 45, translation: "Qaf" },
  { name: "Adh-Dhariyat", verses: 60, translation: "The Winnowing Winds" },
  { name: "At-Tur", verses: 49, translation: "The Mount" },
  { name: "An-Najm", verses: 62, translation: "The Star" },
  { name: "Al-Qamar", verses: 55, translation: "The Moon" },
  { name: "Ar-Rahman", verses: 78, translation: "The Beneficent" },
  { name: "Al-Waqi'ah", verses: 96, translation: "The Event" },
  { name: "Al-Hadid", verses: 29, translation: "The Iron" },
  { name: "Al-Mujadila", verses: 22, translation: "The Pleading Woman" },
  { name: "Al-Hashr", verses: 24, translation: "The Exile" },
  { name: "Al-Mumtahanah", verses: 13, translation: "Examined One" },
  { name: "As-Saff", verses: 14, translation: "The Ranks" },
  { name: "Al-Jumu'ah", verses: 11, translation: "Friday" },
  { name: "Al-Munafiqun", verses: 11, translation: "The Hypocrites" },
  { name: "At-Taghabun", verses: 18, translation: "Mutual Disillusion" },
  { name: "At-Talaq", verses: 12, translation: "Divorce" },
  { name: "At-Tahrim", verses: 12, translation: "The Prohibition" },
  { name: "Al-Mulk", verses: 30, translation: "The Sovereignty" },
  { name: "Al-Qalam", verses: 52, translation: "The Pen" },
  { name: "Al-Haqqah", verses: 52, translation: "The Sure Reality" },
  { name: "Al-Ma'arij", verses: 44, translation: "The Ascending Stairways" },
  { name: "Nuh", verses: 28, translation: "Noah" },
  { name: "Al-Jinn", verses: 28, translation: "The Jinn" },
  { name: "Al-Muzzammil", verses: 20, translation: "The Enshrouded One" },
  { name: "Al-Muddaththir", verses: 56, translation: "The Cloaked One" },
  { name: "Al-Qiyamah", verses: 40, translation: "The Resurrection" },
  { name: "Al-Insan", verses: 31, translation: "Man" },
  { name: "Al-Mursalat", verses: 50, translation: "Those Sent Forth" },
  { name: "An-Naba", verses: 40, translation: "The Great News" },
  { name: "An-Nazi'at", verses: 46, translation: "Those Who Pull Out" },
  { name: "'Abasa", verses: 42, translation: "He Frowned" },
  { name: "At-Takwir", verses: 29, translation: "The Overthrowing" },
  { name: "Al-Infitar", verses: 19, translation: "The Cleaving" },
  { name: "Al-Mutaffifin", verses: 36, translation: "The Dealers in Fraud" },
  { name: "Al-Inshiqaq", verses: 25, translation: "The Splitting Asunder" },
  { name: "Al-Buruj", verses: 22, translation: "The Constellations" },
  { name: "At-Tariq", verses: 17, translation: "The Nightcomer" },
  { name: "Al-A'la", verses: 19, translation: "The Most High" },
  { name: "Al-Ghashiyah", verses: 26, translation: "The Overwhelming" },
  { name: "Al-Fajr", verses: 30, translation: "The Dawn" },
  { name: "Al-Balad", verses: 20, translation: "The City" },
  { name: "Ash-Shams", verses: 15, translation: "The Sun" },
  { name: "Al-Lail", verses: 21, translation: "The Night" },
  { name: "Ad-Duhaa", verses: 11, translation: "The Morning Hours" },
  { name: "Ash-Sharh", verses: 8, translation: "The Consolation" },
  { name: "At-Tin", verses: 8, translation: "The Fig" },
  { name: "Al-Alaq", verses: 19, translation: "The Clot" },
  { name: "Al-Qadr", verses: 5, translation: "The Power" },
  { name: "Al-Bayyinah", verses: 8, translation: "The Clear Proof" },
  { name: "Az-Zalzalah", verses: 8, translation: "The Earthquake" },
  { name: "Al-Adiyat", verses: 11, translation: "The Courser" },
  { name: "Al-Qari'ah", verses: 11, translation: "The Calamity" },
  { name: "At-Takathur", verses: 8, translation: "The Rivalry in World Increase" },
  { name: "Al-Asr", verses: 3, translation: "The Declining Day" },
  { name: "Al-Humazah", verses: 9, translation: "The Traducer" },
  { name: "Al-Fil", verses: 5, translation: "The Elephant" },
  { name: "Quraysh", verses: 4, translation: "Quraysh" },
  { name: "Al-Ma'un", verses: 7, translation: "Small Kindnesses" },
  { name: "Al-Kawthar", verses: 3, translation: "Abundance" },
  { name: "Al-Kafirun", verses: 6, translation: "The Disbelievers" },
  { name: "An-Nasr", verses: 3, translation: "Divine Support" },
  { name: "Al-Masad", verses: 5, translation: "The Palm Fiber" },
  { name: "Al-Ikhlas", verses: 4, translation: "Sincerity" },
  { name: "Al-Falaq", verses: 5, translation: "The Daybreak" },
  { name: "An-Nas", verses: 6, translation: "Mankind" },  // surah #114
];

// Precompute total verses across all surahs
const TOTAL_VERSES = SURAHS.reduce((acc, s) => acc + s.verses, 0);

/*
  Juz Ranges:
  Each object: { startSurah, startVerse, endSurah, endVerse }
  Surah numbering is 1-based => Surah Al-Fatihah is #1, Al-Baqarah is #2, etc.
*/
const JUZ_RANGES = [
  { startSurah: 1,  startVerse: 1,   endSurah: 2,  endVerse: 141 }, // Juz 1
  { startSurah: 2,  startVerse: 142, endSurah: 2,  endVerse: 252 }, // 2
  { startSurah: 2,  startVerse: 253, endSurah: 3,  endVerse: 92  }, // 3
  { startSurah: 3,  startVerse: 93,  endSurah: 4,  endVerse: 23  }, // 4
  { startSurah: 4,  startVerse: 24,  endSurah: 4,  endVerse: 147 }, // 5
  { startSurah: 4,  startVerse: 148, endSurah: 5,  endVerse: 81  }, // 6
  { startSurah: 5,  startVerse: 82,  endSurah: 6,  endVerse: 110 }, // 7
  { startSurah: 6,  startVerse: 111, endSurah: 7,  endVerse: 87  }, // 8
  { startSurah: 7,  startVerse: 88,  endSurah: 8,  endVerse: 40  }, // 9
  { startSurah: 8,  startVerse: 41,  endSurah: 9,  endVerse: 92  }, // 10
  { startSurah: 9,  startVerse: 93,  endSurah: 11, endVerse: 5   }, // 11
  { startSurah: 11, startVerse: 6,   endSurah: 12, endVerse: 52  }, // 12
  { startSurah: 12, startVerse: 53,  endSurah: 14, endVerse: 52  }, // 13
  { startSurah: 15, startVerse: 1,   endSurah: 16, endVerse: 128 }, // 14
  { startSurah: 17, startVerse: 1,   endSurah: 18, endVerse: 74  }, // 15
  { startSurah: 18, startVerse: 75,  endSurah: 20, endVerse: 135 }, // 16
  { startSurah: 21, startVerse: 1,   endSurah: 22, endVerse: 78  }, // 17
  { startSurah: 23, startVerse: 1,   endSurah: 24, endVerse: 64  }, // 18
  { startSurah: 25, startVerse: 1,   endSurah: 27, endVerse: 55  }, // 19
  { startSurah: 27, startVerse: 56,  endSurah: 29, endVerse: 45  }, // 20
  { startSurah: 29, startVerse: 46,  endSurah: 33, endVerse: 30  }, // 21
  { startSurah: 33, startVerse: 31,  endSurah: 36, endVerse: 27  }, // 22
  { startSurah: 36, startVerse: 28,  endSurah: 39, endVerse: 31  }, // 23
  { startSurah: 39, startVerse: 32,  endSurah: 41, endVerse: 46  }, // 24
  { startSurah: 41, startVerse: 47,  endSurah: 45, endVerse: 37  }, // 25
  { startSurah: 46, startVerse: 1,   endSurah: 51, endVerse: 30  }, // 26
  { startSurah: 51, startVerse: 31,  endSurah: 57, endVerse: 29  }, // 27
  { startSurah: 58, startVerse: 1,   endSurah: 66, endVerse: 12  }, // 28
  { startSurah: 67, startVerse: 1,   endSurah: 77, endVerse: 50  }, // 29
  { startSurah: 78, startVerse: 1,   endSurah: 114,endVerse: 6   }, // 30
];

/**
 * Calculate how many verses are memorized in a single Juz range.
 * @param {object} surahProgress - { [surahName]: memorizedVerseCount, ... }
 * @param {number} startSurah - Juz start surah # (1-based)
 * @param {number} startVerse - Juz start verse
 * @param {number} endSurah - Juz end surah # (1-based)
 * @param {number} endVerse - Juz end verse
 */
function getMemorizedInRange(
  surahProgress,
  startSurah,
  startVerse,
  endSurah,
  endVerse
) {
  let totalMem = 0;

  for (let surahNum = startSurah; surahNum <= endSurah; surahNum++) {
    const surahIndex = surahNum - 1; // surah 1 => index 0
    const surahObj = SURAHS[surahIndex];
    const memorizedVersesCount = surahProgress[surahObj.name] || 0;

    // Determine the relevant verse range within this surah
    let rangeStart = 1;
    let rangeEnd = surahObj.verses;

    if (surahNum === startSurah) {
      // Juz starts partway
      rangeStart = startVerse;
    }
    if (surahNum === endSurah) {
      // Juz ends partway
      rangeEnd = endVerse;
    }

    // The user may have memorized X verses in this surah. 
    // So the memorized portion is from 1 to memorizedVersesCount.
    // Overlap that with [rangeStart, rangeEnd].
    const actualMemorizedEnd = Math.min(memorizedVersesCount, rangeEnd);

    if (actualMemorizedEnd >= rangeStart) {
      totalMem += (actualMemorizedEnd - rangeStart + 1);
    }
  }

  return totalMem;
}

/**
 * For each of the 30 Juz, calculate how many verses are memorized.
 * Returns an array of length 30, each an integer from 0 -> full Juz length.
 */
function calculateJuzProgress(surahProgress) {
  return JUZ_RANGES.map((juz) => {
    return getMemorizedInRange(
      surahProgress,
      juz.startSurah,
      juz.startVerse,
      juz.endSurah,
      juz.endVerse
    );
  });
}

/* -------------------------
   MAIN APP COMPONENT
-------------------------- */
export default function App() {
  // Surah memorization state: { surahName: numberOfVersesMemorized }
  const [surahProgress, setSurahProgress] = useState({});
  // Modal state
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [versesInput, setVersesInput] = useState('');
  // Progress history: array of { date: 'YYYY-MM-DD', verses: totalMemorizedSoFar }
  const [progressHistory, setProgressHistory] = useState([]);
  // Filter for the date-based bar chart
  const [timeFilter, setTimeFilter] = useState('week'); // 'week'|'month'|'year'|'all'

  const { width } = useWindowDimensions();

  /* -------------------------
     Load from AsyncStorage
  -------------------------- */
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [storedProgress, storedHistory] = await Promise.all([
        AsyncStorage.getItem('surahProgress'),
        AsyncStorage.getItem('progressHistory'),
      ]);

      if (storedProgress) setSurahProgress(JSON.parse(storedProgress));
      if (storedHistory) setProgressHistory(JSON.parse(storedHistory));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  /* -------------------------
     Save Data to AsyncStorage
  -------------------------- */
  async function saveData(newProgress) {
    try {
      // We store the sum of memorized verses so far for today's date
      const date = new Date().toISOString().split('T')[0];
      const totalSoFar = Object.values(newProgress).reduce(
        (acc, curr) => acc + (parseInt(curr) || 0),
        0
      );

      const newHistory = [...progressHistory];
      const todayIndex = newHistory.findIndex((day) => day.date === date);

      if (todayIndex >= 0) {
        newHistory[todayIndex].verses = totalSoFar;
      } else {
        newHistory.push({ date, verses: totalSoFar });
      }

      await Promise.all([
        AsyncStorage.setItem('surahProgress', JSON.stringify(newProgress)),
        AsyncStorage.setItem('progressHistory', JSON.stringify(newHistory)),
      ]);

      setSurahProgress(newProgress);
      setProgressHistory(newHistory);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  /* -------------------------
     Derived Stats
  -------------------------- */
  function getTotalProgress() {
    const totalMemorized = Object.values(surahProgress).reduce(
      (acc, curr) => acc + (parseInt(curr) || 0),
      0
    );
    const percentage = ((totalMemorized / TOTAL_VERSES) * 100).toFixed(2);
    return { memorized: totalMemorized, percentage };
  }

  // Actual Juz progress array
  const juzProgressArray = calculateJuzProgress(surahProgress);
  // We'll consider a Juz "complete" if the memorized verses in that Juz 
  // equals the total verse count in that Juz range. 
  // Let's count how many are fully done:
  const juzCompletedCount = juzProgressArray.filter((memCount, idx) => {
    // Calculate total verses in that Juz
    const { startSurah, startVerse, endSurah, endVerse } = JUZ_RANGES[idx];
    const totalInJuz = getMemorizedInRange(
      // We do a special call with "maxed out" surahProgress 
      // to get the full number of verses in that Juz
      // Trick: create an artificial surahProgress where each Surah is "fully memorized"
      createFullyMemorizedProgress(),
      startSurah,
      startVerse,
      endSurah,
      endVerse
    );
    // If memCount == totalInJuz, that Juz is fully memorized
    return memCount >= totalInJuz;
  }).length;

  // Helper to represent "fully memorized" for all surahs:
  function createFullyMemorizedProgress() {
    const obj = {};
    for (let i = 0; i < SURAHS.length; i++) {
      obj[SURAHS[i].name] = SURAHS[i].verses;
    }
    return obj;
  }

  /* -------------------------
     Time-Filter Logic
  -------------------------- */
  function filterProgressHistory(range) {
    if (range === 'all') return progressHistory;
    const now = new Date();
    let cutoff = new Date();
    if (range === 'week') {
      cutoff.setDate(now.getDate() - 7);
    } else if (range === 'month') {
      cutoff.setMonth(now.getMonth() - 1);
    } else if (range === 'year') {
      cutoff.setFullYear(now.getFullYear() - 1);
    }
    return progressHistory.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoff;
    });
  }

  function getFilteredChartData() {
    const filtered = filterProgressHistory(timeFilter);
    // Sort ascending by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = filtered.map((day) => {
      const d = new Date(day.date);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });
    const data = filtered.map((day) => day.verses);
    return { labels, data };
  }

  /* -------------------------
     UI Components
  -------------------------- */

  // Dashboard Stats (cards)
  const DashboardHeader = () => {
    const total = getTotalProgress();
    // Surahs completed
    const surahsCompleted = Object.entries(surahProgress).filter(
      ([name, count]) => {
        const surahObj = SURAHS.find((s) => s.name === name);
        return surahObj && count === surahObj.verses;
      }
    ).length;

    return (
      <View style={styles.dashboardHeader}>
        {/* Total Progress */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsTitle}>Total Progress</Text>
            <Text style={styles.statsNumber}>
              {total.memorized}/{TOTAL_VERSES}
            </Text>
            <ProgressBar
              progress={total.memorized / TOTAL_VERSES}
              color={theme.colors.primary}
              style={styles.totalProgressBar}
            />
            <Text style={styles.statsSubtitle}>
              {total.percentage}% Complete
            </Text>
          </Card.Content>
        </Card>

        {/* Daily Average */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsTitle}>Daily Average</Text>
            <Text style={styles.statsNumber}>
              {(
                progressHistory.reduce((acc, d) => acc + d.verses, 0) /
                Math.max(progressHistory.length, 1)
              ).toFixed(1)}
            </Text>
            <Text style={styles.statsSubtitle}>verses per day</Text>
          </Card.Content>
        </Card>

        {/* Surahs Completed */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsTitle}>Surahs Completed</Text>
            <Text style={styles.statsNumber}>{surahsCompleted}</Text>
            <Text style={styles.statsSubtitle}>out of 114</Text>
          </Card.Content>
        </Card>

        {/* Juz Completed */}
        <Card style={styles.statsCard}>
          <Card.Content>
            <Text style={styles.statsTitle}>Juz Memorized</Text>
            <Text style={styles.statsNumber}>{juzCompletedCount}/30</Text>
            <Text style={styles.statsSubtitle}>fully completed</Text>
          </Card.Content>
        </Card>
      </View>
    );
  };

  // Date-based progress chart
  const ProgressChart = () => {
    const filteredData = getFilteredChartData();
    return (
      <View style={styles.chartSection}>
        <Title style={styles.chartSectionTitle}>Overall Progress Over Time</Title>
        {/* Filter buttons */}
        <View style={styles.filterRow}>
          {['week', 'month', 'year', 'all'].map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.filterButton,
                timeFilter === range && styles.filterButtonActive,
              ]}
              onPress={() => setTimeFilter(range)}
            >
              <Text style={styles.filterButtonText}>{range.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BarChart showing total memorized so far on each recorded date */}
        <BarChart
          data={{
            labels: filteredData.labels,
            datasets: [{ data: filteredData.data }],
          }}
          width={width * 0.9}
          height={250}
          fromZero
          chartConfig={{
            backgroundColor: '#1A1A1A',
            backgroundGradientFrom: '#1A1A1A',
            backgroundGradientTo: '#1A1A1A',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ borderRadius: 16, marginTop: 16 }}
        />
      </View>
    );
  };

  // Juz progress bar chart
  const JuzChart = () => {
    // For each Juz, we have a count of memorized verses (juzProgressArray).
    // We also need total possible verses in that Juz, so we can show partial coverage.
    // But to keep the bar chart simpler, we’ll just show how many verses memorized out of the total.
    const allLabels = JUZ_RANGES.map((_, i) => (i + 1).toString());
    
    return (
      <Card style={styles.juzChartCard}>
        <Card.Content>
          <Title style={styles.chartTitle}>Juz Progress</Title>
          <BarChart
            data={{
              labels: allLabels,   // 1..30
              datasets: [{ data: juzProgressArray }], // e.g., [100, 130, 90, ...]
            }}
            width={width * 0.9}
            height={250}
            fromZero
            chartConfig={{
              backgroundColor: '#1A1A1A',
              backgroundGradientFrom: '#1A1A1A',
              backgroundGradientTo: '#1A1A1A',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 140, 0, ${opacity})`,
              style: { borderRadius: 16 },
              propsForLabels: { fontSize: 10 },
            }}
            style={{ borderRadius: 16, marginTop: 16 }}
          />
          <Text style={{ color: '#FF8C00', marginTop: 8, fontSize: 14 }}>
            Bar heights represent how many verses memorized per Juz.
          </Text>
        </Card.Content>
      </Card>
    );
  };

  // List of all surahs with a progress bar
  const SurahList = () => (
    <View style={styles.surahList}>
      <Title style={styles.sectionTitle}>Surah Progress</Title>
      {SURAHS.map((surah) => (
        <SurahCard key={surah.name} surah={surah} />
      ))}
    </View>
  );

  // A single surah card
  const SurahCard = ({ surah }) => {
    const memorized = surahProgress[surah.name] || 0;
    const progress = memorized / surah.verses;

    return (
      <Card style={styles.surahCard} onPress={() => openSurahModal(surah)}>
        <Card.Content>
          <View style={styles.surahHeader}>
            <View style={styles.surahInfo}>
              <Title style={styles.surahName}>{surah.name}</Title>
              <Text style={styles.surahTranslation}>
                {surah.translation}
              </Text>
            </View>
            <Text style={styles.verseCount}>
              {memorized}/{surah.verses}
            </Text>
          </View>
          <ProgressBar
            progress={progress}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
        </Card.Content>
      </Card>
    );
  };

  /* -------------------------
     MODAL logic
  -------------------------- */
  function openSurahModal(surah) {
    setSelectedSurah(surah);
    setVersesInput((surahProgress[surah.name] || 0).toString());
    setIsModalVisible(true);
  }

  function handleSaveProgress() {
    if (!selectedSurah) return;
    const newVal = parseInt(versesInput) || 0;
    const limitedVal = Math.min(Math.max(0, newVal), selectedSurah.verses);
    
    const updatedProgress = {
      ...surahProgress,
      [selectedSurah.name]: limitedVal,
    };
    saveData(updatedProgress);
    setIsModalVisible(false);
  }

  /* -------------------------
     RENDER
  -------------------------- */
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.container}>
            <Title style={styles.title}>Quran Memorization Dashboard</Title>

            <DashboardHeader />
            <ProgressChart />
            <JuzChart />
            <SurahList />

            {/* Update Surah Modal */}
            <Portal>
              <Modal
                visible={isModalVisible}
                onDismiss={() => setIsModalVisible(false)}
                contentContainerStyle={styles.modal}
              >
                {selectedSurah && (
                  <View>
                    <Title style={styles.modalTitle}>
                      Update {selectedSurah.name}
                    </Title>
                    <TextInput
                      label="Verses memorized"
                      value={versesInput}
                      onChangeText={setVersesInput}
                      keyboardType="numeric"
                      style={styles.modalInput}
                    />
                    <Text style={styles.modalText}>
                      Total verses: {selectedSurah.verses}
                    </Text>
                    <Button
                      mode="contained"
                      onPress={handleSaveProgress}
                      style={styles.modalButton}
                    >
                      Save Progress
                    </Button>
                  </View>
                )}
              </Modal>
            </Portal>
          </ScrollView>
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaView>
  );
}

/* -------------------------
   STYLES
-------------------------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#FF8C00',
    marginVertical: 24,
  },
  /* Dashboard Header (Stats) */
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    flexWrap: 'wrap',
  },
  statsCard: {
    backgroundColor: '#1A1A1A',
    flex: 1,
    margin: 8,
    minWidth: 220,
  },
  statsTitle: {
    color: '#FF8C00',
    fontSize: 16,
    opacity: 0.8,
  },
  statsNumber: {
    color: '#FF8C00',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  statsSubtitle: {
    color: '#FF8C00',
    fontSize: 14,
    opacity: 0.6,
  },
  totalProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  /* Time-Filtered Progress Chart */
  chartSection: {
    padding: 16,
    alignItems: 'center',
  },
  chartSectionTitle: {
    color: '#FF8C00',
    fontSize: 20,
    marginBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  filterButton: {
    borderColor: '#FF8C00',
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
  },
  filterButtonActive: {
    backgroundColor: '#FF8C00',
  },
  filterButtonText: {
    color: '#FF8C00',
    fontSize: 14,
  },
  juzChartCard: {
    backgroundColor: '#1A1A1A',
    margin: 16,
    paddingBottom: 16,
  },
  chartTitle: {
    color: '#FF8C00',
    marginBottom: 12,
  },
  /* Surah List */
  surahList: {
    padding: 16,
  },
  sectionTitle: {
    color: '#FF8C00',
    fontSize: 24,
    marginBottom: 16,
  },
  surahCard: {
    backgroundColor: '#1A1A1A',
    marginBottom: 16,
  },
  surahHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 20,
    color: '#FF8C00',
  },
  surahTranslation: {
    color: '#FF8C00',
    opacity: 0.8,
    fontSize: 14,
  },
  verseCount: {
    color: '#FF8C00',
    fontSize: 16,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  /* Modal */
  modal: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    color: '#FF8C00',
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  modalInput: {
    marginBottom: 16,
    backgroundColor: '#262626',
  },
  modalText: {
    color: '#FF8C00',
    marginBottom: 16,
  },
  modalButton: {
    marginTop: 8,
  },
});
