# Mi Licencia Frontend 🚗⚛️

React frontend application for a driving license management system built with Vite, React 19, and Tailwind CSS.

## 📋 Overview

This is the frontend client for the Mi Licencia driving license management system.

### 🎯 Key Features

- **Multi-Role Dashboard**: Tailored interfaces for Students, Professors, and Administrators
- **Authentication System**: Secure login/register with JWT-based authentication
- **Student Management**: Enrollment in classes and tracking progress
- **Professor Tools**: Class management and attendance tracking
- **Admin Panel**: User management and class administration
- **Modern UI/UX**: Clean and intuitive interface with smooth interactions

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Form Handling**: React Hook Form
- **Data Tables**: TanStack React Table
- **Alerts**: SweetAlert2
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Development**: ESLint

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── manage.svg         # App logo
│   └── vite.svg          # Vite logo
├── src/
│   ├── api/              # API service layer
│   ├── auth/             # Authentication module
│   │   ├── api/          # Auth API calls
│   │   ├── components/   # Auth UI components
│   │   ├── hooks/        # Auth custom hooks
│   │   ├── layout/       # Auth page layout
│   │   └── pages/        # Login/Register pages
│   ├── components/       # Shared UI components
│   ├── context/          # React contexts
│   ├── hooks/            # Global custom hooks
│   ├── router/           # Routing configuration
│   ├── ui/               # Main UI components
│   │   ├── components/   # Header, Footer, etc.
│   │   └── pages/        # Dashboard, Profile, etc.
│   ├── user/             # Role-based modules
│   │   ├── admin/        # Admin-specific features
│   │   ├── professor/    # Professor-specific features
│   │   └── student/      # Student-specific features
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles
└── Configuration files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see [Backend README](../backend))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mi-licencia/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the frontend root directory:

   ```env
   # API Configuration
   VITE_API_URL=http://localhost:3000/api/v1

   # Development
   VITE_NODE_ENV=development
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173`

## 👥 User Roles & Features

### 🎓 Student Features

- **Enrollment Management**: Enroll in available driving classes
- **Class Tracking**: View enrolled classes and schedules

### 👨‍🏫 Professor Features

- **Class Management**: View assigned classes
- **Attendance Tracking**: Record student attendance

### 👨‍💼 Admin Features

- **User Management**: Create, update, and manage users
- **Class Administration**: Create and manage driving classes
- **System Overview**: Full system administration capabilities

## 🧭 Application Routes

### Public Routes

- `/login` - User authentication
- `/register` - New user registration

### Protected Routes

- `/` - Main dashboard (role-based content)
- `/dashboard` - User dashboard
- `/profile` - User profile management

### Student Routes

- `/enrollment` - Class enrollment interface

### Professor Routes

- `/assigned_classes` - View assigned classes
- `/attendance` - Take attendance

### Admin Routes

- `/manage_users` - User management interface
- `/manage_classes` - Class management interface

## 🔐 Authentication & Security

### Authentication Flow

1. User logs in via `/login`
2. JWT token received and stored in HTTP-only cookie
3. Token validated on each protected route
4. User permissions loaded based on role
5. Role-based navigation and features displayed

### Role-Based Permissions

```javascript
const rolePermissions = {
  estudiante: ['enrollment'],
  profesor: ['assigned_classes', 'attendance'],
  admin: ['manage_users', 'manage_classes'],
};
```

### Protected Routes

- Automatic redirection to login for unauthenticated users
- Role-based access control
- Token verification on app initialization

## 🎯 State Management

### Context Providers

- **AuthContext**: User authentication state and methods
- Role-based permissions management
- Error handling and loading states

### Custom Hooks

- `useAuth` - Authentication operations
- `useClasses` - Class management operations
- `useClassForm` - Class form handling
- `useEnrollments` - Enrollment operations
- `useUser` - User management operations

## 🔧 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build
```

## 📦 Dependencies

### Core Dependencies

- `react` (^19.0.0) - UI library
- `react-dom` (^19.0.0) - DOM rendering
- `react-router-dom` (^7.5.3) - Routing
- `vite` (^5.3.0) - Build tool

### UI & Styling

- `tailwindcss` (^4.1.4) - CSS framework
- `@tailwindcss/vite` (^4.1.4) - Vite integration

### Forms & Data

- `react-hook-form` (^7.56.1) - Form handling
- `@tanstack/react-table` (^8.21.3) - Data tables

### User Experience

- `sweetalert2` (^11.21.2) - Alerts

## 🌐 API Integration

### API Services

```javascript
// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Service modules
-auth.js - // Authentication endpoints
  users.js - // User management
  classes.js - // Class operations
  attendance.js - // Attendance tracking
  enrollment.js; // Student enrollments
```

### HTTP Client

- **Fetch API**: Native browser HTTP client
- **Cookie Support**: Automatic cookie handling
- **Error Handling**: Centralized error processing
- **Request Interceptors**: Authentication headers

## 🚀 Deployment

### Build Process

```bash
# Create production build
npm run build

# Files generated in dist/ directory
# Deploy dist/ contents to your web server
```

### Environment Variables

- Set `VITE_API_URL` to your production API URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Follow the code style (ESLint will help)
5. Test your changes
6. Commit your changes: `git commit -m 'Add new feature'`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request

### Code Style

- Follow ESLint configuration
- Use meaningful component and variable names
- Add comments for complex logic
- Maintain consistent file structure

## 🐛 Troubleshooting

### Common Issues

**CORS Errors**

- Ensure backend is running on correct port
- Check VITE_API_URL environment variable
- Verify backend CORS configuration

**Authentication Issues**

- Check if backend is running
- Verify JWT token configuration
- Clear browser cookies and try again

## 📄 License

This project is licensed under the ISC License.

## 🔗 Related

- [Backend API](../backend) - Node.js backend for this application
