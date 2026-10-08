# EcoPower Dashboard

EcoPower Dashboard is a lightweight frontend dashboard that simulates a smart renewable energy control panel. It lets users adjust solar and wind inputs, see live power generation, monitor battery charge, and trigger an "AI optimization" mode that automatically adjusts the system to maintain high output.

This project is designed as a static web app built with plain HTML, CSS, and JavaScript. It focuses on visual feedback, energy simulation logic, and interactive controls rather than a backend or database.

## Overview

The app models a small energy management system with:

- Solar generation based on sun intensity
- Wind generation based on wind speed
- Real-time total power output
- Battery charge simulation
- AI optimization mode that automatically changes the system inputs
- Status indicators for production levels

The dashboard is visually styled as a modern control center, using dark colors, cards, and gradient accents to represent energy production and system health.
<img width="942" height="883" alt="image" src="https://github.com/user-attachments/assets/78a16889-47a3-477a-badf-43dd3e571b6c" />

## Features

### 1. Renewable energy simulation
Users can control:

- Solar intensity from 0% to 100%
- Wind speed from 0 to 30 m/s

The script computes output using fixed maximum generation values:

- Solar max output: 50 kW
- Wind max output: 80 kW

Power is calculated as:

- Solar: (sunIntensity / 100) * 50
- Wind: if windSpeed > 3, then (windSpeed / 30) * 80
- Total: solar + wind

### 2. Battery charging system
The battery starts at 0% and increases over time when power production is active.

Charging behavior:

- Low production: slow charge rate
- Optimal production: faster charge rate
- No production: charging stops

The battery fill level is shown visually as a horizontal bar and a percentage value.

### 3. System status display
The app changes the status message depending on total output:

- 0 kW or lower: "System Standby"
- Less than 30 kW: "Low Production"
- 30 kW or more: "Optimal Production"

The status indicator changes color to match the system condition.

### 4. AI optimization mode
When the user clicks the AI button:

- Manual sliders are disabled
- AI mode activates and begins periodic adjustments
- The system selects random target values for sun and wind
- The dashboard updates the output and status in real time
- The AI message shows the latest adjustments

This simulates an automated energy balancing system without using real AI models or backend logic.

## Tech Stack

- HTML5 for page structure
- CSS3 for layout and styling
- JavaScript for logic and UI interaction
- Bootstrap Icons for visual iconography

There is no build system, package manager, or framework in this repository. The app is a static website intended to run as-is in a browser.

## Repository Structure

```text
EcoPower-Dashboard/
├── assets/
│   ├── css/
│   │   └── style.css          # Dashboard styling and responsive design
│   └── js/
│       └── script.js          # Energy calculations and interactivity
├── validator/
│   └── Screenshot 2025-12-11 162437.png
├── index.html                 # Main dashboard layout
├── README.md                  # Project documentation
└── .github/                   # not present in this repo snapshot
```

## Code Breakdown

### index.html
This file defines the UI layout for the dashboard. It includes:

- Header with application title
- Main display card for total output
- Battery storage card
- Solar panel control card
- Wind turbine control card
- AI optimization button and message area

The HTML also loads:

- `assets/css/style.css`
- Bootstrap Icons CDN
- `assets/js/script.js`

### assets/css/style.css
The stylesheet creates the dark, futuristic dashboard look. It contains:

- Reset styles and base theme
- Card layouts for output panels and controls
- Responsive grid layout
- Battery animation styling
- Range slider styling
- AI button styling
- Mobile responsiveness

### assets/js/script.js
This is the heart of the application. It handles:

- DOM element references
- Input ranges and output values
- Energy computation logic
- Battery charge simulation
- System status logic
- AI automation behavior

Key functions:

- `updateSystem()`
  - Reads slider values
  - Computes solar and wind output
  - Updates displayed numbers
  - Triggers status updates

- `updateStatus(power)`
  - Determines system state
  - Starts or stops charging
  - Changes UI colors and message labels

- `startCharging(rate)`
  - Uses `setInterval()` to increase battery percentage

- `stopCharging()`
  - Clears the battery charging interval

- `simulateAiAdjustment()`
  - Sets random sun and wind values
  - Re-runs the total system calculation
  - Updates the AI status message

## How the Application Works

When the page loads, the script waits for `DOMContentLoaded` and immediately calls `updateSystem()`.

This process:

1. Reads current slider values
2. Calculates approximate solar generation
3. Activates wind generation only when wind exceeds 3 m/s
4. Adds both values for total power
5. Updates the display
6. Changes status and battery behavior based on power output

If AI mode is enabled, the app continuously changes the slider values to simulate optimization in response to shifting conditions.

## Running the Project

Since this is a static site, there are no dependency installs or build commands required.

### Option 1: Open directly in a browser
Simply open `index.html` in any browser.

### Option 2: Run a local web server
From the project folder, run:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Notes

This repository is intentionally simple and demonstration-focused. It does not include:

- A backend API
- User authentication
- Database persistence
- Real sensor data integration
- Production-grade AI prediction logic

Instead, it demonstrates a realistic front-end energy dashboard pattern for educational or prototyping use.

## Suggested Enhancements

Potential improvements for the project include:

- Real-time charts for power generation over time
- Battery discharge logic during low production periods
- Energy consumption loads and demand simulation
- More advanced AI logic based on weather trends
- Local storage to persist dashboard settings
- API integration for real renewable energy data

## Conclusion

EcoPower Dashboard is a compact, interactive energy management prototype that simulates renewable resource optimization in a clean dashboard interface. It showcases front-end design, JavaScript-powered state updates, and UI-driven simulation logic without requiring a backend or framework.

It is ideal for learning how to build interactive web dashboards, model system behaviors, and combine visual feedback with logic-driven dynamic updates.
