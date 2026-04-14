# ⚖ LegalTrack

**A legal productivity system for attorneys and paralegals** GOAL: manage cases, log billable time, track deadlines, and store documents, all in a single browser-based application with no backend required.

---

## Features

### 📊 Dashboard
- At-a-glance summary cards: Active Matters, Total Hours, Unbilled Value, and Overdue Items
- Upcoming deadlines list with priority badges and day countdown
- Matters breakdown by practice area with a visual bar chart
- Overdue items alert panel

### 📁 Cases
- Create and manage legal matters with client, attorney, practice area, status, and notes
- Search matters by name or client in real time
- Filter by status (Active, Pending, Closed, On Hold)
- Click into any matter to open a **Case Detail** view with:
  - Extended summary / strategy notes (auto-saved)
  - Document uploads with file type icons, size display, and download links
- Export all cases to CSV

### ⏱ Time Log
- Log billable time entries linked to a matter, with date, task description, hours, and hourly rate
- Filter entries by attorney/paralegal
- Summary stats (Total Hours, Total Value, Unbilled) update dynamically based on the active filter
- Toggle entries between Billed and Unbilled
- Export filtered time log to CSV

### 📅 Deadlines
- Add deadlines linked to a matter with due date, description, and priority
- Visual status indicators: overdue items highlighted in red, items due within 7 days in yellow
- Mark deadlines as done with a checkbox (strikethrough + faded style)
- Sorted chronologically
- Export to CSV

---

## Multilingual Support

The full interface is available in three languages, switchable at any time from the top navigation bar:

| Flag | Code | Language |
|------|------|----------|
| 🇺🇸 | `en` | English  |
| 🇪🇸 | `es` | Spanish  |
| 🇫🇷 | `fr` | French   |

Language preference is persisted across sessions via `localStorage`.

---

## Data Persistence

All data (cases, time logs, deadlines) is stored in the browser's `localStorage` — no account, no server, no database needed. Data survives page refreshes and browser restarts.

---

## Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Page structure and entry point |
| CSS3 + [Tailwind CSS](https://tailwindcss.com/) (CDN) | Styling and responsive layout |
| [React 18](https://react.dev/) (CDN) | UI components and state management |
| [Babel Standalone](https://babeljs.io/) (CDN) | In-browser JSX transpilation |

No build tools, no `node_modules`, no bundler. Everything runs directly in the browser.

---

## Project Structure

```
TrackingSystem/
├── index.html     # HTML shell — loads dependencies and mounts the React app
├── app.js         # All React components, logic, and translations (JSX)
└── styles.css     # Custom CSS overrides (Tailwind handles most styling)
```

---

## Running Locally

Because `app.js` is loaded as an external Babel script, the app must be served over HTTP — opening `index.html` directly via `file://` will not work.

**Option 1 — VS Code Live Server**
Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html` → **Open with Live Server**.

**Option 2 — npx serve**
```bash
npx serve TrackingSystem
```
Then open `http://localhost:3000`.

**Option 3 — Python**
```bash
cd TrackingSystem
python3 -m http.server 8080
```
Then open `http://localhost:8080`.
