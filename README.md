# Data Repository Frontend

A modern web application for managing and sharing datasets, built with React, TypeScript, and Django.

## Features

- User authentication
- Upload datasets (single or multiple files)
- Automatic ZIP creation for multiple files
- Public/private dataset visibility
- Dataset management (create, read, update, delete)
- File download functionality
- Modern, responsive UI

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

## Project Structure

```
.
├── backend/               # Django backend
│   ├── core/             # Django project settings
│   ├── datasets/         # Datasets app
│   ├── requirements.txt  # Python dependencies
│   └── manage.py         # Django management script
└── src/                  # React frontend
    ├── components/       # Reusable components
    ├── pages/           # Page components
    ├── api.ts           # API integration
    └── ...
```

## Setup

### Backend Setup

1. Create and activate a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Create a superuser (optional):
   ```bash
   python manage.py createsuperuser
   ```

5. Start the backend server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## API Endpoints

- `GET /api/datasets/` - List all datasets
- `POST /api/datasets/` - Create a new dataset
- `GET /api/datasets/{id}/` - Get dataset details
- `PATCH /api/datasets/{id}/` - Update dataset
- `DELETE /api/datasets/{id}/` - Delete dataset
- `GET /api/datasets/{id}/download/` - Download dataset

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 