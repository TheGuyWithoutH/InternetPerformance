---
layout: default
title: Installation
nav_order: 2
---

<style>
    blockquote {
        margin: 10px 0;
        margin-block-start: 0;
        margin-inline-start: 0;
        padding-left: 15px;
        border-left: 3px solid #eeebee;
        display: block;
        margin-block-end: 1em;
        margin-inline-end: 40px;
    }
    
    
    p.warning, blockquote.warning {
        background: rgba(247, 126, 126, 0.2);
        border-left: 4px solid #dd2e2e;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    blockquote.warning, blockquote.important, blockquote.note-title {
        margin-left: 0;
        margin-right: 0;
    }

    p.note, blockquote.note {
        background: rgba(114, 83, 237, 0.2);
        border-left: 4px solid #381885;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.highlight, blockquote.highlight {
        background: rgba(255, 235, 130, 0.2);
        border-left: 4px solid #e7af06;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.important, blockquote.important {
        background: rgba(44, 132, 250, 0.2);
        border-left: 4px solid #183385;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.note-title, blockquote.note-title {
        background: rgba(114, 83, 237, 0.2);
        border-left: 4px solid #381885;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.note-title > p:first-child, blockquote.note-title > p:first-child {
        margin-top: 0;
        margin-bottom: 0;
        color: #381885;
        display: block;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.75em;
        padding-bottom: 0.125rem;
    }
</style>




# Installation

To be able to run the code of the project, you will need to install the following dependencies:

## Dependencies

### Docker and Docker Desktop

<img src="https://www.docker.com/wp-content/uploads/2022/03/horizontal-logo-monochromatic-white.png"
     alt="Docker Logo"
     style="display: block; max-height:230px; height: auto; width: auto; margin: auto" /> 
{: .flex-justify-between}

Docker is a containerization platform that allows you to run applications in a sandboxed environment. It enables you to quickly set up the project without having to install all the dependencies on your machine. You can find the installation instructions for Docker [here](https://docs.docker.com/get-docker/).


<blockquote class="important"><p>If you are using Windows, you will need to enable the Windows Subsystem Linux 2 backend. You can find the instructions <a href="https://docs.docker.com/docker-for-windows/wsl/">here</a>. WSL will be useful for another step of the installation process.</p></blockquote>

I also recommand you to install Docker Desktop, which is a graphical interface for Docker. It will help you understand which containers are running, interract with them, see the images in use and the volumes created (if you did not understand anything, do not worry, a quick guide is in the page [project structure](./Project%20Structure.md)). You can find the installation instructions [here](https://docs.docker.com/desktop/).

### MongoDB and MongoDB Compass

<img src="https://www.mongodb.com/assets/images/global/leaf.png"
     alt="MongoDB Logo"
     style="display: block; max-height:230px; height: auto; width: auto; margin: auto" /> 
{: .flex-justify-between}

MongoDB is a NoSQL database that we use to store the data in a JSON fashion. I you want to install it, you can go [here](https://docs.mongodb.com/manual/installation/). However, thanks to Docker, you do not need to install MongoDB on your own machine. It is already included in one of the containers that you will run, and will be loaded automatically. 

<p class="note">If you need to look for some documentation online, note that the version of MongoDB that we use is 6.0.0.</p>

If you want to have a graphical interface to look at the data stored in the database, you can install MongoDB Compass. You can find the installation instructions [here](https://docs.mongodb.com/compass/master/install/).

### Git

<img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"
     alt="Git Logo"
     style="display: block; max-height:230px; height: auto; width: auto; margin: auto" /> 
{: .flex-justify-between}

Git is a version control system that we use to manage the code of the project. If you still haven't used it yet, you can find the installation instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

I also recommend using VSCode Version Control or IntelliJ Github integration to manage your changes. Sign In using your Github account and you will be able to commit and push your changes.

## Setting up the project

### Cloning the repository

First, you will need to clone the repository. You can do it by running the following command in your terminal:

```bash
git clone git@github.com:TheGuyWithoutH/InternetPerformance.git InternetPerformance
```

<p class="note">
    Do not forget to set up your SSH keys if you have not done it yet. You can find the instructions <a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh">here</a>.
</p>

### Preparing folder for database persistence

The database is stored in a volume, which means that it is not deleted when you stop the container. There is therefore in the repository a folder called `mongodb/data` that will be used to store the data of the database. You will however need to change the permissions of this folder so that mongodb's container can write on it.

Indeed, when sharing a volume of your 'host' machine with a container, the container will run as a mongodb user (999:999). This means that the container will not have the permissions to write on the folder that was cloned with your user permissions.

To fix this, you will need to run the following command in your terminal:

#### Linux

```bash
sudo chown -R 999:999 mongodb/data
```

#### Windows

Open WSL and find the repository folder in `/mnt/c/Users/your_username/...` (`mnt/c` represents your `C://` drive). Then run the following command:

```bash
sudo chown -R 999:999 mongodb/data
```

## Running the containers

Now that you have cloned the repository, installed the dependencies and set up the folder for the database, you can run the containers. To do so, you will need to open a terminal in the repository folder and run the following command:

```bash
./app run -mode dev
```

It will launch the project in development mode, where we execute the ReactJS application on a separate container for debugging purpose. You can also run it in production mode by replacing `-mode dev` by `-mode prod`. In this case, the ReactJS application will be built, placed and served by the NodeJS application.

<p class="highlight">
It is possible that the first time you run the project, the NodeJS backend will fail to connect to MongoDB. The latter is creating the database and the collections in your volume, it can take a few seconds. If so, you only need to CTRL+S a file of the NodeJS application to reload the server.
</p>

<blockquote class="note-title"><p>Nodemon Server</p><p>The NodeJS application is using Nodemon to automatically reload the server when a file is modified. This is why you only need to CTRL+S a file to reload the server running in the container.</p></blockquote>

### Commands

The `app` script is a bash/batch script that you can find in the repository folder. It is used to run the containers and execute commands in them. You can run it with the following commands:

- `./app run -mode [dev|prod]` to run the project
- `./app stop` to stop the containers
- `./app clean` to clean the containers and the volumes