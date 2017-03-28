# Upstarter

<p align="center">
<img src="imgs/Upstarter.png" alt="Upstarter"/>
</p>

Upstarter gives job hunters investor-grade insight into the heated startup market, straight from a convenient hybrid mobile app.

Drawing on over 90,000 startups, Upstarter rank orders top companies by a "Momentum Score". Factoring in fundraising history, expenditures and employee count, the Momentum Score is a startup's percentile ranking compared to similar companies.

## How it works

Upon opening Upstarter, you can connect your LinkedIn account to view your connections to startups you lookup.

<p align="center">
<img src="imgs/splash.png" alt="Upstarter splash"/>
</p>

After loading the search page, you will see the top 10 hottest startups, ordered by their Momentum Score percentile.

<p align="center">
<img src="imgs/start.png" alt="Upstarter start"/>
</p>

You can search for individual startups from the top searchbar or filter by employee size and distance:

<p align="center">
<img src="imgs/search.png" alt="Upstarter search"/>
</p>

Upon finding a startup you are interested in, simply tap it to view more details:

<p align="center">
<img src="imgs/item.png" alt="Upstarter item"/>
</p>

If you have linked your LinkedIn account, you will also see your connections within that company:

<p align="center">
<img src="imgs/connections.png" alt="Upstarter connections"/>
</p>

Product demo is available on [Heroku here](https://upstarter-client.herokuapp.com) (but not actively maintained, no guarantees!)

## Technologies
  * **Node + Express.js**: Backend framework
  * **MongoDB + Mongoose**: Database and ORM
  * **Geospatial Mongo queries and geolocation**: Developed for radius search
  * **Crunchbase API**: API for information on startups
  * **Background jobs**: Several node background job files manage API calls made to Crunchbase, Momentum Score calculations, and other data tasks
  * **AngularJS**: Front-end framework
  * **Ionic**: Hybrid mobile framework
  * **Heroku**: Deployment
  * **Mocha**: Backend testing
  * **Nock**: API mocks
  * **LinkedIn oAuth**: For connections data
  * **JWT/Passport**: oAuth helpers
  * **Istanbul**: Backend test coverage
  * **Local storage**: For optimizing frontend experience
