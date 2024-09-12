# The NoSQL Toolbox 2.0

## Overview

This project is an interactive decision tree platform originally developed as part of a bachelor's thesis. Its primary purpose was to assist users in selecting the most suitable database for their specific needs. However, due to its modular and flexible architecture, the platform can be easily adapted to create decision trees for various other domains. This README will guide you through understanding the codebase, how to set it up, and how to customize it for your own decision-making scenarios.

## Features

* Modular Design: The platform is built with a highly modular architecture, allowing you to easily swap out or modify components to suit different decision-making contexts.
* Interactive Interface: Users are guided through a series of questions, with the tree dynamically adapting based on their responses to recommend the best option.
* Open Source: The project is open source, encouraging collaboration and the development of new features or entirely new decision trees.

## Getting Started

### Prerequisites

Before setting up the project, ensure you have the following installed:

* Node.js (v14 or higher)
* npm

### Installation

1. Clone the repository:
   `git clone https://github.com/kjell5317/nosql-toolbox2`
2. Install dependencies:
   `npm install`
3. Run the developement server:
   `npm run dev`

### Configuration

In `src/tree.json` you can configure the site.

#### Title and description

`title` and `description` are required.

```json
{
  "title": "Is used as the headline on the index page and is shown as the HTML title",
  "description": "Is displayed at the index page for intruduction"
}
```

#### Tree

Each node of the tree can have the following properties:

* `name` (string): The name/question. Is only required for the root node.
* `answer` (string): The answer shown in the button of it's parent. Because it's schown in the parent, the root can't have this property.
* `info` (string): This shown when the "More Info"-button is pressed or as a description in the leafs. HTML elements are rendered.
* oneOf:
   * `children` (array of nodes): This array represents the next questions. The site is only tested with binary trees, so more than two childs could lead to unexpected behavior although it should technically be possible.
   * `end` (array of objects): These objects contain the name of a result, more info and an optional link to it's documentation.

You could also take a look at the `src/schema.json` and [json-schema](https://json-schema.org/docs).

### Deployment

The application is using [Astro](https://astro.build) without SSR so you could deploy almost anywhere and especially GitHub Pages.
Follow this [Astro Guide](https://docs.astro.build/en/guides/deploy/).
