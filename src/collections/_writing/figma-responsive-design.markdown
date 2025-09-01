---
title:  "How to build a responsive design system in Figma"
subhead: "Writing good Jira tickets won't make you famous, but it will make your team's job easier"
imageAlt: Screenshot of MIB Electronic Medical Records Portal
layout: blog_entry
pageType: blog_entry
project: MIB-EHR was a legacy company's entry into the fast-growing field of electronic medical records for life insurance companies. It delivered records from multiple vendors, cut weeks off delivery times and hugely reduced costs. I designed, built and delivered a simple, perfomant front end and wrote extensive documentation.
image: jira
sequence: 1  
urllink: https://cantina.co/three-quick-tips-to-writing-better-jira-tickets/
---


What 

Layouts must be built using auto layout. In general, components should be fill width and hug height.


A responsive design system in Figma is build up using multiple :

* A set of breakpoints
* A flexible grid layout system
* Responsive spacing system
* Responsive typography
* Component swap system


## Breakpoints

Let's start with a quick tutorial of how breakpoints work in code. We will be mirroring this basic fuctionality in our Figma system, and the goal is to have a one-to-one match between both.

Code uses media queries. These do a simple check to see if certain conditions are true or false. Let's us the eample of some body type.

```.body-type {
    font-size:16px;
}
@media screen and (max-width:940rem) {
        .body-type {
            font-size:14px;
        }
    }
```

First step, we set up our body type with a default size of `16px`.

This media query checks if the content is showing on a screen (as opposed to say, a printout) and if that screen has a viewport width of `940rem`. If one of these is not true, the styles in the media query will not be applied and type will be the default size of `16px`. If both of these conditions are true, styles inside the brackets will be applied and type will displayed at `14px`. 

This is greatly simplified, but the principle applies that at a certain viewport size range, specific styles are applied to the page and other are ignored.

We will model the behavior of media queries in a Figma using variables and modes. Modes will serve the same purpose as our media queries and breakpoints, ie when a specific mode is active, a set of values will be used. This will allow us to assign exact values to spacing, page width, sizing, max and min widths -- really anything that a media query can affect.

The first step is to determine the viewport widths that will trigger content reflow and resizing. These will be our breakpoints. 

These will vary from use case to use case. In an ideal world a breakpoint is "when the content breaks" At scale, that doesn't work. We went with four:

* Base -- XXX px - XXX px Large desktop size to small desktop.
* Medium -- Small desktop to roughly iPad landscape
* Small -- roughly iPad landscape - roughly iPad portrait
* Narrow -- roughly iPad portrait to small phone

These avoid targeting *exact* device sizes. They cover narrowest to widest viewport possibilities -- the entire continuum of sizes across any possible device or browser window width.

This is to allow designers to exactly model real-world responsive behavior. Designers can get caught in the pitfall of creating targeted views such as "Desktop view," an "iPad view" and a "phone view." These don't solve the problem of the "in betweens" -- what happens halfway between these two widths and what is really needed to transform one view into another. 

The next step is to open the XXXXX and create a mode for each of these breakpoints. If you don't know about Figma modes, you can [read about them here]() You can name your modes whatever works for you. As we go forward, we will add variables in each of these modes. Like our media queries, the values in each mode will be applied when a page is set to that mode -- effectively applying different styles based on the "breakpoint" that the page set at. 

The first values that we will add will be the `page-max-width` and `page-min-width`. These will be the min and max ranges of a particular breakpoint. 

In our use case, 

| Breakpoint | Min-width | Max-width |
| --- | --- | --- |
| Base | 1600px | 1100px | 
| Medium | xx | xx | 
| Small | xx | xx | 
| Narrow | xx | xx | 


Finally, we set up a page template component and the set the max-width of the frame to `page-max-width` and the min-width to `page-min-width`. You should be able to drag the frame between its min- and max-widths, switch modes and drag it between the min- and max-widths for that breakpoint.  
