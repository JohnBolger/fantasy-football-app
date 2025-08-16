# 🏈 Fantasy Football Team Manager

A dynamic, interactive fantasy football team management application built with React and TypeScript that connects to the Sleeper.app API to display and manage your fantasy football roster.

## ✨ Features

### 🎯 **Team Formation Display**
- **Custom Formation Layout**: QB, RB1, RB2, WR1, WR2, Flex1, Flex2, TE, and Kicker positions
- **Interactive Player Cards**: Each player displays name, team, college, and position
- **Bench Management**: Dedicated section for bench players
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔗 **Dynamic Player Connections**
- **Smart Connection System**: Lines connect players based on team and college relationships
- **Color-Coded Connections**:
  - **🟣 Purple**: Same team AND same college (+0.2 multiplier)
  - **🟢 Green**: Same team OR same college (+0.1 multiplier)
  - **⚪ Transparent**: Different team and college (no bonus)

### 📊 **Player Multiplier System**
- **Dynamic Bonuses**: Players earn multipliers based on their connections
- **Base Multiplier**: 1.0x for all players
- **Connection Bonuses**: 
  - Team/college connections add 0.1x to 0.2x
  - Visual multiplier badges on player cards
- **Strategic Insights**: See which players have chemistry bonuses

### 🎨 **Modern UI/UX**
- **Custom Theme**: Dark blue/grey color scheme with green accents
- **Smooth Animations**: Hover effects, connection line animations, and transitions
- **Professional Design**: Clean, modern interface inspired by professional sports apps
- **Username Customization**: Personalize your team name with custom username input

### 🔌 **Sleeper.app Integration**
- **Live Data**: Connect to your actual Sleeper fantasy football league
- **Hybrid Approach**: Uses local player database for details + API for current roster
- **Demo Mode**: Test the app with sample data before connecting to live league

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/JohnBolger/fantasy-football-app.git
   cd fantasy-football-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 How to Use

### **Demo Mode (Default)**
- The app starts in demo mode with sample players
- Explore all features without connecting to Sleeper
- Perfect for testing and demonstration

### **Live Mode**
- Click "Live Mode" to connect to your Sleeper league
- Requires a `players.json` file with player data
- Automatically fetches your current roster

### **Customizing Your Team**
- **Change Username**: Type in the input field to personalize your team name
- **View Connections**: See which players have team/college chemistry
- **Check Multipliers**: Look for multiplier badges on player cards
- **Explore Formation**: Navigate through different position groups

## 🛠️ Technical Details

### **Built With**
- **React 18** with TypeScript
- **CSS3** with custom animations and responsive design
- **SVG Graphics** for dynamic connection lines
- **Sleeper.app API** for live fantasy football data

### **Architecture**
- **Component-Based**: Modular React components for maintainability
- **State Management**: React hooks for local state management
- **API Integration**: RESTful API calls to Sleeper.app
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### **Key Components**
- `TeamFormation`: Main formation display and layout
- `PlayerCard`: Individual player information display
- `SleeperAPI`: API integration and data fetching
- `DemoMode`: Sample data and demo functionality

## 📁 Project Structure
```
fantasy-football-app/
├── public/
│   ├── players.json          # Player database
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TeamFormation.tsx # Main team display
│   │   ├── PlayerCard.tsx    # Individual player cards
│   │   └── DemoMode.tsx      # Sample data
│   ├── services/
│   │   └── SleeperAPI.ts     # API integration
│   ├── types/
│   │   └── Player.ts         # TypeScript interfaces
│   └── App.tsx               # Main application
└── README.md
```

## 🔧 Configuration

### **Sleeper.app Setup**
1. **Get your League ID**: Found in your Sleeper league URL
2. **Update API Configuration**: Modify `src/services/SleeperAPI.ts`
3. **Add Player Data**: Ensure `public/players.json` contains player information

### **Customization Options**
- **Theme Colors**: Modify CSS variables in component files
- **Formation Layout**: Adjust player positions in `TeamFormation.tsx`
- **Connection Rules**: Customize connection logic and multipliers
- **Player Display**: Modify what information shows on player cards

## 🎯 Use Cases

### **Fantasy Football Managers**
- **Team Analysis**: Visualize player connections and chemistry
- **Roster Management**: Organize starters and bench players
- **Strategy Planning**: Use multipliers to optimize lineups

### **Sports Enthusiasts**
- **Team Visualization**: See your fantasy team in an engaging format
- **Player Research**: Explore team and college relationships
- **Performance Tracking**: Monitor player bonuses and connections

### **Developers**
- **React Learning**: Study modern React patterns and TypeScript usage
- **API Integration**: Learn how to integrate external sports APIs
- **UI/UX Design**: Explore responsive design and animation techniques

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- **Bug Reports**: Open issues for any problems you encounter
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit pull requests for enhancements
- **Documentation**: Help improve this README or add code comments

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Sleeper.app** for providing the fantasy football API
- **React Team** for the amazing framework
- **Fantasy Football Community** for inspiration and feedback

---

**Ready to manage your fantasy football team like a pro?** 🏆

Start the app, customize your username, and explore the dynamic world of player connections and multipliers! 
