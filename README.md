# Fantasy Football Team Manager

A React app that connects to Sleeper.app's API to display your fantasy football team in a beautiful 4-3-3 formation layout.

## Features

- 🏟️ Beautiful football pitch design with 4-3-3 formation
- 👥 Player cards with photos, stats, and position indicators
- 🔗 Direct integration with Sleeper.app API
- 📱 Responsive design for mobile and desktop
- 🎨 Modern dark theme UI similar to FUT.GG

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Your Sleeper API Credentials

You'll need to find your **League ID** and **User ID** from Sleeper:

1. **League ID**: Go to your Sleeper league and copy the ID from the URL
   - Example: `https://sleeper.app/league/1234567890` → League ID is `1234567890`

2. **User ID**: Go to your Sleeper profile and copy your user ID
   - Example: `https://sleeper.app/user/abcdef123` → User ID is `abcdef123`

### 3. Update Configuration

Open `src/App.tsx` and update these lines with your actual values:

```typescript
const leagueId = 'YOUR_LEAGUE_ID'; // Replace with your actual league ID
const userId = 'YOUR_USER_ID';      // Replace with your actual user ID
```

### 4. Start the Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## How It Works

1. **API Integration**: The app connects to Sleeper's public API to fetch your team data
2. **Team Display**: Players are automatically positioned in a 4-3-3 formation based on their positions
3. **Real-time Data**: Player stats, photos, and injury status are pulled directly from Sleeper
4. **Responsive Design**: Works on both desktop and mobile devices

## API Endpoints Used

- `GET /league/{league_id}` - Get league information
- `GET /league/{league_id}/rosters` - Get all team rosters
- `POST /players/nfl` - Get detailed player information

## Troubleshooting

### Common Issues

1. **"Failed to fetch team data"**
   - Check that your League ID and User ID are correct
   - Ensure your Sleeper league is active and public
   - Check your internet connection

2. **No players showing**
   - Verify that your team has players assigned to positions
   - Check that the position abbreviations match (LW, ST, RW, CM, LB, CB, RB, GK)

3. **CORS errors**
   - Sleeper's API should work without CORS issues
   - If you encounter problems, try using a different browser

### Getting Help

- Check the browser console for error messages
- Verify your Sleeper league settings
- Ensure your team has players in the correct positions

## Customization

You can easily customize the app by:

- Changing the formation in `src/components/TeamFormation.tsx`
- Modifying colors in the CSS files
- Adding new player statistics
- Implementing additional features like player search or team comparison

## Technologies Used

- **React 18** with TypeScript
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Sleeper.app API** for fantasy football data
- **Responsive design** for all devices

## License

This project is open source and available under the MIT License.
"# fantasy-football-app" 
