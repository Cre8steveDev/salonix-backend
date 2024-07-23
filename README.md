# Salonix - A Full-featured Salon Booking System for Cross-platform applications

This repository will serve as the backend providing REST resources to the frontend of the application and can be extended to any other application.

## About the Project

As part of my building my skills in building full stack applications on native applications (Currently Android - using Expo Go Framework). I'm building Salonix (Just after building Quotix - which I used as a hands-on project to improve my knowledge of mobile development) - This is the Codebase for the Backend.

## AUTHOR

- Stephen Omoregie
- <cre8stevedev@gmail.com>
- Twitter: [@Cre8steveDev](https://twitter.com/Cre8steveDev)
- LinkedIn: <https://www.linkedin.com/in/stephen-omoregie/>
- Portfolio: [Visit my Portfolio](https://cre8stevedev.me/)
- Available for Work: _YES_
-

## Features

- Custom authentication and authorization flow using JWT ✅
- Interval-based token refresh for enhanced session management ✅
- MongoDB integration with transaction support for data consistency ✅
- RESTful API endpoints for salon service management, user profiles, and appointments ✅
- Modular code structure with route handlers and controllers ✅

## Technologies Used for the Backend of this project

- NodeJS (ExpressJs Framework)
- TypeScript - For Typesafety and ease during development
- MongoDB - NoSQL Database (Hosted remotely on MongoDB Atlas)
- JSONWebTokens - For Signing Authentication for the user
- MongoDB transactions for data integrity
- Postman - for testing API Endpoints

## Installation

Clone the repository

```bash
git clone https://github.com/Cre8steveDev/salonix-backend.git
```

Navigate to the project directory

```bash
cd salonix-backend
```

Install dependencies

```bash
npm install
```

Set up environment variables:

- Create a `.env` file in the root directory and add the following:

```javascript
MONGO_URI=
PORT=
COOKIE_SECRET=
SESSION_SECRET=
PAYSTACK_KEY=
```

Start the development server

```bash
npm run dev
```

## API Lazy Documentation

### Authentication / Authenticated Routes

```bash
POST {{HOST_URL}}/api/auth/signup
POST {{HOST_URL}}/api/auth/signin
GET {{HOST_URL}}/api/auth/refresh-token 🔐
GET {{HOST_URL}}/api/auth/get-wallet 🔐
POST {{HOST_URL}}/api/auth/update-wallet 🔐
```

### Resources Endpoint

```bash
GET {{HOST_URL}}/api/resources/services/:serviceID
GET {{HOST_URL}}/api/resources/popular
```

### Seed the database with data for the Services/Popular Styles during development

```bash
POST {{HOST_URL}}/api/resources/services/seed
POST {{HOST_URL}}/api/resources/popular/seed
```

### Insert the JSON Data below for the Services into your Database

You can find the data in the json file `./Salonix.services.json`

### Insert the JSON Data below for the Popular Hairstyles into your Database

You can find the data in the json file `./Salonix.popularhairstyles.json`

Study the schema to understand the document.

### Getting Appointment Data

```bash
GET {{HOST_URL}}/api/appointments/day/:date
POST {{HOST_URL}}/api/appointments/book 🔐
GET {{HOST_URL}}/api/appointments/all-appointments

```

## Database Schema

[Describe your MongoDB schema, including main collections and their relationships]

## Authentication Flow

The backend implements a custom authentication flow:

- User registration/login
- JWT token generation
- Interval-based token refresh
- Secure routes with JWT middleware

## Data Consistency

MongoDB transactions are used to ensure atomicity and data consistency, particularly for multi-update operation as when the user Books an appointment:

- Updating user account balances
- Recording transactions in user wallet document
- Updating user appointment array

## Development

This project uses TypeScript for improved type safety and development experience.
