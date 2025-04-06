# Demand and Supply Analysis for Agricultural Products

A comprehensive NextJS application for analyzing agricultural demand and supply trends, optimizing crop production, and making data-driven decisions.

## Overview

This platform provides farmers and agricultural stakeholders with tools to analyze market trends, manage crops efficiently, and maximize profits through data-driven insights.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Key Features

- **Market Trend Analysis**: Real-time data on agricultural product prices and demand
- **Crop Management**: Tools for planning, tracking, and optimizing crop production
- **Market Reports**: Comprehensive reports on market conditions and forecasts
- **Farm Inventory Management**: Track and manage farm resources and products
- **User Authentication**: Secure access to personalized dashboards and data
- **Responsive Design**: Optimized for all devices from desktop to mobile

## Technology Stack

- Next.js for frontend and API routes
- React for component-based UI
- Tailwind CSS for styling
- Authentication system with JWT
- Chart.js for data visualization

## Project Structure

The application follows Next.js 13+ App Router architecture with route groups for organization:
- `(auth)`: Authentication-related pages
- `(authenticated)`: Protected pages that require login
- Feature-specific directories for different functionalities

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) for optimized font loading.

