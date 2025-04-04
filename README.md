# Krishok's - Agricultural Demand & Supply Analysis Dashboard

Krishok's is a comprehensive platform designed for farmers to analyze market trends, optimize crop production, and make data-driven decisions for better yields and profits. The application provides real-time analytics on agricultural markets, crop management tools, and connections with buyers and sellers.

![Krishok's Dashboard](public/placeholder.svg)

## Features

### For Farmers
- **Dashboard Analytics**: Monitor farm performance, crop health, and weather conditions
- **Market Analysis**: Track price trends, demand patterns, and market forecasts
- **Crop Management**: Manage crop inventory, growing cycles, and health tracking
- **Buyer Connections**: Find and connect with potential buyers for your produce
- **Inventory Management**: Track and manage farming resources and harvested crops

### Key Components
- **My Farm Dashboard**: Visualize farm performance metrics in real-time
- **Market Analysis**: Detailed analytics on market trends and price forecasting
- **Crop Database**: Access information on various crop types, optimal growing conditions
- **Inventory Scanner**: Track and manage farm resources and equipment
- **Market Reports**: Access comprehensive reports on agricultural markets

## Technologies Used

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui component library
- **Authentication**: JWT-based authentication system
- **State Management**: React Context API
- **Data Visualization**: Custom chart components
- **Icons**: Tabler Icons

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/krishoks.git
cd krishoks
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
├── app/                  # Next.js app router pages
│   ├── dashboard/        # Main dashboard views
│   ├── my-farm/          # Farm management views
│   ├── market-analysis/  # Market analytics views
│   ├── crop-management/  # Crop management interface
│   ├── buyers-sellers/   # Buyer/seller connection portal
│   ├── crop-database/    # Crop information database
│   ├── market-reports/   # Market reports and analysis
│   ├── inventory-scanner/ # Inventory management system
│   ├── login/            # User authentication
│   └── signup/           # New user registration
├── components/           # Reusable React components
├── lib/                  # Utilities and helper functions
│   └── auth/             # Authentication context and utilities
├── public/               # Static assets
└── styles/               # Global styles
```

## Usage

### Authentication

The platform includes a full authentication system with:
- User login/logout functionality
- New user registration
- Role-based access control

Demo credentials:
- Email: `farmer@example.com`
- Password: `password123`

### Dashboard Navigation

The sidebar provides easy navigation between:
- Main dashboard
- My Farm
- Market Analysis
- Crop Management
- Buyers & Sellers
- Crop Database
- Market Reports
- Inventory Scanner

## Customization

### Theme Customization

The application uses Tailwind CSS for styling. You can customize the theme by modifying the `tailwind.config.js` file.

### Adding New Features

To add new features or sections:
1. Create a new page in the appropriate directory under `app/`
2. Update the sidebar navigation in `components/app-sidebar.tsx`
3. Add necessary components and logic

## Deployment

The application can be deployed on any platform that supports Next.js applications:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Farm illustrations and icons from [Tabler Icons](https://tabler-icons.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Next.js framework by Vercel
