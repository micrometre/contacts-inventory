# Contacts Inventory Tracker

A simple, modern web application for tracking inventory items lent to contacts. Built with vanilla HTML, CSS, and JavaScript, featuring a dark theme and SQLite database support with localStorage fallback.

## Features

- **Contact Management**: Add, view, and delete contacts with name, email, and phone information
- **Inventory Tracking**: Track items lent to each contact with quantity, date, and notes
- **Return Management**: Mark items as returned with partial return support
- **Dashboard**: View all inventory items across all contacts with status indicators
- **Search**: Filter contacts by name or email
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: SQLite database with localStorage fallback
- **Dark Theme**: Modern dark interface with accent colors

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. Clone or download repository
2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser (Vite's default port)

### Building for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Adding Contacts

1. Click the "Add contact" button in the sidebar
2. Enter contact details (name is required, email and phone are optional)
3. Click "Save contact"

### Managing Inventory

1. Select a contact from the sidebar
2. Add items using the form at the top:
   - **Item Name**: Description of the item
   - **Quantity**: Number of units lent
   - **Date Given**: When the item was lent
   - **Notes**: Optional additional information
3. Click "+ Add Item" to save

### Returning Items

1. Select a contact with outstanding items
2. Click the return button next to any item
3. Enter the quantity returned and return date
4. Click "Confirm Return"

### Deleting Contacts

1. Hover over a contact in the sidebar
2. Click the trash icon that appears
3. The contact and all their inventory items will be deleted immediately

### Dashboard

The dashboard shows:
- All inventory items across all contacts
- Status indicators (out, partial, returned)
- Click on any contact name to jump to their inventory

## Data Storage

The application uses SQLite for data storage when available, with automatic fallback to localStorage:

- **SQLite Mode**: Full database functionality with proper indexing and foreign key constraints
- **Fallback Mode**: localStorage-based storage for environments without SQLite support

Data is persisted locally in your browser and remains available between sessions.

## Technical Details

### Architecture

- **Frontend**: Vanilla HTML, CSS, JavaScript (ES modules)
- **Build Tool**: Vite for development and bundling
- **Database**: SQLite (wa-sqlite) with localStorage fallback
- **Styling**: Tailwind CSS with custom utility classes
- **Icons**: Inline SVG icons for minimal dependencies

### Browser Compatibility

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### File Structure

```
contacts-inventory/
├── index.html          # Main HTML entry point
├── package.json         # Project dependencies and scripts
├── README.md           # This file
├── src/                # Source files
│   ├── input.css        # Tailwind CSS input
│   └── main.js         # Main JavaScript (if using separate JS)
└── dist/               # Build output directory
    └── output.css       # Compiled Tailwind CSS
```

## Development

### Modifying Styles

The application uses Tailwind CSS with custom utility classes. To modify styles:

1. **For development**: Run the CSS build watcher:

```bash
npm run css:build
```

2. **Main colors** are defined in the `<style>` section of `index.html`:
   - **Background**: `#0f0f11` (dark background)
   - **Surface**: `#18181c` (card backgrounds)
   - **Accent**: `#7c6af7` (primary accent color)
   - **Success**: `#3ecf8e` (green for returned items)
   - **Warning**: `#f5a623` (amber for partial returns)
   - **Error**: `#f97171` (red for outstanding items)

3. **Tailwind classes** are available for rapid development

### Adding Features

The codebase is organized into clear sections in `index.html`:

1. **Database Layer**: `SQLiteDB` class with fallback support
2. **State Management**: Global variables for contacts and inventory
3. **UI Rendering**: Functions for updating the interface
4. **Event Handlers**: User interaction handlers

### Development Workflow

```bash
# Start CSS watcher for style changes
npm run css:build

# In another terminal, start Vite dev server
npm run dev
```

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or feature requests, please create an issue in the project repository.