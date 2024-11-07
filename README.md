# FinTrack

FinTrack is a demo stock portfolio tracking application built with .NET 8 and Next.js. The application allows users to search for stocks, create portfolios, and track their performance over time.

## Demo

[https://fin-track-rho.vercel.app](https://fin-track-rho.vercel.app)  


## Features

### Authentication
- User registration and login with JWT authentication
- Token-based session management with refresh tokens
- Secure password handling and validation

### Stock Management
- Real-time stock search functionality
- Integration with Financial Modeling Prep API for stock data
- Detailed company information including:
    - Company profile
    - Financial metrics
    - Stock performance data

### Portfolio Features
- Add stocks to personal portfolio
- Track purchase price and current value
- View portfolio performance metrics
- Real-time portfolio value updates

### User Interface
- Responsive design for mobile and desktop
- Clean and intuitive user experience
- Real-time search with debouncing
- Error handling and loading states

## Technology Stack

### Backend (.NET 8)
- ASP.NET Core Web API
- Entity Framework Core with PostgreSQL
- JWT Authentication
- Hangfire for background jobs
- Clean Architecture pattern
- Repository pattern
- Dependency Injection

### Frontend (Next.js)
- React 18 with TypeScript
- Tailwind CSS for styling
- ShadcnUI components
- JWT token management
- Client-side form validation
- Responsive design

### Infrastructure
- Frontend hosted on Vercel
- Backend hosted on Azure App Services
- PostgreSQL database
- CI/CD with GitHub Actions

## Purpose

This project serves as a demonstration of modern full-stack development practices and architecture. It showcases the integration of various technologies and implementation of common features required in web applications.

## Project Status

This is a demo project and should not be used for actual financial decisions. The application uses free API tiers and has limited functionality.

## Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js 18+
- PostgreSQL database
- Financial Modeling Prep API key

### Environment Variables

Backend:
```
ConnectionStrings__DefaultConnection=your_postgresql_connection_string
JWT__TokenKey=your_jwt_token_key
JWT__Issuer=your_issuer
JWT__Audience=your_audience
FMPKey=your_financial_modeling_prep_api_key
```

Frontend:
```
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_API_KEY=your_financial_modeling_prep_api_key
```

## License

This project is open-source and available under the MIT License.

## Acknowledgments

- Financial data provided by Financial Modeling Prep API
- UI components from Shadcn UI
- Icons from Lucide React