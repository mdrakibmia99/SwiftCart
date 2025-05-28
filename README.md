# 🛒 SwiftCart E-Commerce Platform (Frontend)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Next.js](https://img.shields.io/badge/Next.js-14.0+-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

## 📌 Overview

A modern Next.js e-commerce platform featuring product browsing, cart
management, and secure checkout. Built with performance and user experience in
mind.

## 🌍 Live URLs

- **Frontend**:
  [https://swift-cart-mocha.vercel.app](https://swift-cart-mocha.vercel.app)
- **Backend API**:
  [https://swiftcart-server-silk.vercel.app](https://swiftcart-server-silk.vercel.app)

## 📂 Repository Links

- [Frontend](https://github.com/khaledssbd/SwiftCart)
- [Backend](https://github.com/khaledssbd/SwiftCart-APIs)

## 🛠️ Key Features

### Shopping Experience

- 🛍️ Product browsing with filters and search
- 🛒 Persistent shopping cart
- 💳 Secure checkout process
<!-- - ⭐ Product reviews and ratings -->
- 🔍 Advanced search functionality

### User Features

- 🔐 JWT authentication
- 📦 Order history tracking
<!-- - ❤️ Wishlists and favorites -->
- 📱 Fully responsive design

### Admin Features

- 📊 Sales analytics dashboard
- 📦 Product management
- 🚚 Order fulfillment
- 👥 User management

## 🏗️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Redux
- **Form Handling**: React Hook Form + Zod
- **Payment Integration**: SSLCommerz

### Backend

- **API**: RESTful services
- **Authentication**: JWT
- **Image Hosting**: Cloudinary
<!-- - **Real-time Updates**: WebSockets -->

## 🚀 Quick Start

## 🏃‍♂️ Setup Guide (Frontend)

### Prerequisites

- Node.js ≥18.x
- npm/yarn/pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khaledssbd/SwiftCart.git
   cd SwiftCart

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create .env file with:

   ```bash
   NEXT_PUBLIC_BASE_API="your_backend_url"

   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

## 🏃‍♂️ Setup Guide (Backend)

### Prerequisites

- Node.js ≥18.x
- npm/yarn/pnpm

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/khaledssbd/SwiftCart-APIs.git
   cd SwiftCart-APIs

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create .env file with:

   ```bash
   NODE_ENV="development"
   PORT=5000
   DB_URL="mongodb_URI"

   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET="<your_access_secret>" JWT_ACCESS_EXPIRES_IN=7d
   JWT_REFRESH_SECRET="<your_refresh_secret>" JWT_REFRESH_EXPIRES_IN=1y
   JWT_OTP_SECRET="<your_otp_secret>"
   JWT_PASS_RESET_SECRET="<your_pass_reset_secret>" JWT_PASS_RESET_EXPIRES_IN=15m

   CLOUDINARY_CLOUD_NAME="<your_cloudinary_cloud_name>"
   CLOUDINARY_API_KEY="<your_cloudinary_api_key>"
   CLOUDINARY_API_SECRET="<your_cloudinary_api_secret>"

   SENDER_EMAIL="<your_email>"
   SENDER_APP_PASS="<your_app_password>"

   STORE_NAME="teststore"
   PAYMENT_API="https://sandbox.sslcommerz.com/gwprocess/v3/api.php"
   VALIDATION_API="https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
   STORE_ID="<your_store_id>"
   STORE_PASSWORD="<your_store_password>"
   VALIDATION_URL="<your_validation_url>"
   SUCCESS_URL="<your_success_url>"
   FAILED_URL="<your_failed_url>"
   CANCEL_URL="<your_cancel_url>"
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```

## License

MIT (do whatever you want to do :smile: )
