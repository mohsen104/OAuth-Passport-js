# OAuth Login with GitHub and Google

This project implements login functionality using **GitHub** and **Google OAuth** with **Express.js** and **Passport.js**.

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mohsen104/OAuth-Passport-js
   cd OAuth-Passport-js
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** and add the following environment variables:
   ```env
   SESSION_SECRET=<your-session-secret>
   GITHUB_CLIENT_ID=<your-github-client-id>
   GITHUB_CLIENT_SECRET=<your-github-client-secret>
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

5. Open the application at [http://localhost:3000](http://localhost:3000).

## Usage

- Go to the homepage and click on the "Login with GitHub" or "Login with Google" links to log in with your respective account.
- Once logged in, you will be redirected to your profile page.
- You can log out by clicking the "Logout" link in the profile page.