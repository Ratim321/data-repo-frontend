# DataRepo Frontend

A Kaggle-like data repository frontend built with React, TypeScript, and Tailwind CSS.

## Features

- View a list of datasets with metadata
- Create new datasets with name, description, and tags
- Upload data files (CSV, JSON)
- View dataset details
- Responsive design
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd data-repo-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
data-repo-frontend/
├── src/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── DatasetList.tsx
│   │   ├── CreateDataset.tsx
│   │   └── DatasetDetails.tsx
│   ├── types.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS (via CDN)

## Development

The project uses Vite as the build tool and development server. The main entry point is `src/main.tsx`, which renders the `App` component.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## License

MIT 