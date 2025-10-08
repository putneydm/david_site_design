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

Consider the problem of building a flexible, dynamic screen from static design prototypes. 

A prototype is really just a plan -- a low-rez plan at best. Even the best prototypes are often handed over to engineers to "just figure out." They are the difference between a blueprint and the finished building. 

This isn't a knock on designers so much as stating the realities of tooling and its limitations. We've all felt it. 

As a designer and developer for *The Boston Globe* in the early days of responsive design, we did a lot of "this is the desktop view" and "this is the mobile view" prototypes. But the problem was figuring out the "in-betweens," what happens when the content starts to smoosh together somewhere between our designer-idealized sizing.

I finally landed on the notion that the only way to make a responsive website was to actually  *build a responsive website*. As a result, I went straight to code when [designing and building sites such as Crux.com](/design/crux/). Not the most practical solution, to be sure.

A solution to the lack of truly responsive prototypes arrived a couple years ago in the form of both variables and modes in Figma. I was in the audience at the Moscone Center for the demos and my reaction was "I can do so much with this." 

As a designer on the Aledade Canonical Design System I set out to create the most advanced design system in the world using these tools. It models responsive design 1:1 with code across every breakpoint while at the same time greatly simplifying the prototyping process. 

<figure>
<video width="100%" controls>
    <source src="/siteart/videos/full_responsive.mp4">
</video>
<figcaption><strong>Video Demo 1</strong> The Figma prototype models responsive behavior across all widths, with content reflow and resizing.</figcaption>
</figure>

## The Basics

What makes this type of advanced prototyping possible is Figma Variables and Variable Modes. They unlock several possibilities that are game-changers when prototyping. 

- they are a central source of truth
- they can be applied to multiple components
- they can represent multiple values

To an engineer, that begins to sound a lot like CSS. Functionally, they are, even if they are defined and maintained in different ways. For the uninitiated, an engineer may define something like a header -- an `H1` by giving it a size, color, line height etc. 

```CSS
h1 {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color:#333;
    font-size: 18px;
    line-height:1.3;
}
```

This is the central source of truth about a the visual design of an `H1`. If the color value for the `H1` is changes from `#333` to `#FF0000` all `H1`s would change from dark gray to red. This is the principle -- single source of truth, centrally maintained -- that we will use for our design system. Except with variables. 

Everything that makes a responsive system possible flows out of that idea. Variable Modes can change variables on the fly, across an entire prototype screen, all at once. 

I've broken this down into five steps – the basic ingredients of responsive prototypes. I'll be going through each of these, one by one with guidance on how to build them in Figma. 


1. [A set of breakpoints](#Breakpoints)
2. [A flexible grid layout system](#flexible-grid-layout-system)
3. [Responsive spacing system](#responsive-spacing-system)
4. [Responsive typography]()
5. [Component swap system](#component-swap-system)

## Breakpoints

We all know about breakpoints – resize a page and the content can reflow and resize.

How does this work? CSS contains media queries -- `@media screen and (max-width:940rem)` -- that do a simple check to see if certain conditions such as page width are true or false. 

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

At a certain viewport size range, specific styles are applied to the content and others are ignored. In this case, the font size changes to `14px` from `16px`. 

In Figma using Variables and Variable Modes will serve the same purpose. When a specific mode is active -- like a media query -- a set of values for that breakpoint range will be used. Exact values can be assigned to spacing, page width, sizing, max and min widths, and allow the entire page to change instantly.

The first step is to determine the viewport widths that will trigger content reflow and resizing. These will be our four breakpoints:

| Breakpoint | Page-Width-Min | PAge-Width-Max | Device Range |
| --- | --- | --- | --- |
| Base | 1081px | 2300px | Large desktop - Small desktop |
| Medium | 851px | 1080px | Small desktop - Tablet landscape | 
| Small | 850px | 601px | Tablet landscape - Tablet portrait |
| Narrow | 600px | 450px | Tablet portrait - Small phone |

These ranges roughly match size ranges of devices, but they don't *directly* target devices. They focus on building screens for *any size*, any device now or in the future. Each of these breakpoints is a Mode, as shown in Figure X.

<figure>
    <img src="/siteart/variable_modes.png">
<figcaption><strong>Figure X</strong> foobar foo bar foobar</figcaption>
</figure>

Finally, we set up a page template component and the set the max-width of the frame to `page-max-width` and the min-width to `page-min-width`. You should be able to drag the frame between its min- and max-widths, switch modes and drag it between the min- and max-widths for that breakpoint.  

<figure>
<video width="100%" controls>
    <source src="/siteart/video/page-resize.mov">
</video>
<figcaption><strong>Video</strong> foobar foo bar foobar</figcaption>
</figure>

## Flexible Grid Layout System

Now that a basic page template has been made, we need to fill that page up with content. That means a layout system. 

Our system uses Layout components that span the full six columns of our grid. Inside these layouts are Containers that span anywhere from one to five columns in a variety of configurations. For example we have a one-five, which is a Container that spans one column with one that spans five. A two-three has a two column container and three column. The logic extends to a three-three, two-two-two and any combination of Container widths that add up to six column span. 

In the spirit of responsive design, they are a flexible grid. They get narrower as the page width shrinks until they finally break into a wrap and stack configuration. By default, these layout columns break from rows into columns at `Narrow` breakpoint, however the Layout props allow the designer to "move up" that breakpoint to `Small` or `Medium` breakpoints as determined by their content and design needs. 




In a sense, this system will use the same principles as the breakpoints on the Page Template, we will set min- and max-widths for containers. These containers will reside inside layouts. 


<figure>
<video width="100%" controls>
    <source src="/siteart/videos/container_reflow.mp4">
</video>
<figcaption><strong>Video Demo | </strong> The Container components, with red outlines, have a flexible width and reflow into a wrap-and-stack layout at narrower widths.</figcaption>
</figure>


## Responsive Spacing System

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


## Responsive Typography


## Component Swap System

One of the more thorny problems of responsive design in Figma is complex content reflow. While the responsive layouts will handle the overall reflow of the page structure. But it can't turn a table into a list, or cause a three side-by-side items reflow into a wrap and stack.

The answer here is to design the versions for each breakpoint and have them live swap when switching between breakpoints. 

<figure class="blog-image-insert">
    <img src="/siteart/responsive_component.png" alt="A Sketch file with the name homescreens-new-12/20/2019-updated-final-revised-final-final.sketch.">
    <figcaption><strong>Responsive Components</strong> This calendar component has layouts for three-across, two-across and stacked that will live swap at each breakpoint.</figcaption>
</figure>

This is done by combining two methods:

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
    <source src="/siteart/videos/component_swap.mp4">
</video>
<figcaption><strong>Video Demo</strong> Components can live swap between breakpoints, going from a side-by-side layout to a wrap and stack and back to the original layout.</figcaption>
</figure>



## Putting it all Together


A few other basic requirements before we get started: 

- Layouts must be built using Auto Layout
- The outermost frame of a layout must be set to a static width. 
- Components inside this frame must be set to `fill` horizontally and `hug` vertically.