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
    <li>Find a way to display the country shape or an equivalent.</li>
</ul></blockquote>

### Search Data

In order to retrieve the desired data and generate his diagrams, a user has to go through the following 4 steps:

#### 1. Choose location


The first step to retrieve data is to **choose the location**. The user can select a country, a region and a city. The selection is done by clicking on the corresponding input that already contains possible choices (i.e. there only are regions of the selected country in the field *region*). 

The user can also search for a specific location by clicking on the map. A pin will then be displayed, as well as a round area whose default radius of 1km can be changed by dragging and dropping the perimeter of the area. 

The map is interactive and allows the user to zoom in and out (currently, the map used is `@react-google-maps/api`). Once the location is selected, the user can press `Add this location` and the desired location will be added to the list of locations at the bottom. The user can then add up to 3 locations. Once he is done, he can press the `Next` button to go to the next step.

<br>
<img src="./img/Choose Location Search.svg"
     alt="Search Design : Choose location"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

<br>

<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>Implement the area features when clicking on the google map, and get the position and radius.</li>
    <li>Link countries, regions and cities information to the backend.</li>
    <li>Implement add location feature when the user click on the corresponding button.</li>
</ul></blockquote>

#### 2. Choose time


The second step is to **choose the time**. The user can select a time range by clicking on the corresponding input to fill out the starting date and time of the range and its ending. The default time range is `all`, from timestamp 0 to the actual time. The user can also select a specific time range by dragging and dropping the slider at the bottom of the screen. The latter allows the user to visually adjust the time frame he wants, given the indications of user counts/data points provided for each location at a given time. Once he is done, he can press the `Next` button to go to the next step.

<br>
<img src="./img/Choose Time Search.svg"
     alt="Search Design : Choose time"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

<br>

<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>Make histograms for each location the user selected.</li>
    <li>Link histograms to backend.</li>
    <li>Find a way to implement the slider - my proposal would be to slide the left corner left to make the start date go down and right to make it go up (same for the right corner and end date) -.</li>
    <li>Find a way to properly subdivide time slots for the histograms to have no more than 40 bars and not less than 25 bars (the minimum granularity for our time is 15s, so block the slider when reaching this limit).</li>
</ul></blockquote>

#### 3. Table view


In this tab, the user will be able to see a table of the data he selected. The table is interactive and allows the user to sort the data by clicking on the column he wants to sort. The user can also select/unselect a specific data point by clicking on its tick box. This feature aims to give a first sight to the selected data and let the user focus on a particular subset of it like an interesting user, or a stream, or only scattered chosen data points. Once he is done, he can press the `Next` button to go to the next step.

<br>
<img src="./img/Data Table Search.svg"
     alt="Search Design : Data table"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

<br>

<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>Link table to the backend, with a page mechanism to display part of the results at once.</li>
    <li>Make an unselect all feature.</li>
    <li>Make a sorting per column value feature.</li>
</ul></blockquote>

#### 4. Choose diagram


For this last step, the user can choose the diagram he wants amongst the proposed ones. The user can select a diagram by clicking on the corresponding box that already contains displays a preview. This will automatically download it in a picture format (*still to define*). If one wants to get raw JSON data, there also is a possibility to download them.

<br>
<img src="./img/Choose Diagram Search.svg"
     alt="Search Design : Choose diagram"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

<br>

<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>Determine which diagram to propose.</li>
    <li>Determine the download file format for diagrams.</li>
    <li>Implement diagram creation and download from JSObject data.</li>
</ul></blockquote>

### Papers


The papers screen is a page that will display the papers that are related to the study. The papers will be displayed in a list, with a preview of the abstract and a link to the full paper.

<br>
<img src="./img/Papers.svg"
     alt="Papers Design"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

<br>

<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>If any paper to display, add it to the page using the <code>Components/Papers/PaperCard.js</code> component.</li>
</ul></blockquote>

### About


The about page will display information about the study, the team, the project, and legal mentions. It will also display the contact information of the team. The exact details are however still to be defined.

<br>
<img src="./img/Papers.svg"
     alt="About Design"
     style="display: block; height: auto; width: auto; margin: auto; max-width: 80%; box-shadow: 3px 3px 11px 0px rgb(0 0 0 / 25%); border-radius: 10px;" /> 
{: .flex-justify-between}

<br>

<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>Define all needed information.</li>
    <li>Fill in the given page template.</li>
</ul></blockquote>

## Style Guide

### Reusable Components

ReactJS philosophy is to create **reusable components**. This is why we have created a set of reusable components that can be used in any page of the website. These components are located in the `Components` folder. The components are:
- a ``DynamicButton`` that helps to create buttons that can be used in any page of the website. It is located in the `Components/DynamicButton.js` file.
- a ``Header`` that helps to create a header that can be used in any page of the website. It is located in the `Components/Header.js` file.
- a ``Logo`` that helps to create a logo that can be used in any page of the website (but already imported in ``Header`` so no need to add it again). It is located in the `Components/Logo.js` file.
- a ``Redirect`` component that helps to create a page that redirects to another page of the website. It is located in the `Components/Redirect.js` file.

This set of global components can be extended. Whenever you add a new feature, do not hesitate to decompose your UI into semantic modules and create reusable components for them, it will help people understand your code. If the feature you implement is more related to a specific page, please put your component in the corresponding `Components` subfolder of the page you are working on :
- ``Components/Home`` for the home page
- ``Components/Data`` for the overview page
- ``Components/Search`` for the search page
- ``Components/Papers`` for the papers page
- ``Components/About`` for the about page

### Main CSS Rules

#### Naming convention

We use a variant of the BEM naming convention for our CSS classes. It is a naming convention that helps to avoid conflicts between CSS classes and to make the code more readable. It is based on the following rule: the name is a combination of the name of the page and the name of the semantic unit and subunits along with modifier properties, all separated by a hyphen. 

For example, the name of the class of the delete button of an entry in the selected location subdivision table of the search page is ``search-location-results-table-entry-delete``. It is composed of the name of the page ``search``, the name of the semantic unit ``location-results-table``, the name of the subunits ``entry-button``.<br>Another example is the name of the class of an empty entry in the selected location subdivision table of the search page. It is ``search-location-results-table-empty``. It is composed of the name of the page ``search``, the name of the semantic unit ``location-results-table``, and the modifier property ``empty``.

<p class="note">
    This convention is not mandatory, but it is highly recommended to use it to avoid conflicts between CSS classes and to make the code more readable. But as this convention was used on the go, it is not always fully consistent or greatly implemented. Feel free to improve it.
</p>

#### CSS styles

The main guidelines for the CSS styles are:

- Colors : the color theme is defined in ``index.css``. You can access them from any css file using the ``var()`` function. For example, to access the main action color, you can use ``var(--main-action-color)``. The colors are:
    - The ``--main-action-color`` is the main call to action color of the website. It is used for the main action buttons, the main action links, and the main action icons... It also helps highlight some content.
    - The ``--secondary-action-color`` is the secondary call to action color of the website. It is used for the secondary action buttons, the secondary action links, and the secondary action icons... It also helps highlight some content.
    - The ``--main-text-color`` is the main text color of the website. It is used for the main text of the website.
    - The ``--main-dark-color`` is another shade of the action color that can be useful for contrast matters.
    - The ``--main-grey-bg`` is the color for soft backgrounds like inputs and small items.
    - The ``--secondary-grey-bg`` is the color for strong division background like a inputs container on the left side.

- Fonts : the font is defined in ``index.css`` with the variable ``--main-font``. It is already applied to the entire website.

- Positionning : the positionning is done using the flexbox model. It might however need to be improved in case a better responsive design is needed.

- Border radius : the border radius is frequently used in the website (rounded corner). Its value is generally comprised between 10px and 20px depending on the size of the component. I recommend any division of the page to have a border radius.

- Shadows : the shadows are used to give a 3D effect to the components and/or detach them from the background like in the case of a pop-up. It is generally used for huge components in the page that need to be detached from the white background. The value of the shadow is ``0px 4px 17px 2px rgba(0, 0, 0, 0.25)``.

&rarr; For more details on the CSS styles, please refer to the Figma mockup by clicking on the ``Inspect`` tab at the top right corner for more information on the selected component.


