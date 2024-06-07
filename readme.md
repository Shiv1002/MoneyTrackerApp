# Project Overview

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)

## Introduction

The Money Tracker Webapp is a tool that allows users to keep track of their financial transactions. The app offer features to add, view, edit, and delete transactions, categorize them, and generate reports to help users understand their spending habits.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
- **npm**: npm is installed with Node.js. To verify, run `npm -v` in your terminal.
- **Git**: Make sure you have Git installed. You can download it from [Git official website](https://git-scm.com/).

## Installation

Follow these steps to get a copy of the project up and running on your local machine for development and testing purposes.

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/Shiv1002/MoneyTrackerApp.git
```

### 2. Navigate to the Project Directory

Change your directory to the project folder:

```bash
cd MoneyTrackerApp
```

### 3. Install Dependencies

Install the necessary dependencies using npm:

```bash
npm install
```

## Configuration

### Adding the `.env` File

This project uses environment variables for configuration. You need to create a `.env` file in the root directory of the project. This file should contain all necessary environment variables.

1. Create a `.env` file in the root of your project:

```bash
touch .env
```

2. Open the `.env` file in your preferred text editor and add the required environment variables. For example:

```env
# Example .env file
EXPRESS_SESSION_SECRET=add-your-secret
MONGODB_URI=mongodb://127.0.0.1:27017/
```

Make sure to replace the values with your actual configuration settings.

## Usage

To start the application, run the following command:

```bash
npm start
```

Your application should now be running on the port specified in your `.env` file. Open your browser and navigate to `http://localhost:1002` (or the port you specified) to see the application in action.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
