NUIG Comp Soc Website 2014
=====
____

Overview
------
A revision of our website is long overdue. With the setup of our new server this seems like the best time to spin up a new website and connect it to our backend and social media.

The plan is to create a __Node.js__ server, serving a __Angular.js__ Single Page Application and connecting to all our Social Media Accounts to reproduce posts across all of these outlets. Posts will be created in Markdown and pulled in via __Github__ Webhooks. This sums up the bulk of the website, though more features should be added as time permits.


[Read more...]()
____
Design
----
This website should both show off our amazing society, events and resources as well as our awesome coding abilities and employability. Backwards compatibility is optional, though smooth degradation is preferred. Home rolled CSS styles should be used over frameworks (eg. Bootstrap), but smaller plugins are welcome.

The layout will be split into these areas:

*   Home & Event Feed
*   Wiki & KnowledgeBase
*   User Pages & HLMs
*   Blog & News

[Read more...]()
____
Running & Developing
----

During Development the page will be running on an OpenShift Server.
You will need to install the Node Package Manager `npm`(via package manager in Linux or from their website for windows)

    1. Clone this repository
    2. Open a terminal/command prompt and navigate to the repository
    3. Run npm install
    4. Run node server.js
    5. Open browser pointing at `http://localhost:3000`
    
    
For editors I would advise either [Sublime Text](http://www.sublimetext.com/) or [Brackets](http://brackets.io/)

____
