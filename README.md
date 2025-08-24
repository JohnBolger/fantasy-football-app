# 🏈 Fantasy Football Team Manager

A dynamic, interactive fantasy football team management application built with React, TypeScript, and WebGL that features advanced chemistry systems, player inspection tools, team building capabilities, and stunning visual effects.

## ✨ Features

### 🎯 **Advanced Team Formation Display**
- **Custom Formation Layout**: QB, RB1, RB2, WR1, WR2, Flex1, Flex2, TE, and Kicker positions
- **Enhanced Player Cards**: Modern React Bits-inspired design with improved layout
- **Interactive Elements**: Click to inspect players or swap positions
- **Bench Management**: Dedicated section for bench players
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🏗️ **Team Builder Mode**
- **Interactive Team Creation**: Build teams from scratch with a comprehensive player database
- **Default Placeholder Cards**: Black cards with "Select <Position>" text for each position
- **Player Selection Modal**: Search and filter through available players
- **Chemistry Toggle**: Turn chemistry calculations on/off to experiment with different strategies
- **Clear Team Function**: Reset team back to placeholder cards with one click
- **No Points Display**: Clean interface focused on team building rather than scoring

### 🔬 **Player Inspection System**
- **Detailed Player Modal**: Comprehensive player information display
- **Chemistry Analysis**: View all player connections and bonus details
- **Stats Overview**: Base points, chemistry multiplier, final points
- **Additional Info**: Rank, position, NFL team, and college details

### 🎮 **Context Menu Interface**
- **Right-Click Style Menu**: Click any player card to access options
- **Inspect Player**: View detailed player information and chemistry
- **Swap Player**: Easily change player positions
- **Smooth Animations**: Professional context menu with slide-in effects

### 🔗 **Dynamic Chemistry Connection System**
- **Smart Connection Detection**: Automatically determines connection types based on actual player data
- **Dual Bonus Support**: Players can receive both NFL Team Boost AND College Connection bonuses
- **Real-Time Updates**: Chemistry connections update automatically when players change
- **Chemistry Toggle**: Enable/disable chemistry calculations to see their impact
- **Position-Based Rules**: Each position has specific connection patterns:
  - **QB**: Connects to WR1, RB1, Flex1, TE
  - **RB1**: Connects to QB, RB2, Flex1, WR1
  - **RB2**: Connects to K, RB1, Flex2, WR2
  - **WR1**: Connects to QB, RB1, Flex1, WR2
  - **WR2**: Connects to K, RB2, Flex2, WR1
  - **Flex1**: Connects to QB, RB1, WR1, TE
  - **Flex2**: Connects to K, RB2, WR2, TE
  - **TE**: Connects to QB, K, Flex1, Flex2
  - **K**: Connects to RB2, Flex2, WR2, TE

### 🎨 **Advanced Visual Effects**
- **WebGL Background**: Sophisticated animated background using OGL library
- **Enhanced Player Cards**: 15% larger cards with improved glow effects
- **Multiplier-Based Glowing**: Different glow colors for each multiplier level:
  - **1.1x**: Yellow glow
  - **1.2x**: Light green glow
  - **1.3x**: Dark green glow
  - **1.4x**: Purple glow
  - **1.5x**: Galaxy purple glow
- **Placeholder Cards**: Black cards with white text for team building positions
- **Smooth Animations**: Hover effects, transitions, and interactive feedback

### 📊 **Enhanced Player Multiplier System**
- **Dynamic Chemistry Bonuses**: Each connection provides +10% bonus
- **Dual Connection Types**: NFL Team Boost and College Connection bonuses stack
- **Visual Indicators**: Glowing effects and multiplier badges
- **Real-Time Calculation**: Multipliers update automatically with roster changes
- **Configurable Chemistry**: Toggle chemistry system on/off for different strategies

### 🔌 **Sleeper.app Integration**
- **Live Data**: Connect to your actual Sleeper fantasy football league
- **Hybrid Approach**: Uses local player database for details + API for current roster
- **Demo Mode**: Test the app with sample data before connecting to live league
- **User Management**: Support for multiple users and team customization

### 🔍 **Enhanced Player Selection**
- **Search Functionality**: Filter players by name, team, college, or position
- **Fallback Images**: Graceful handling of missing player photos with styled initials
- **Position Validation**: Ensures players can only be placed in valid positions
- **Responsive Modal**: Works seamlessly on all device sizes

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

### **Team Builder Mode**
- Click "Team Builder" to access the team building interface
- **Default Placeholder Cards**: Each position shows a black card with "Select <Position>" text
- **Add Players**: Click any position to open the player selection modal
- **Search & Filter**: Use the search bar to find specific players
- **Chemistry Toggle**: Turn chemistry on/off to see how it affects your team
- **Clear Team**: Reset your team back to placeholder cards with one click

### **Player Interaction**
- **Click Player Cards**: Opens context menu with inspect/swap options
- **Inspect Player**: View detailed chemistry connections and player stats
- **Swap Players**: Change player positions easily
- **View Chemistry**: See all connection types and bonuses

### **Chemistry System**
- **Automatic Detection**: Connection types are determined by actual player data
- **NFL Team Boost**: Shows when players are on the same NFL team
- **College Connection**: Shows when players attended the same college
- **Dual Bonuses**: Players can receive both types of bonuses
- **Toggle Control**: Enable/disable chemistry to experiment with different strategies

## 🛠️ Technical Details

### **Built With**
- **React 18** with TypeScript
- **WebGL/OGL** for advanced background animations
- **CSS3** with custom animations and responsive design
- **Modern React Patterns** with hooks and functional components
- **Sleeper.app API** for live fantasy football data

### **Architecture**
- **Component-Based**: Modular React components for maintainability
- **State Management**: React hooks for local state management
- **WebGL Integration**: Advanced graphics for background effects
- **API Integration**: RESTful API calls to Sleeper.app
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

### **Key Components**
- `TeamFormation`: Main formation display and layout management
- `PlayerCard`: Enhanced player cards with context menu
- `PlayerInspect`: Detailed player inspection modal
- `Background`: WebGL animated background system
- `SleeperAPI`: API integration and data fetching

## 📁 Project Structure
```
fantasy-football-app/
├── public/
│   ├── players.json          # Player database
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TeamFormation.tsx # Main team display and management
│   │   ├── TeamBuilder.tsx   # Team building interface with placeholder cards
│   │   ├── PlayerCard.tsx    # Enhanced player cards with context menu
│   │   ├── PlayerInspect.tsx # Player inspection modal
│   │   ├── Background.tsx    # WebGL animated background
│   │   ├── PlayerSelectionModal.tsx # Player selection and swap interface
│   │   └── DemoMode.tsx      # Sample data
│   ├── services/
│   │   └── SleeperAPI.ts     # API integration
│   ├── types/
│   │   └── Player.ts         # TypeScript interfaces
│   ├── utils/
│   │   └── positionValidation.ts # Position validation logic
│   ├── App.tsx               # Main application with mode switching
│   └── index.tsx             # Application entry point
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
- **Chemistry Rules**: Customize connection logic and bonus amounts
- **Player Display**: Modify what information shows on player cards
- **Background Effects**: Adjust WebGL background parameters

## 🎯 Use Cases

### **Fantasy Football Managers**
- **Team Analysis**: Visualize player connections and chemistry bonuses
- **Roster Management**: Organize starters and bench players with easy swapping
- **Strategy Planning**: Use chemistry bonuses to optimize lineups
- **Player Research**: Detailed player information and connection analysis

### **Sports Enthusiasts**
- **Team Visualization**: See your fantasy team in an engaging, modern format
- **Chemistry Insights**: Understand how player relationships affect performance
- **Performance Tracking**: Monitor player bonuses and connection multipliers
- **Interactive Experience**: Engage with your team through modern UI/UX

### **Developers**
- **React Learning**: Study modern React patterns, hooks, and TypeScript usage
- **WebGL Integration**: Learn how to integrate advanced graphics in React apps
- **API Integration**: Learn how to integrate external sports APIs
- **UI/UX Design**: Explore responsive design, animations, and modern interfaces

## 🚀 Recent Updates

### **v3.0 - Team Builder & Enhanced Chemistry**
- ✅ **Team Builder Mode**: Complete team building interface with placeholder cards
- ✅ **Chemistry Toggle**: Enable/disable chemistry calculations for strategy experimentation
- ✅ **Default Placeholder Cards**: Black cards with "Select <Position>" text for all positions
- ✅ **Enhanced Player Selection**: Improved modal with fallback images and search functionality
- ✅ **Clear Team Function**: One-click team reset to placeholder cards
- ✅ **Improved UI/UX**: Better button styling and header organization
- ✅ **Position Validation**: Ensures players can only be placed in valid positions

### **v2.0 - Chemistry System Overhaul**
- ✅ Dynamic chemistry connection detection
- ✅ Support for both NFL Team Boost and College Connection bonuses
- ✅ PlayerInspect modal with detailed chemistry analysis
- ✅ Context menu interface for player interactions
- ✅ WebGL animated background system
- ✅ Enhanced player cards with improved styling
- ✅ Real-time chemistry bonus calculations

### **v1.0 - Core Features**
- ✅ Team formation display
- ✅ Player card system
- ✅ Sleeper.app integration
- ✅ Basic chemistry connections

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

- **Bug Reports**: Open issues for any problems you encounter
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit pull requests for enhancements
- **Documentation**: Help improve this README or add code comments
- **Chemistry Rules**: Help refine the connection patterns and bonus systems

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Sleeper.app** for providing the fantasy football API
- **React Team** for the amazing framework
- **OGL Library** for WebGL graphics capabilities
- **React Bits** for UI component inspiration
- **Fantasy Football Community** for inspiration and feedback

---

**Ready to manage your fantasy football team with advanced chemistry analysis and team building?** 🏆

Start the app, explore the new Team Builder mode, experiment with chemistry toggles, and discover how player connections can boost your team's performance! 

**New in v3.0**: Build teams from scratch with placeholder cards, toggle chemistry on/off, and enjoy an enhanced team building experience! 🚀

**New in v2.0**: Click any player card to inspect their chemistry connections and see exactly how they boost your team! 🔬 
