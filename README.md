# Shyftplan Events

This project fetches events from the Shyftplan api and displays them in a list view, as well as detail view when clicking on a list item.

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start the app

### Install packages

From the project directory, run `npm install` to install the application dependencies.

### Add credentials

In the project root directory, create a `.env` file with the following content:
```
REACT_APP_SHYFTPLAN_LOGIN=<login>
REACT_APP_SHYFTPLAN_PASSWORD=<password>
```

Replace the `<login>` and `<password>` with the respective credentials.

### Run the app
    
Run `npm start` to start the development server.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Outlook

As a future outlook, I would like to make the following additions:
- provide tests for every component
- additional filtering options (eg. event name, employee)
- return to previous list page from detail view
