# My React Login App

This project is a simple React application that implements a login system with an OTP verification step. 

## Features

- Login page with pre-filled account number and password fields.
- OTP verification page that checks the entered OTP.
- Basic validation for login credentials and OTP.

## Project Structure

```
bank
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components
│   │   ├── LoginPage.tsx   # Login page component
│   │   └── OTPPage.tsx     # OTP verification component
│   ├── App.tsx             # Main application component
│   ├── index.tsx           # Entry point of the React application
│   └── types
│       └── index.ts        # TypeScript types and interfaces
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd bank
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000`.
- Enter the account number `1234567890` and password `12345` to proceed to the OTP verification page.
- Enter the OTP `1234` to log in successfully. Any other input will indicate an unsuccessful login.

## License

This project is licensed under the MIT License.