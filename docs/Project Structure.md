---
layout: default
title: Project Structure
nav_order: 3
---

# Project Structure

## Main Modules
<br>
![Project Structure](/img/schema1.png)

#### MongoDB Container

The MongoDB container is used to host the database. It is a container that is not exposed to the outside world, and is only accessible from other containers or the host computer on port 27017. Data is stored in a JSON fashion (BSON to be precise). 

The database, named ``____`` contains the following collections:
- ``____``: the collection of users and their location
- ``____``: the collection of latencies fetched from twitch. This is a time series collection, which means that the data is stored in a specific format to allow for efficient queries on time series data.
- ``____``: the collection of geographical places. It helps preprocessing the data to make it easier to query.

#### Redis Container

The Redis container is used to store query results for caching. It is a container that is not exposed to the outside world, and is only accessible from other containers on port 6379 or the host computer on port 8000. Data is stored in a key-value fashion.

#### Node.js Container

The Node.js container is used to host the backend of the application. It is a container that is exposed to the outside world on port 80. It is the only container that is accessible from the outside world. It is used to serve the React application and to provide an API to the frontend and to any user willing to use it.

In the development folder, we however have two seperate folders for the backend and the frontend. The backend folder is used to provide the API for data while the frontend folder is used to develop the React application. The React application is then built and served by the backend in production mode, when you run the containers with the command `./app run -mode prod` (it is automatically set up in the ``docker-compose.prod.yml`` file).

### Development Variant
<br>
![Project Structure](/img/schema2.png)

#### Node.js Container

When running the project in development mode using the command `./app run -mode dev`, the Node.js container is only used to serve the API endpoints. The ``client`` subfolder of the backend is thus empty and the React application is served by a separate container. To access the React application, you will need to go to ``localhost:3001``. You can also access the API endpoints at ``localhost:3000`` for testing purposes.

Any time you make a change in the Node.js code, you won't need to restart the container to see the changes thanks to NodemonJS. You just have to save the file and the changes will be applied automatically.

#### React Container

The React container is used to serve the React application. As for any React project, the application is automatically reloaded when you make a change in the code (you might have to refresh the page sometimes). You can access the React application at ``localhost:3001``.

If you want to easily debug and test the React application, you can add the browser extension ``React Developer Tools`` to your browser. It will allow you to see the state of the application and to debug it.