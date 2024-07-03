# jnp2-weather-app

This application serves as a tool for displaying real-time weather forecasts. Users input a city name to receive weather updates based on their chosen forecast type. The app also evaluate weather condition (as not nice / passable / nice) based on temperature and precipitation data. Developed using Node.js along with the React and Redux libraries.

---

### How to start?

1. Install proper node version (14.21.3) - for example with [n](https://github.com/tj/n)
```
> npm cache clean --force
> npm install -g n
> n 14.21.3
```
2. Install dependencies and start app.
```
> npm install --legacy-peer-deps
> npm start
```

---

### Application preview

Warsaw - realtime          |  London - daily           |  New York - hourly
:-------------------------:|:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/73189722/132490638-b03ae95b-53a2-4895-8cd3-19c8ede9b69f.png)  |  ![](https://user-images.githubusercontent.com/73189722/132490687-21cc71a7-857a-4840-92a4-9908531721fc.png) | ![](https://user-images.githubusercontent.com/73189722/132491499-05d1d03d-8798-4ba7-8538-c9f09358363b.png)

---

App connects to the [Weather API](https://www.weatherapi.com/), using free plan.
