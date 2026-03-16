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

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended for full functionality)

### Installation

1. Clone or download the repository
2. Serve the files using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser

### Direct File Access

You can also open `index.html` directly in your browser, but some features may be limited due to browser security restrictions.

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

- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Database**: SQLite (wa-sqlite) with localStorage fallback
- **Styling**: Custom CSS with Tailwind-inspired utility classes
- **Icons**: Inline SVG icons for minimal dependencies

### Browser Compatibility

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

### File Structure

```
contacts-inventory/
├── index.html          # Main application file
├── README.md           # This file
└── dist/               # Build output directory (if using build tools)
    └── output.css       # Compiled styles
```

## Development

### Modifying Styles

The application uses custom CSS classes. Main color variables are defined in the `<style>` section of `index.html`:

- **Background**: `#0f0f11` (dark background)
- **Surface**: `#18181c` (card backgrounds)
- **Accent**: `#7c6af7` (primary accent color)
- **Success**: `#3ecf8e` (green for returned items)
- **Warning**: `#f5a623` (amber for partial returns)
- **Error**: `#f97171` (red for outstanding items)

### Adding Features

The codebase is organized into clear sections:

1. **Database Layer**: `SQLiteDB` class with fallback support
2. **State Management**: Global variables for contacts and inventory
3. **UI Rendering**: Functions for updating the interface
4. **Event Handlers**: User interaction handlers

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or feature requests, please create an issue in the project repository.