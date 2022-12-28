---
layout: default
title: Application User Interface
nav_order: 5
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

    p.highlight-title, blockquote.highlight-title {
        background: rgba(255, 235, 130, 0.2);
        border-left: 4px solid #e7af06;
        border-radius: 4px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 3px 10px rgba(0, 0, 0, 0.08);
        padding: 0.8rem;
    }

    p.highlight-title > p:first-child, blockquote.highlight-title > p:first-child {
        margin-top: 0;
        margin-bottom: 0;
        color: #e7af06;
        display: block;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.75em;
        padding-bottom: 0.125rem;
    }
</style>

# Application UI Design

In order to have a clear idea of the frontend app design, here are the main features with explanation details and designs, as well as a style guide to properly use CSS rules.

For detailed guidelines about the graphical design of the web app, you can find [here](https://www.figma.com/file/dw9atzxHUTL7LCi7pvZbfk/Internet-Performance?node-id=0%3A1&t=FHvAOG1furo4LWgo-1) the Figma mock up of the app. In case you want to modify it, you can contact [Ugo Balduci](mailto:ugo.balducci@epfl.ch) to get access to the Figma project.

## Overview

Apart from the home screen, the app is divided into 4 main sections :

- **Overview** : an overview of the performance recorded per country.
- **Search Data** : a screen to select data from the dataset and generate diagrams.
- **Papers** : a list of the papers from the study.
- **About** : the screen where the user can find information about the app and the legal information.

## Page Design

### Home Screen

<br>
<img src="./img/Home.svg"
     alt="Home Design"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}
<br>

The content of the **home screen** is not defined yet, as well as its precise purpose. As of now, the main idea behind this screen is to explain the project and show the contributors.

<blockquote class="highlight-title">
<p>TO DO</p>
<p>
<ul>
    <li>Define the content of the home screen and its purpose.</li>
    <li>Implement Home screen components in <code>Components/Home/</code> or directly in <code>Pages/Home.js</code>.</li>
</ul>
</p></blockquote>


### Overview Screen
<br>
<img src="./img/WorldOverview.svg"
     alt="Overview Design"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}
<br>

The overview screen is a first glance at datapoints in the dataset. It helps understanding the distribution of the data and the main trends of latency performance for each country. Indeed, the user can select a country and see the distribution of the latency performance over the last year, as well as some information about the country to contextualize data. Here is an example of the overview pop-up for Switzerland :

<br>
<img src="./img/CountryOverview.svg"
     alt="Overview Design"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

<br>

<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>Define which diagrams to display and add them to the component <code>Components/Data/CountryModal.js</code>.</li>
    <li>Link country information to the backend.</li>
    <li>Find a way to dysplay the country shape or an equivalent.</li>
</ul></blockquote>

### Search Data

In order to retrieve the desired data and generate his diagrams, a user has to go through the following 4 steps:

#### 1. Choose location
<br>
The first step to retrieve data is to **choose the location**. The user can select a country, a region and a city. The selection is done by clicking on the corresponding input that already contains possible choices (i.e. there only are regions of the selected country in the field *region*). 

The user can also search for a specific location by clicking on the map. A pin will then be displayed, as well as a round area whose default radius of 1km can be changed by dragging and dropping the perimeter of the area. 

The map is interactive and allows the user to zoom in and out (currently, the map used is `@react-google-maps/api`). Once the location is selected, the user can press `Add this location` and the desired location will be added to the list of locations at the bottom. The user can then add up to 3 locations. Once he is done, he can press the `Next` button to go to the next step.

<br>
<img src="./img/Choose Location Search.svg"
     alt="Search Design : Choose location"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}


#### 2. Choose time
<br>
<img src="./img/Choose Time Search.svg"
     alt="Search Design : Choose time"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}
<br>

#### 3. Table view
<img src="./img/Data Table Search.svg"
     alt="Search Design : Data table"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}
<br>

#### 4. Choose diagram
<img src="./img/Choose Diagram Search.svg"
     alt="Search Design : Choose diagram"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

### Papers
<br>
<img src="./img/Papers.svg"
     alt="Papers Design"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

### About
<br>
<img src="./img/Papers.svg"
     alt="About Design"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}


## Style Guide

### Reusable Components

### Main CSS Rules