# ReadingList by Openhands

A simple reading list manager built with React and Vite, using localStorage for data persistence.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
```bash
npm run dev
```
The application will be available at:
- http://localhost:5173
- Or a custom port if specified (see Troubleshooting)

### Building for Production
```bash
npm run build
```
The production-ready files will be in the `dist/` directory.

### Deployment
1. Build the project using `npm run build`
2. Serve the `dist/ directory using your preferred web server
3. For production deployment, consider using:
   - Nginx
   - Apache
   - Vercel
   - Netlify

## Troubleshooting

### 1. Port Conflicts
If the default port (5173) is unavailable:
```bash
npm run dev -- --port [YOUR_PORT]
```

### 2. Network Access Issues
If you can't access the app from other devices:
```bash
npm run dev -- --host 0.0.0.0 --port [YOUR_PORT]
```

### 3. LocalStorage Issues
- Clear browser cache if data appears corrupted
- Check browser's localStorage quota if saving fails
- Ensure cookies are enabled in browser settings

### 4. Common Errors
- **"localhost didn't send any data"**: Ensure the server is running and accessible
- **"Module not found"**: Run `npm install` to ensure all dependencies are installed
- **"Invalid localStorage data"**: Clear localStorage and restart the app

## Features
- Add/remove reading items
- Mark items as read/unread
- Data persistence using localStorage
- Responsive design

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
