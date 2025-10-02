---
title:  "How to build a basic PostCSS plugin"
subhead: "Problems with Your Legacy Codebases? A PostCSS Plugin is your Multitool to Solve Them"
imageAlt: Screenshot of MIB Electronic Medical Records Portal
layout: blog_entry
pageType: blog_entry
project: MIB-EHR was a legacy company's entry into the fast-growing field of electronic medical records for life insurance companies. It delivered records from multiple vendors, cut weeks off delivery times and hugely reduced costs. I designed, built and delivered a simple, perfomant front end and wrote extensive documentation.
image: multilool
urllink: https://cantina.co/postcss-plugin-problem-solving-multitool/
sequence: 5  
---


Nobody writes just CSS these days.

It’s a preprocessor world and we all just live in it. That means some sort of build system – Webpack, Gulp and Grunt being the leading choices.

A typical build system takes care of dozens of small tasks: concatenating, minifying, transpiling, auto-prefixing, linting and so on. Their modular nature and the customization that modularity affords make these build systems so useful.

That thinking informs PostCSS. It’s not structured as a monolithic CSS preprocessor, such as Sass or Stylus. It can’t even do anything on its own. It’s an ecosystem with hundreds of small, specifically targeted plugins. Going all-in on PostCSS can mean tracking down and installing dozens of plugins. That may sound a little like “here’s a Formula 1 car, some assembly required.”

But as a supplement to a build system, PostCSS can feel like it grants development superpowers. And not just from off-the-shelf plugins. PostCSS is like the Green Lantern’s magic ring that allows devs to build exactly they need.

Sometimes that need is a specifically targeted solution to a thorny CSS problem. Or maybe just some cool timesaver. PostCSS is a multitool compared with Sass’s single-purpose wrench.

Plugin development is remarkably easy. Nothing is exotic; it’s just JavaScript, well within the wheelhouse of a moderately skilled developer.

I found myself taking a close look at PostCSS while dealing with the cruft of legacy CSS that was written using a deprecated pixels-to-rem function. The CSS also included another codebase using pixel values. Suddenly PostCSS made a lot sense.

## Building a Plugin

Making a plugin to handle this situation proved surprisingly easy. PostCSS does all the work of supplying the CSS data and recompiling it. Dev work mainly involves modifying strings for reinsertion into the processed CSS. So brush up on your regex!

The intent here is not a full-blown step-by-step tutorial – you can find a really good one here – it’s more of a high-level look at how a plugin is built. This also assumes some level of familiarity with NPM, PostCSS, and the command line.

PostCSS plugins are NPM packages: An `index.js` JavaScript file and a package.json file that live in a directory in a project’s `node_modules` folder. This will walk you through creating an NPM package.

`index.js` is where plugin code will go. The basic code structure is:

<pre>
<code>
var postcss = require('postcss');
module.exports = postcss.plugin('yourpluginname', function your-plugin-name(options) {
    return function (css) {
    options = options || {};
    console.log('My plugin works!');
    // Your code will go here
   }
});
</code></pre>

Items worth noting:

* Replace `yourpluginname` with a unique name of the plugin.
* The function can receive an argument ``options``. This is a data object that passes user preferences to the function. These are just simple values -- booleans, strings, numbers. This will come in handy if you plan to include user-defined options.
* `console.log()` inside the plugin displays in the command line.

This plugin code doesn’t actually do anything at this point. PostCSS’s real magic is its ability to crawl and return the details of the entire CSS code file. This bit of JS inserted in place of `// Your code will go here` does that:

<pre>
<code>
css.walkRules(function (rule) {

    rule.walkDecls(function (decl, i) {
        console.log(decl.props) ;
        console.log(decl.value);
        console.log("--------");
    });

});
</code>
</pre>


A few items of note:

* `walkRules` accesses selectors or Atrules, such as media queries.
* `walkDecls` accesses information in each CSS declaration and runs a function on it. decl.props displays the type of declaration, e.g. border, background, font-size. decl.value is the value of the declaration, e.g. 1px solid red or 100px.
* These data are only a starting point, as far as properties that can be accessed. ``decl`` and ``rule`` have additional properties as outlined in the PostCSS API.

Without getting into implementation details, the implications of this are pretty clear. It’s now possible to access and modify almost anything in the entire unprocessed CSS file using JavaScript. And the result can be output into a processed file because ``decl.value`` and ``decl.props`` are getters and setters.

To illustrate this concept, here’s some code that would find every border-radius declaration and change its value to fooBar.

<pre>
<code>
var postcss = require('postcss');

module.exports = postcss.plugin('your-plugin-name', function yourPluginName (options) {
return function (css) {
options = options || {};

css.walkRules(function (rule) {

    rule.walkDecls(function (decl, i) {
        if (decl.prop === 'border-radius') {
            decl.value = 'fooBar';
        }
    });

    });
   }
});
</code></pre>

Input of:

<pre>
<code>
foo-style {
  border-radius: 50%;
}
</code></pre>

Would result in:

<pre>
<code>
foo-style {
  border-radius: “fooBar”;
}  
</code></pre>  

## Building For the Real World

The first step toward actually building a plugin is – as they say – realizing that you have a problem. Sometimes that’s just wondering “what if …” Or, in my own case, finding that I had painted myself into a corner with technical debt and needed a way out.

`postcss-pixels-to-rem` is meant to solve a problem in a personal project whose codebase had become fragmented and left behind by a deprecated Sass framework. Some declarations express pixel values as `rem(<value>)` others use `em(<value>)` and still others use `<value>px`. The plugin converts multiple CSS notation styles to rems or ems and includes several optional settings, such as base font size and declaration types to exclude.

The need to unify such messy code into a clean output in one fell swoop was what drove me to to see if maybe this PostCSS thing could do it.

In the space of about an hour I had a plugin of about 15 lines of code that used regex to find `rem(<value>)` or `em(<value>)` in the decl.value, convert it and spit it back out as clean CSS.

My day job is UX. My thoughts turned to user needs. I quickly realized that picking defaults for my plugin and and leaving it at that wouldn’t work. Some items might need to be sized in `rems` and others in `ems`. Some declarations might need to be excluded because they need to use `px – border`, for instance.

The base font size and default output unit – `rems` or `ems` – would also need to be set. That meant including user-configurable options. Additionally, media queries would also need to be converted, requiring diving into rules properties. It would have to grow beyond 15 lines.

Fortunately I had the perfect real-world test for the plugin: My own codebase.

## Under the Hood

Three functions do the bulk of the work of the plugin, finding matches, calculating the new value and then inserting them back into the code. The first looks for matches in declaration values or Atrules that are passed to it and it returns an array of matches.

<pre>
<code>
function findMatches (el) {
     return el.match(/(em\(\d+\)|rem\(\d+\)|\d+px)/ig, "");
};
</code></pre>

A second pulls out the values using regex and converts them using the default or user-set base value.

<pre>
<code>
function convertValues(matches) {
    var revised = matches.map(function(el, i) {
    var regExVal = new RegExp(/\d+/, 'g'),
       regExType = new RegExp(/(^em|rem|px)/, 'ig'),
       unit = regExType.exec(el)[0].toString();
 var measureType = options.unit ? options.unit : unit !== 'px' ? unit : 'rem';
 return convertedVal = regExVal.exec(el) / base + measureType;
});
    return revised
}
</code></pre>

A third replaces the old value with the revised value using native JS `.replace()`. The function receives an element – `decl.value` or Atrule value – an array of converted values and an array of values that match. It returns the element with new values substituted in.

<pre>
<code>
function replaceItem(item, convertedValues, matches) {
    var revisedParam = item;
    convertedValues.map(function(el, i) {
        revisedParam = revisedParam.replace(matches[i], el);
    });
return revisedParam
}
</code></pre>

Now that functions are in place to do the work of the plugin, it’s time to use `walkRules` to find any media queries – anything with a type of Atrule and with a name of media. The rule `params` that meet those conditions run through the three functions. The result is inserted back into the CSS by setting a new value for `params`.

<pre>
<code>
css.walkRules(function (rule) {
    var ruleParent = rule.parent;

    if (ruleParent.type === "atrule" && ruleParent.name === "media") {
      var matches = findMatches(ruleParent.params) || false,
          convertedVal = matches ? convertedVal = convertValues(matches) : false;

      if (convertedVal) {
        rule.parent.params = replaceItem(rule.parent.params, convertedVal, matches);
      }
    }
    rule.walkDecls(function (decl, i) {
      ...
    });
  });
  </code></pre>

`walkDecl` does much the same thing with the `decl.value` – runs it through the three functions and replaces the `decl.value` with the revised value.

<pre>
<code>
  css.walkRules(function (rule) {
        ...
        }
        rule.walkDecls(function (decl, i) {
          var matches = findMatches(decl.value);
          if (matches) {
            var convertedValues = convertValues(matches);
            decl.value = replaceItem(decl.value, convertedValues, matches);
          }
        });
      });
 </code></pre>     

This is something of a simplification and leaves out the logic used to implement user options. The result – I’ve created a code-freeze branch over on Github – is a little over 50 lines of fairly simple JavaScript. It’s also v1 code and probably could use a little tightening and a few more user options.

At this point you might be shouting at your screen “Why go through all this! Just fix the underlying CSS code!” But reality is that there’s the code we’d like to write and the code that actually gets written. And, yes adding a plugin is another dependency that can fail.

However, this solution ties the two CSS codebases together. The deprecated notation doesn’t break and proper notation can be used moving forward. It buys time to fix the deprecated notation.

Additionally using PostCSS pulls programming logic out of style sheet files where it doesn’t really belong and puts it into JavaScript, a language better suited for processing of data.

And that’s the power of PostCSS in a nutshell. It allows a developer to tackle a seemingly difficult problem with a specifically targeted solution. Maybe for your project that’s a fix. Maybe it’s a timesaving plugin.

It’s a little like if you can dream it, you can make it. And, as Inception points out, we mustn’t be afraid to dream a little bigger, darling.