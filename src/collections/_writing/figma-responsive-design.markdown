---
title:  "How to build a responsive design system in Figma"
subhead: "Writing good Jira tickets won't make you famous, but it will make your team's job easier"
imageAlt: Screenshot of MIB Electronic Medical Records Portal
layout: blog_entry
pageType: blog_entry
project: MIB-EHR was a legacy company's entry into the fast-growing field of electronic medical records for life insurance companies. It delivered records from multiple vendors, cut weeks off delivery times and hugely reduced costs. I designed, built and delivered a simple, perfomant front end and wrote extensive documentation.
image: unsplash
sequence: 1  
---

What 

Layouts must be built using auto layout. In general, components should be fill width and hug height.

This abstracts away responsive design -- it gets you 80 percent there with no effort at all. It just works.

uses auto layouts and variable modes. 


A responsive design system in Figma is build up using multiple :

* A set of breakpoints
* A flexible grid layout system
* Responsive spacing system
* Responsive typography
* Component swap system

## Breakpoints

**Let's start with** a quick tutorial of how breakpoints work in code. We will be mirroring this basic fuctionality in our Figma system, and the goal is to have a one-to-one match between both.

Code uses media queries. These do a simple check to see if certain conditions are true or false. Let's us the eample of some body type.

```css
.body-type {
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

These will vary from use case to use case. In an ideal world a breakpoint is "when the content breaks" At design system scale, that doesn't work all that well. We went with four:

| Breakpoint | Min-width | Max-width | Device Range |
| --- | --- | --- | --- |
| Base | 1081px | 2300px | Large desktop - Small desktop |
| Medium | 851px | 1080px | Small desktop - Tablet landscape | 
| Small | 850px | 601px | Tablet landscape - Tablet portrait |
| Narrow | 600px | 450px | Tablet portrait - Small phone |

These avoid targeting *exact* device sizes. They cover narrowest to widest viewport possibilities -- the entire continuum of sizes across any possible device or browser window width.

This is to allow designers to exactly model real-world responsive behavior. Designers can get caught in the pitfall of creating targeted views such as "Desktop view," an "iPad view" and a "phone view." These don't solve the problem of the "in betweens" -- what happens halfway between these two widths and what is really needed to transform one view into another. 

The next step is to open the XXXXX and create a mode for each of these breakpoints. If you don't know about Figma modes, you can [read about them here]() You can name your modes whatever works for you. As we go forward, we will add variables in each of these modes. Like our media queries, the values in each mode will be applied when a page is set to that mode -- effectively applying different styles based on the "breakpoint" that the page set at. 

The first values that we will add will be the `page-max-width` and `page-min-width`. These will be the min and max ranges of a particular breakpoint. 

Finally, we set up a page template component and the set the max-width of the frame to `page-max-width` and the min-width to `page-min-width`. You should be able to drag the frame between its min- and max-widths, switch modes and drag it between the min- and max-widths for that breakpoint.  

<figure>
<video width="100%" controls>
    <source src="/siteart/video/page-resize.mov">
</video>
<figcaption><strong>Video</strong> foobar foo bar foobar</figcaption>
</figure>

Finally, we set up a page template component and the set the max-width of the component to `page-max-width` and the min-width to `page-min-width`. You should be able to drag the frame between its min- and max-widths, switch modes and drag it between the min- and max-widths for that breakpoint.  

<!-- video here -->



## Flexible Grid Layout System

Now that a basic page template has been made, we need to fill that page up with content. That means a layout system. 

Our system uses Layout components that span the full six columns of our grid. Inside these layouts are Containers that span anywhere from one to five columns in a variety of configurations. For example we have a one-five, which is a Container that spans one column with one that spans five. A two-three has a two column container and three column. The logic extends to a three-three, two-two-two and any combination of Container widths that add up to six column span. 

In the spirit of responsive design, they are a flexible grid. They get narrower as the page width shrinks until they finally break into a wrap and stack configuration. By default, these layout columns break from rows into columns at `Narrow` breakpoint, however the Layout props allow the designer to "move up" that breakpoint to `Small` or `Medium` breakpoints as determined by their content and design needs. 




In a sense, this system will use the same princples as the breakpoints on the Page Template, we will set min- and max-widths for containers. These containers will reside inside layouts. 



## Responsive Spacing

Responsive spacing is a key to "it just works" ethos of this design system. 

These are a set of sizing variables that change across each of our breakpoints so that they tighten up as the viewport shrinks. Further, we have abstracted them into a group of relative sizes, ranging from Extra Wide to Tightest. In their use, the exact amount is less important than the value of judgment of "it looks good," especially because the actual value of the spacing will change based on viewport size

| Breakpoint |Base | Medium | Small | Narrow |
| --- | --- | --- | --- |
| Base | 12px | 12px | 8px |  8px |
| None | 0px | 0px | 0px |  0px |
| Tightest | 4px | 4px | 4px |  4px |
| Tight | 8px | 8px | 4px |  4px |
| Loose | 16px | 16px | 12px |  12px |
| Loosest | 24px | 24px | 16px |  16px |
| Wide | 36px | 36px | 24px |  24px |
| Extra Wide | 48px | 48px | 30px |  30px |


## Component Swap System

One of the more thorny problems of responsive design in Figma is complex content reflow. While the responsive layouts will handle the overall reflow of the page structure. But it can't turn a table into a list, or cause a three side-by-side items reflow into a wrap and stack.

The answer here is to design the versions for each breakpoint and have them live swap when switching between breakpoints. This is done by combining two methods:

- A component with a variant for any breakpoint where it needs to change. 
- A set of variables that will trigger the component swap. 


| Breakpoint |Base | Medium | Small | Narrow |
| --- | --- | --- | --- |
| @none | None | None | None |  None |
| @med | Base | Medium | Medium |  Medium |
| @small | Base | Base | Small |  Small |
| @narrow | Base | Base | Base |  Narrow |
| @small @narrow | Base | Base | Small |  Narrow |
| @med @small | Base | Medium | Small |  Small |
| @med @narrow | Base | Medium | Medium |  Narrow |
| @med @small @narrow | Base | Medium | Small |  Narrow |


<figure>
<video width="100%" controls>
    <source src="/siteart/video/component_swap.mp4">
</video>
<figcaption><strong>Video Demo</strong> Components can live swap between breakpoints, going from a side-by-side layout to a wrap and stack and back to the original layout.</figcaption>
</figure>
