This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Packages used
`moment` - For managing dates <br />
`styled components` - For creating re-usable style elements <br />
`ky` - A better alternative to `axios`. Honestly, there was no need of using this, I could have just used fetch. But have been looking forward to use this package for a long time, so decided to just give this a shot.

### Tests
Currently I've written one test for the main function that returns the mutual fund results based on the data, horizon and investment period. I've included a `testData.js` file that has the API response and the corresponding. <br />
Other ways to add tests : <br />
1. We can add component level snapshot tests. In the MutualFundHome component, we can separate out the JSX each InputContainer, turn it into a component, and see if it's being rendered based on the current step value.<br />
2. Add more tests to the function that returns nav results. Check the type of parameters it receives, and check that they should be integers.
3. Add proptypes to the components.

### About the API response
It's important to note that the API only has records for working days in India. Which means, if the date is either a holiday listed [here](https://economictimes.indiatimes.com/markets/stocks/stock-market-holiday-calendar) or is a weekend, we don't get that record in the API.
It's easy to only consider the weekdays, but since this API doesn't have records for Holidays, it becomes difficult to write the most efficient code to calculate the nav results.
If I somehow had the list of holidays for every year, I would have written the code such that, I will ignore the weekends + holidays and then calculate the nav value, without having to loop through the list.
