# Swellmatch WEB

## Framework

- NEXT.js v14.2.3
- Node.js v18

## Installation Steps

1. Install NVM (Node Version Manager):
This script will clone the NVM repository from GitHub to your home directory (`~/.nvm`) and add the necessary configuration to your shell profile file (like `~/.bashrc`, `~/.bash_profile`, or `~/.zshrc`).

```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2. Source your shell profile:
```bash
source ~/.bashrc
```
3. Install Node.js version 18 using NVM:
```bash
nvm install 18
nvm use 18
```
5. Install project dependencies using npm:
```bash
npm install
```
6. Adjust base URL API in `next.config.js` at the root of the project folder.

## Building and Running the Project

1. Build the project:
```bash
npm run build
```
2. Start the development server:
```bash
npm run start
```
## Accessing the hosted Web Application

Visit [Swellmatch WEB](https://catelix.com/booking) to access the web application.

## Notes

- Make sure NVM and Node.js are installed on your system.
- This web application is built using NEXT.js framework. Refer to NEXT.js documentation for more information on development and deployment.
