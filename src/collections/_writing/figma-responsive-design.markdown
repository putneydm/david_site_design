---
title:  "How to build an advanced responsive design system in Figma"
subhead: "Modeling a fully responsive prototype is the Holy Grail. Figma includes the tools to make that reaility."
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

As a [designer and developer](/resume/#bostonglobe.com) for *The Boston Globe* in the early days of responsive design, we did a lot of "this is the desktop view" and "this is the mobile view" prototypes. But the problem was figuring out the "in-betweens," what happens when the content starts to smoosh together somewhere between our designer-idealized sizing.

I finally landed on the notion that the only way to make a responsive website was to actually  *build a responsive website*. As a result, I went straight to code when [designing and building sites such as Crux.com](/design/crux/). Not the most practical solution, to be sure.

Modeling responsive design down to pixel perfection hasn't really been possible. In fact, it's the Holy Grail of prototyping, in many ways. Or is it?

It's actually possible. A solution arrived a couple years ago with variables and variable modes in Figma. I was in the audience at the Moscone Center for the demos and my reaction was "I can do so much with this." 

It's just a matter of putting it all together to create the most advanced design system in the world. The result is a system that models responsive design perfectly and raise the fidelity of prototypes while at the same time greatly simplifying the design, delivery and engineering. 

<figure>
<video width="100%" controls>
    <source src="/videos/full_responsive.mp4">
</video>
<figcaption><strong>Video Demo 1</strong> The Figma prototype models responsive behavior across all widths, with content reflow and resizing.</figcaption>
</figure>

## The Basics

Figma Variables and Variable Modes unlock possibilities that are game-changers when prototyping. They serve these purposes:

- a central source of truth
- can be applied to multiple components
- represent multiple values that can be changed on the fly

To an engineer, that begins to sound a lot like CSS. Functionally they are, even if they are defined and maintained in different ways. For the uninitiated, an engineer may define something like a header -- an `H1` -- by giving it a size, color, line height etc. 

```CSS
h1 {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color:#333;
    font-size: 18px;
    line-height:1.3;
}
```

This is the central source of truth about the visual design of an `H1`. If the color value for the `H1` is changed from `#333` to `#FF0000` all `H1`s would change from dark gray to red. This is the principle -- single source of truth, centrally maintained -- that we will use for our design system. Except with variables instead of style declarations. 

Everything that makes a responsive system possible flows out of that idea. Variable Modes can change variables on the fly, across an entire prototype screen, all at once, affecting everything defined by that variable. Spacing, type size, line height, border width, corner radius, color and more can all be defined this way.

In short, any value that can be controlled or set with a Figma variables at the library level *absolutely positively* should be. This concept -- a single source of truth -- leads to design consistency, easier maintenance and ability to closely match prototypes and code. 

The advanced abilities of this system also extend to engineering teams. Our Vue components, type, spacing -- everything  -- are one-to-one matches. A designer can set a breakpoint on a Layout compoent, and that translates directly over to the code asset using Code Connect and Figma developer tools. 

This closes the gap between designer intent and developer delivery. Everyone uses the same tools, with the same names and the same results.

Ready to build something? 

I've broken the process of building this system down into five steps. These are the basic ingredients of responsive prototypes. I'll be going through each of these, one by one with guidance on how to build them in Figma. 

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

| Breakpoint | Page-Width-Min | Page-Width-Max | Device Range |
| --- | --- | --- | --- |
| Base | 1081px | 2300px | Large desktop - Small desktop |
| Medium | 851px | 1080px | Small desktop - Tablet landscape | 
| Small | 850px | 601px | Tablet landscape - Tablet portrait |
| Narrow | 600px | 450px | Tablet portrait - Small phone |

These ranges roughly match size ranges of devices, but they don't *directly* target devices. They focus on building screens for *any size*, any device now or in the future. Each of these breakpoints is a Mode, with the page min- and max-widths values for that breakpoint.

Finally, we set up a page template component and the set the max-width of the frame to `page-max-width` and the min-width to `page-min-width`. [You should be able](https://www.youtube.com/watch?v=535Zy_rf4NU) to drag the frame between its min- and max-widths, switch modes and drag it between the min- and max-widths for that breakpoint.  

<figure>
<video width="100%" controls>
    <source src="/videos/page_template_resize.mp4">
</video>
<figcaption><strong>Video Demo</strong> With the min- and max-widths assigned, the page can now switch between modes to simulate breakpoints and page resizing.</figcaption>
</figure>

## Flexible Grid Layout System

This is the most [complicated](https://www.youtube.com/watch?v=UjvGAYuWSUA) part of the responsive system. It will include creating a set of min- and max-width variables and assigning those widths to containers. The end result will be a system to allow content containers to automatically resize and reflow as the page is resized. 

The result is an extraordinarily powerful tool for quickly building complex responsive screens. And, by matching these layouts in code, engineers will have an equally powerful tool at their disposal. 

A layout component is made up of:

- **Layout** -- These are the outer containers that span the full width of the content area.
- **Container** -- These are inside the Layouts and span a specific number of columns, from one to six.

For example we have a One-Five Layout, which is a layout with a Container that spans one column and a Container that spans five. A Two-Three has a two column container and three column. The logic extends to a Three-Three, Two-Two-Two and any combination of Container widths that add up to fill a six-column span.

<figure class="blog-image-insert">
    <img src="/siteart/layout_options.png" alt="A Sketch file with the name homescreens-new-12/20/2019-updated-final-revised-final-final.sketch.">
    <figcaption><strong>Image X</strong> The variety of Layouts & Containers for all four breakpoints allows for multiple choices for fast prototyping.</figcaption>
</figure>

Setup for the Layout part is fairly straightforward. It's a frame with auto layouts with the content [Flow](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout#flow) set to wrap. 

The Containers are also frames, but they have a min- and a max-width based on the percentage of the container they will take up, minus the gutter, for each breakpoint. 

This will take some math. The way to compute the max-widths of your containers is to start with a `base width` for your content. This is the max width of your Layout -- not the entire page -- at each breakpoint. The page is likely to have some padding around the outside, so take this into account. The formula:

`(base width - gutter widths) / columns`

The min widths for containers are computed by using the min-width of your Layout at each breakpoint. The result of all this math is a really big grid or variables full of min and max widths across each breakpoint. 

<figure class="blog-image-insert">
    <img src="/siteart/mins_and_max.png" alt="A Sketch file with the name homescreens-new-12/20/2019-updated-final-revised-final-final.sketch.">
    <figcaption><strong>Image X</strong> Layouts and Containers require computing a min and max width for each container across each breakpoint.</figcaption>
</figure> 

This table contains an example of min and max sizes for a One-Third container, which will take up a maximum of one third of any Layout. However, recall that Layouts have built-in breakpoints. The first two rows in the table -- `min` and `max` values -- are for the Containers that will break into a wrap and stack at `Narrow` breakpoint. The sets of with `@ Medium`, `@ Small` through `@ Narrow` are for the `Medium`, `Small` and `Narrow` breakpoints. At these breakpoints their min- and max- width is the same as the Layout, so they will break into a wrap and stack.

| Breakpoint |Base | Medium | Small | Narrow |
| --- | --- | --- | --- |
| Min | 329.66 | 257 | 181.66 |  418 |
| Max | 502.66 | 338.66 | 264.66 |  576 |
| Min @ Medium | 329.66 | 787 | 569 |  418 |
| Max @ Medium | 502.66 | 1048 | 817 |  576 |
| Min @ Small | 329.66 | 261.34 | 569 |  418 |
| Max @ Small | 502.66 | 338.66 | 817 |  576 |

The Components closely replicate the structure and functions of the flexible grid of a responsive page. Additionally, this implementation makes for a robust component. Video Demo X shows several of these Layout & Container components in use. 

<figure>
<video width="100%" controls>
    <source src="/videos/flexible_grid.mp4">
</video>
<figcaption><strong>Video Demo X | </strong> The Container components, with red outlines, have a flexible width and reflow into a wrap-and-stack layout at narrower widths.</figcaption>
</figure>


## Responsive Spacing System

At a desktop size, space is plentiful, and the larger scale lends itself to more spacing between elements However, as the viewport shrinks, space is at a premium. That means lots of rework when designing for multiple viewports, tweaking each prototype to get everything just so.

Wouldn't it be nice if it "just worked"? 

Figma Variables and Variable Modes can embed multiple values within a single variable. These change across each breakpoint, tightening up as the viewport shrinks. This is the breakdown:

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

In their use, the exact amount is less important than "it looks good." Spacing of `12px` isn't `12px` across all breakpoints, the naming convention abstracts them into a group of relative sizes. Base is default.

## Responsive Typography

Responsive typography is much like responsive spacing. It is a variable set, but it also controls every aspect of typography across the breakpoints. Any type setting -- size, line height, spacing -- can be tweaked for optimum display. 

A variable set for controlling type size might look something like this. Although type choice and other factors might apply to specific design systems. 

| Breakpoint |Base | Medium | Small | Narrow |
| --- | --- | --- | --- |
| Body | 12px | 12px | 8px |  8px |
| Body-Small | 0px | 0px | 0px |  0px |
| H1 | 4px | 4px | 4px |  4px |
| H2 | 8px | 8px | 4px |  4px |
| H3 | 16px | 16px | 12px |  12px |
| H4 | 24px | 24px | 16px |  16px |
| H5 | 36px | 36px | 24px |  24px |
| H6| 48px | 48px | 30px |  30px |

Because of size of the type changes and we are using a [unitless line height](https://css-tricks.com/almanac/properties/l/line-height/), line height must also be handled with a variable set. 



## Component Swap System

One of the more thorny problems of responsive design in Figma is complex content reflow. While the responsive layouts will handle the overall reflow of the page structure. But layouts can't turn a table into a list, or cause a three side-by-side items reflow into a wrap and stack.

The answer here is to design the versions for each breakpoint and have them live swap when switching between breakpoints. 

What makes this possible is that component props can be changed using variables. The most common case might be flipping a boolean value of a prop from true to false. However, any prop of any component can be changed.

This is done by combining two methods:

- A set of variables that will trigger the component swap.
- A component with a variant for any breakpoint where it needs to change. 

Our variable set will look like this. It takes in all possible combinations of breakpoint swaps that a component might require.

| Breakpoint |Base | Medium | Small | Narrow |
| --- | --- | --- | --- |
| @none | None | None | None |  None |
| @med | Base | Medium | Medium | Medium |
| @small | Base | Base | Small |  Small |
| @narrow | Base | Base | Base |  Narrow |
| @small @narrow | Base | Base | Small |  Narrow |
| @med @small | Base | Medium | Small |  Small |
| @med @narrow | Base | Medium | Medium |  Narrow |
| @med @small @narrow | Base | Medium | Small |  Narrow |

A component that will be live swapped requires a variant for each breakpoint. As shown in Image X below, this calendar layout has a three-across layout for Base and Medium breakpoints, and then a two-across for Small and finally a wrap and stack for Narrow. This component has a prop `Breakpoint`. The value of the prop for the three-across, is `base`, the two across is `medium` and the stack is `narrow`. 

<figure class="blog-image-insert">
    <img src="/siteart/responsive_component.png" alt="A Sketch file with the name homescreens-new-12/20/2019-updated-final-revised-final-final.sketch.">
    <figcaption><strong>Image X</strong> This calendar component has layouts for three-across, two-across and stacked that will live swap at each breakpoint.</figcaption>
</figure>

When the component is placed in the design, the Breakpoint prop is replaced with an @break variable. In this case, `@small @narrow`. Switching to the breakpoint of `small` causes the value of our @break variable to change from `base` to `small`, and the `small` variant is displayed in the prototype. 

<figure>
<video width="100%" controls>
    <source src="/videos/hot_swap.mp4">
</video>
<figcaption><strong>Video Demo</strong> The Calendar component can live swap between breakpoints, going from a side-by-side layout to a wrap and stack and back to the original layout.</figcaption>
</figure>


## Putting it all Together

At this point the system has breakpoints, a flexible grid system and responsive spacing and typography. System components from buttons to containers to the site header can be built using these principles and methods.

With these pieces in place, a designer can quickly build a prototype that is responsive. This won't solve everything. It's more of an 85 percent solution. The remaining 15 percent requires individual tweaking of content that can be live swapped using the component swap system. This might sound difficult, but it's far easier than putting together "this is the desktop" and "this is the iPad version" and manually tweaking everything.

Additionally, engineers will work from the same toolset in code, which means faster build times. 

So how does a page actually get built using these tools? They ared structured so that components can be embedded within components. Tbe page, layouts, cards come directly from the library. These all have "content slots" that can contain either library components or custom content.  

It's components all the way down.

<!-- image of component slots -->

<figure class="blog-image-insert">
    <img src="/siteart/responsive_component.png" alt="A Sketch file with the name homescreens-new-12/20/2019-updated-final-revised-final-final.sketch.">
    <figcaption><strong>Image X</strong> This calendar component has layouts for three-across, two-across and stacked that will live swap at each breakpoint.</figcaption>
</figure>

The page template -- shown in Figure X -- has multiple slots. These slots are simply a fame with some color applied. Figma allows for swapping any component for any other component at any time. Click on the component name in the upper right, choose from the library or locally created. 

However, designers must follow these basic principles:

- Layouts must be built using Auto Layout
- The page template must be set to a static width. 
- Components inside this frame must be set to `fill` horizontally and `hug` vertically.

However, a fully responsive page can be built extraordinarily fast. 

<!-- video building a responsive page -->
<figure>
<video width="100%" controls>
    <source src="/videos/hot_swap.mp4">
</video>
<figcaption><strong>Video Demo</strong> The Calendar component can live swap between breakpoints, going from a side-by-side layout to a wrap and stack and back to the original layout.</figcaption>
</figure>

## Conclusion

After years of stasis, Figma has been presenting exciting tools to build design system tools not possible just a few years ago. 

Getting everything into place takes some work. Building Layouts and Containers proved to be a bit tedious at times. However, the result is an advanced toolset that benefits designers and engineers. 



