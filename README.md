# Zoho People Dashboard

An elegant Zoho People Management Dashboard built with SvelteKit and Node.js, featuring a beautiful gold and off-white gradient design inspired by Crextio.

## Features

- 🎨 **Elegant Design**: Gold and off-white gradient theme with smooth animations
- 📊 **Real-time Data**: Fetches live data from Zoho People API
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast**: Built with SvelteKit for optimal performance
- 🔒 **Secure**: Server-side API integration with proper authentication

## Data Sources

This dashboard integrates with the following Zoho People API endpoints:

- `ZOHOPEOPLE.employee.ALL` - All employee data
- `ZOHOPEOPLE.employee.READ` - Individual employee details
- `ZOHOPEOPLE.leave.READ` - Leave records and requests
- `ZOHOPEOPLE.offboarding.ALL` - Offboarding data
- `ZOHOPEOPLE.onboarding.ALL` - Onboarding data
- `ZOHOPEOPLE.organization.READ` - Organization structure
- `ZOHOPEOPLE.timetracker.all` - Time tracking data
- `zohopeople.attendance.READ` - Attendance records

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Zoho People API credentials
- Active Zoho People account with API access

### Installation

1. **Clone and Setup**
   ```bash
   cd "Zoho People Dashboard"
   npm install
   ```

2. **Configure Environment Variables**
   
   Copy `.env` file and update with your Zoho People API credentials:
   ```env
   ZOHO_CLIENT_ID=your_zoho_client_id
   ZOHO_CLIENT_SECRET=your_zoho_client_secret
   ZOHO_REDIRECT_URI=http://localhost:5173/auth/callback
   ZOHO_REFRESH_TOKEN=your_zoho_refresh_token
   ZOHO_ACCESS_TOKEN=your_zoho_access_token
   ZOHO_PEOPLE_API_URL=https://people.zoho.com/people/api
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   Navigate to `http://localhost:5173`

## Getting Zoho API Credentials

1. **Create Zoho App**
   - Go to [Zoho Developer Console](https://api-console.zoho.com/)
   - Create a new application
   - Select "Server-based Applications"

2. **Configure OAuth**
   - Set redirect URI to your application URL
   - Note down Client ID and Client Secret

3. **Generate Tokens**
   - Use OAuth 2.0 flow to get access and refresh tokens
   - Ensure you have the required scopes for Zoho People API

## Project Structure

```
src/
├── lib/
│   ├── components/          # Reusable Svelte components
│   │   ├── Header.svelte   # Top navigation
│   │   ├── Sidebar.svelte  # Navigation sidebar
│   │   ├── KPICard.svelte  # KPI display cards
│   │   ├── ChartCard.svelte# Chart components
│   │   └── TableCard.svelte# Data table components
│   └── server/
│       └── zohoApi.js      # Zoho People API integration
├── routes/
│   ├── api/                # Backend API endpoints
│   │   ├── employees/      # Employee data API
│   │   ├── attendance/     # Attendance API
│   │   ├── leave/          # Leave records API
│   │   ├── onboarding/     # Onboarding API
│   │   ├── offboarding/    # Offboarding API
│   │   ├── organization/   # Organization API
│   │   ├── timetracker/    # Time tracking API
│   │   └── dashboard/      # Dashboard summary API
│   ├── +page.svelte       # Main dashboard page
│   └── +page.server.js    # Server-side data loading
├── app.html               # HTML template
└── app.css               # Global styles and Tailwind
```

## Dashboard Features

### 📊 KPI Cards
- Total Employees count
- Present Today count
- Pending Approvals
- Average Check-in time

### 📈 Charts & Analytics
- Check-ins vs Check-outs trend (Area chart)
- Attendance split pie chart
- Regularization requests bar chart

### 📋 Data Tables
- Today's attendance with status
- Pending approvals with actions

### 🎨 Design Features
- Gold and off-white gradient background
- Glassmorphism cards with backdrop blur
- Smooth hover animations
- Responsive grid layout
- Custom color palette

## API Endpoints

### Frontend APIs
- `GET /api/employees` - Get all employees
- `GET /api/attendance?fromDate=&toDate=` - Get attendance data
- `GET /api/leave?employeeId=&fromDate=&toDate=` - Get leave records
- `GET /api/onboarding` - Get onboarding data
- `GET /api/offboarding` - Get offboarding data
- `GET /api/organization` - Get organization data
- `GET /api/timetracker?fromDate=&toDate=&employeeId=` - Get timetracker data
- `GET /api/dashboard` - Get dashboard summary

## Customization

### Colors
Update `tailwind.config.js` to modify the gold and off-white color palette:

```javascript
theme: {
  extend: {
    colors: {
      'gold': {
        // Your custom gold shades
      },
      'offwhite': {
        // Your custom off-white shades
      }
    }
  }
}
```

### Components
All components are modular and can be easily customized or replaced.

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Environment Variables for Production
Make sure to set all environment variables in your production environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the [Zoho People API Documentation](https://www.zoho.com/people/api/)
- Review SvelteKit documentation
- Create an issue in this repository

---

Built with ❤️ using SvelteKit, Node.js, and Tailwind CSS
