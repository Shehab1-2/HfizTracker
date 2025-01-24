# ✨ Quran Memorization Dashboard ✨

> A fresh take on tracking your Quran memorization progress—_simple, visual, and oh-so Gen Z._

## Table of Contents

1. [About](#about)
2. [Screenshots](#screenshots)
3. [Features](#features)
4. [Getting Started](#getting-started)
5. [Usage](#usage)
6. [Tech Stack](#tech-stack)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## About

**Quran Memorization Dashboard** is a modern and interactive RN-based app (React Native) that helps you:

- Track verses memorized per Surah
- Visualize daily, weekly, monthly, or yearly progress
- Check how many Juz you've completed
- See a dope bar chart of your memorization history

Basically, it's your personal hype tool for staying consistent. No more scattered notes—track everything in one aesthetic place!

## Screenshots

|                            **Home / Dashboard**                             |                              **Surah List**                              |                                **Update Modal**                                |
| :-------------------------------------------------------------------------: | :----------------------------------------------------------------------: | :----------------------------------------------------------------------------: |
| <img src="https://via.placeholder.com/200x350?text=Dashboard" width="200"/> | <img src="https://via.placeholder.com/200x350?text=Surahs" width="200"/> | <img src="https://via.placeholder.com/200x350?text=Update+Modal" width="200"/> |

<sub>_Mock images used above for illustration._</sub>

## Features

- **🔥 Real-time stats**: See total verses memorized, surahs completed, daily average, and Juz progress at a glance.
- **📈 Time-based Charts**: Swap between week, month, year, or all-time to flex how many verses you've memorized so far.
- **📝 Surah-by-Surah Tracking**: Update each surah's memorized verse count in seconds.
- **📊 Responsive**: Looks good whether you're on a tablet or phone.
- **🎨 Aesthetic**: Dark theme with bright orange vibes—less stress on the eyes.

## Getting Started

1. **Clone This Repo**

   ```bash
   git clone https://github.com/<YourUsername>/QuranMemorization.git
   cd QuranMemorization
   ```

2. **Install Dependencies**

   ```bash
   npm install # or yarn install
   ```

3. **Run the App**

   ```bash
   npm start # or yarn start
   ```

4. **Build for Production**
   - For **iOS/Android** (React Native CLI):
     ```bash
     npx react-native run-android
     npx react-native run-ios
     ```
   - For **Expo**:
     ```bash
     expo start
     ```
   - For **Web** (if using RN for Web or Expo Web):
     ```bash
     npm run web
     ```

## Usage

1. **Check Dashboard**: Get an overview of daily average, total memorized, surahs completed, and your Juz status.
2. **Update Surahs**: Tap any surah card to open the modal and input how many verses you've memorized so far.
3. **Toggle Filters**: In the "Overall Progress" chart, tap "WEEK," "MONTH," "YEAR," or "ALL" to see how your memorization changed over time.
4. **Keep Goin'**: Each day you memorize, update your verse count; the dashboard automatically saves your daily total.

## Tech Stack

- **React Native** – Core framework for cross-platform app development.
- **React Native Paper** – UI components with sweet theming.
- **AsyncStorage** – Local data storage for progress and history.
- **React Native Chart Kit** – For gorgeous bar charts.

## Contributing

Pull requests, code reviews, bug reports, and feature requests are all super welcome. Let's make Quran memorization tracking even more dope!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/fancyNewFeature`
3. Commit your changes: `git commit -m "feat: add fancy new feature"`
4. Push to the branch: `git push origin feature/fancyNewFeature`
5. Create a Pull Request

## License

This project is licensed under the MIT License, so go forth and remix responsibly.

## Contact

**Questions?** Slide into the issues or start a discussion on GitHub. **Wanna collaborate?** Email me at `[yourEmail@domain.com]`.

Made with ❤️ for a new generation of learners. _Stay consistent, and keep shining._
