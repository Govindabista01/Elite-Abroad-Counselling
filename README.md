# Elite Abroad - Study Abroad Consultancy Website

A full-stack web application for a study abroad consultancy firm, built with Django (backend) and Next.js (frontend).

## Project Overview

Elite Abroad is a comprehensive platform designed to help students pursue international education. The system manages:
- Study destinations (countries & universities)
- Consulting services
- Client inquiries
- Test preparation courses
- Blog content
- User authentication

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Django 5.1, Django REST Framework |
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS 4, Framer Motion |
| Database | SQLite (development) |
| Authentication | Django Authentication |

## Project Structure

```
EAC/
├── backend/
│   ├── elite_abroad/       # Django project settings
│   ├── core/             # Custom user model
│   ├── services/         # Consulting services
│   ├── destinations/    # Countries & universities
│   ├── blog/            # Blog posts
│   ├── inquiries/       # Client inquiries
│   ├── test_prep/       # Test preparation courses
│   └── manage.py
│
├── frontend/
│   ├── app/             # Next.js App Router
│   ├── components/       # React components
│   ├── lib/             # Utilities & API
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm or yarn

### Backend Setup

1. Create virtual environment:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

2. Install dependencies:
```bash
pip install django djangorestframework django-cors-headers python-dotenv
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create superuser:
```bash
python manage.py createsuperuser
```

5. Start development server:
```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Environment Variables

Create `backend/.env`:
```
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

Create `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Features

### Backend API Endpoints

| Endpoint | Description |
|---------|-------------|
| `/api/countries/` | List of study destinations |
| `/api/universities/` | Universities by country |
| `/api/services/` | Consulting services |
| `/api/blog/` | Blog posts |
| `/api/test-prep/` | Test preparation courses |
| `/api/inquiries/` | Submit client inquiries |

### Frontend Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/universities` | University directory |
| `/blog` | Blog listing |
| `/blog/[slug]` | Individual blog post |

### Key Components

- **Hero Section**: Animated landing with Framer Motion
- **Services**: Grid display with hover effects
- **Destinations**: Country cards with flags
- **Partner Logos**: University showcase
- **Test Prep**: Course enrollment
- **Testimonials**: Client reviews
- **FAQ**: Accordion FAQ
- **Contact Form**: Inquiry submission with validation

## Data Models

### Country
- `name`: Destination country name
- `description`: Brief description
- `image`: Cover image

### University
- `name`: University name
- `country`: ForeignKey to Country
- `website`: Official website URL
- `logo`: University logo

### Service
- `title`: Service name
- `description`: Service details
- `image`: Service image
- `created_at`: Timestamp

### Inquiry
- `name`, `email`, `phone`: Contact info
- `destination`: Desired country
- `study_level`: Education level
- `test_type`: Test preparation type
- `message`: Additional message
- `status`: Tracking status (NEW → CONTACTED → IN_PROGRESS → CONVERTED → CLOSED)

### BlogPost
- `title`: Post title
- `slug`: URL slug
- `content`: Full content
- `author`: User reference
- `published_date`: Publication date
- `image`: Featured image

### TestPrepCourse
- `name`: Course name (IELTS, GRE, etc.)
- `description`: Course description
- `duration`: Course duration
- `fee`: Course fee

## Admin Panel

Access Django admin at `http://localhost:8000/admin` to manage:
- Countries and universities
- Services offered
- Blog posts
- Client inquiries
- Test preparation courses

## Deployment

### Backend (Production)
1. Set `DEBUG=False` in `.env`
2. Configure production database (PostgreSQL recommended)
3. Set up Gunicorn/WSGI server
4. Configure reverse proxy (nginx)

### Frontend (Production)
```bash
npm run build
npm start
```

Configure environment variable `NEXT_PUBLIC_API_URL` to production backend URL.

## Development Scripts

| Command | Description |
|---------|-------------|
| `backend\run.bat` | Start Django server |
| `frontend\dev.bat` | Start Next.js dev server |
| `frontend\install.bat` | Install frontend deps |
| `populate.bat` | Populate sample data |

## License

Copyright © 2024 Elite Abroad. All rights reserved.