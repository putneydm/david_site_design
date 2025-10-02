---
title:  "Three Quick Tips to Writing Better Jira Tickets"
subhead: "Writing good Jira tickets won't make you famous, but it will make your team's job easier"
imageAlt: Screenshot of MIB Electronic Medical Records Portal
layout: blog_entry
pageType: blog_entry
project: MIB-EHR was a legacy company's entry into the fast-growing field of electronic medical records for life insurance companies. It delivered records from multiple vendors, cut weeks off delivery times and hugely reduced costs. I designed, built and delivered a simple, perfomant front end and wrote extensive documentation.
image: jira
sequence: 2  
urllink: https://cantina.co/three-quick-tips-to-writing-better-jira-tickets/
---


The word “Jira” is likely to elicit a groan from designers or developers.

This is a bit unfair to a product that sets the standard for productivity across multiple industries. In fact, it does its job rather well. Yes, yes. It’s enterprise productivity software, and we tend to hate on the tools we’re assigned. That really can’t be helped. No one is going to get the #jiraandchill hashtag trending on Instagram.

The hardware or the software is rarely the problem. It’s the wetware. Jira is often misused and poorly managed. Most commonly, tickets are badly written, incomplete or, worst case, shouldn’t even be tickets. In these cases, Jira quickly goes from help to hindrance.

Overloaded teams, corporate inertia or process entropy can result in the system breaking down. The first step is admitting there’s a problem. Look for these warning signs:

* Tickets have to be significantly rewritten during grooming sessions
* Problems that should be caught in QA slip through to staging or production
* Significant back and forth between developers and designers just to get clarity about a feature

If this sounds like a typical day at the office for you, what are the next steps? What does a good Jira ticket look like?

## Jira is not for you.

Well, if you are a designer, it isn’t.

Jira is actually pretty great at what it does. It’s just misunderstood. Designers have many tools in their set — Sketch, Figma, Photoshop, Invision, Zeplin. It’s easy to think of Jira as just another one of those tools and to judge it harshly by comparison. It can feel like wrestling a bear to the ground to get work done, sometimes.

Product teams, developers and QA are its target audience, mainly. Jira is merely the means designers use to communicate with these teams. It’s really so they can do their jobs.

One of the fundamentals of writing is to know the audience. Where Jira gets involved, thinking like a dev team member helps — mainly to really know what they are trying to accomplish.

We look at our designs as “complete” when we hand them over. Designers see a few screens, but to developers, designs are like an iceberg — 90 percent of the functionality is below the waterline. A “simple” design might mean building communication with the back end, new APIs or maybe even a new microservice.

Each group has different needs from a Jira ticket.

### Product manager and Sprint Teams

* To know which designs are complete and ready to be built
* To estimate scope and sprint velocity

### Developers

* To understand the design and its requirements
* As a guide to the developer while building it

### QA

* To confirm that the feature has been implemented correctly
* Documentation and paper trail

With this in the forefront, let’s look at the writing process itself.

## Three Tips for Better Jira Tickets

Trying to translate a visual design, user interface and the way it functions into a series of written descriptions across several tickets can sometimes feel like, as the old saying goes, “dancing about architecture.” Doing this well doesn’t take mastery of the form so much as knowing the best tricks.

The primary goal of a good Jira ticket is clear communication — something hard to define but easy to spot. I prefer to use radical consistency — formulaic almost. Tickets are heavily formatted, almost like off a factory line. Or as I like to say, if you can’t be correct, be consistent.

On a basic level, tickets typically contain:

* User story for the feature: “As a user I want to … so that …”
* Acceptance criteria
* Developer notes, if necessary
* InVision or Figma link to the feature
* Screenshots

Every team has their own requirements, but I have found that this method best captures useful information in the simplest ways.

So, let’s do this thing! Let’s consider how we might handle Jira tickets for this design.


<figure class="blog-image-insert">
    <img src="/siteart/basic_layout.png" alt="A screenshot of a page with the header Order History. It contains a filter bar with two selects, a search field and a table row with the user's initials, user's name, order number, order date, order ship date and a progress bar showing the order has shipped.">
</figure>



We have a fairly simple design for a screen. It has a label, some filters, a search box and a table to display several data points. We’re ready to deliver it. So let’s write a Jira ticket!

### Tip No. 1: Use precise language

Before I became “tech guy,” I trained in journalism. Years of editing taught me that sloppy writing has ambiguity; proper writing has none. Choose precise words with precise meanings, when possible.

When describing designs, assign exact names to features and user interface elements and stick to them. Establish these naming conventions early in the process. Use them in design reviews and whenever discussing them in other contexts. This creates a common language for the team. It eliminates ambiguity.

<figure class="blog-image-insert">
    <img src="/siteart/basic_layout_numbered.png" alt="A screenshot of a page with the header Order History. It contains a filter bar with two selects, a search field and a table row with the user's initials, user's name, order number, order date, order ship date and a progress bar showing the order has shipped.">
</figure>

How might this work on our design? It could be broken down this way:

1. Header
2. Filter Bar
3. Search Field
4. Table Header
5. Order Table
6. Table Row

Even the atomic elements that make up larger items should be precisely named.

Likewise, this precision in language extends to elements that make up the UI. Use the correct technical names: eg, radio buttons, label, H1, checkbox, select, etc.


<figure class="blog-image-insert">
    <img src="/siteart/basic_layout_filters.png" alt="A screenshot of a page with the header Order History. It contains a filter bar with two selects, a search field and a table row with the user's initials, user's name, order number, order date, order ship date and a progress bar showing the order has shipped.">
</figure>


**Bad** The Filter Bar contains two menus …

**Good&** The Filter bar contains two selects …

### Tip No. 2: Acceptance criteria should be a true/false statement.

Describing complexities of a design, or even figuring out how to approach describing them can be a struggle. The answer can be reducing them to the simplest type of sentence: true/false statements. Either an element is there or it isn’t. Something behaves in a specific manner or it doesn’t. The information is correct, or it isn’t.

Basically, your acceptance criteria is a checklist.

This structure is direct and simple. It allows for easier understanding of a feature by developers and, in particular, provides a clear guide to QA to craft test scripts.

<figure class="blog-image-insert">
    <img src="/siteart/basic_layout_row.png" alt="A row from a data table showing a user's intials, user's name, order number, order date, order ship date and a progress bar showing the order has shipped">
</figure>


Let’s take a look at how we might describe a table row in acceptance criteria:

* When an order is placed, a row is added in the table.
* The data points in the table should accurately reflect the shipping information stored in the database.
* The data in the table should update when the database information is updated.
* The row should contain:
    * The first and last initial of the user who placed the order
    * The name of the user who placed the order
    * The date the order was placed (MM, DD, YYYY format)
    * The date the order was shipped (MM, DD, YYYY format)
    * The shipping progress bar

*Is the item in the table?* Yes.

*Does it match the information in the database?* Yes.

*Does it update when the database is updated?* Yes.

OK, then then ship it!

This also informs the dev team what the back end might look like, what APIs are needed and how the feature needs to perform.

### Tip No. 3: Make your features as small as possible, and no smaller.

Breaking down features into achievable chunks is the eternal struggle of sprint teams. But as in many areas of life, simple is preferable to complicated.

My method is as much about gut feeling as anything. Basically elevator pitch rules: It needs to be explained easily and quickly. If a feature takes too many acceptance criteria to explain, that’s a red flag. If you struggle to explain a feature, that’s also a sign that the ticket is trying to do way too much. If you can’t briefly and easily explain a feature, how do you expect the developer or sprint team to understand it?

What it comes down to is: can the feature stand alone? Is it individually testable, and shippable? That doesn’t mean a team would or will ship it. It’s just a criteria for drawing a border around work to make decisions.

<figure class="blog-image-insert">
    <img src="/siteart/basic_layout_numbered.png" alt="A screenshot of a page with the header Order History. It contains a filter bar with two selects, a search field and a table row with the user's initials, user's name, order number, order date, order ship date and a progress bar showing the order has shipped.">
</figure>

Looking again at our design for the Order History feature, it could break down into several front-end tickets.

* Order Table and Table Header
* Table row
* Order Progress Meter
* Filter by Order Date
* Filter by Order Status
* Search Field
* Table Header

At first, this might seem like overkill to pull out the progress meter and to break apart the filters. But the progress meter meets the definition of a shippable, testable feature.

Secondly, recall the principle that 90 percent of front-end work is below the waterline. I’m primarily a designer, so I find myself thinking “this looks easy” only to see a feature spawn multiple development subtasks with database and API work. For example, this progress meter requires pulling in shipping company APIs, storing this information and then presenting it on the front end. So start small.

Additionally, the user story is far simpler — *as a user I want to track the progress of my delivery* — and includes a succinct list of acceptance criteria.

In terms of sprint planning, the product owner and scrum master have more choices over what to put into the sprint backlog and how to prioritize it. And on the other end, QA testing will be much easier.

All of this adds up to sprint velocity — the bane of every sprint team. Smaller, testable features turned out at a constant rate result in burndown charts to warm the heart of any product owner.

### Top Tip Lightning Round

Before we close, here are a few other Jira top tips:

* Keep your tickets clean and simple. Leave complex documentation of functions and UI states where it belongs: Confluence. Doing this also provides a single source of truth across several tickets.
* Jira like a mofo pro with a dual monitor setup by turning one monitor to portrait mode. The entire ticket is visible with no scrolling.
* Draft your tickets in a separate document, such as Word. For one, it’s a better writing and formatting tool. Additionally, a large part of the process is about figuring out how to break a feature into separate tickets. Reordering, reworking and re-editing is far simpler here. When you are set, copy and paste the text into Jira.

Probably “being great at Jira” isn’t up there on the list of most people’s life goals. But being a “rock star pirate captain ninja” at Jira really can make doing your job — and a lot of other people’s jobs — easier.

You may even find you ♥ Jira. Maybe.
