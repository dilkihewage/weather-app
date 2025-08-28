
# Weather App

A React weather dashboard app built with Vite, Auth0 authentication, and React Router.

## Features
- User authentication with Auth0
- Weather dashboard and splash screen
- Responsive UI

## Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Auth0 account (for authentication)

## Setup Instructions

1. **Clone the repository**
	```powershell
	git clone <your-repo-url>
	cd weather-app
	```

2. **Install dependencies**
	```powershell
	npm install
	```

3. **Configure Auth0**
	- Create a `.env` file in the project root with the following variables:
	  ```env
	  VITE_AUTH0_DOMAIN=your-auth0-domain
	  VITE_AUTH0_CLIENT_ID=your-auth0-client-id
	  ```
	- Replace `your-auth0-domain` and `your-auth0-client-id` with your Auth0 app credentials.

4. **Start the development server**
	```powershell
	npm run dev
	```
	The app will be available at [http://localhost:5173](http://localhost:5173).

5. **Build for production**
	```powershell
	npm run build
	```

6. **Preview the production build**
	```powershell
	npm run preview
	```

## Scripts
- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

## License
MIT
