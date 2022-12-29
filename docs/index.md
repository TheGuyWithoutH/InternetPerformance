---
layout: default
title: Home
nav_order: 1
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

# **Internet Performance**

## **What is Internet Performance Project?**
The project consist of a study of the performance of the Internet from the perspective of a user application. Twich API stream data are fetched and analyzed to determine the latency of a particular user, whose location is then determined using its twitter account. The data are anonymized and put in a database for further study.

Our goal is to make this data available to the public, so that the community can use it to study the performance of the Internet. There are two ways to interact with the dataset:
- a web interface to query the database and visualize the results
- a REST API to query the database and download the results

## What about this documentation?

This documentation is meant to help you understand the project, how to use the web interface and the REST API in order to continue developping the front-end of the project. You will find an explanation of the project structure, a guide of the REST API interface and a style guide to understand the existing mockup and conventions.

Let's get started! First go to [Installation](Installation.md) to install and run the project.


<blockquote class="important"><p>
In some sections of this documentation, to indicate what is in progress or not started yet, you will find TO DO callouts like this one:
<blockquote class="highlight-title">
<p>TO DO</p>
<ul>
    <li>Task 1</li>
    <li>Task 2</li>
</ul></blockquote>
You will have to implement these tasks to complete the project (and more depending on what you were assigned to do).
</p></blockquote>


<br>
<br>

Contributors : [Ugo Balducci](mailto:ugo.balducci@epfl.ch),

Under the supervision of [Catalina Alvarez Inostroza](mailto:catalina.alvarezinostroza@epfl.ch).