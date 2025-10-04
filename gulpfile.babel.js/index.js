// cleaners
const { cleanJS } = require("./cleaners/cleanjs")
const { cleanFolders } = require("./cleaners/cleanfolders")
const { cleanCSS } = require("./cleaners/cleanCSS")
const { cleanPages } = require("./cleaners/cleanPages")
// css modules
const { css } = require("./css_modules/css")
const { cssInline } = require("./css_modules/cssinline")
// html 
const { layouts } = require("./html_modules/layouts")
const { pages } = require("./html_modules/pages")
const { includes } = require("./html_modules/includes")
// scripts
const { cachebustScripts } = require("./js_modules/cachebustscripts")
const { concatJs } = require("./js_modules/concat")
const { lintJS } = require("./js_modules/lintjs")
const { minifyScripts } = require("./js_modules/minifyScripts")
const { minifySearch } = require("./js_modules/minifySearch")
const { minifyInlineScripts } = require("./js_modules/minifyinlinescripts")
// movers
const { bower } = require("./movers/bower")
const { collections } = require("./movers/collections")
const { videos } = require("./movers/videos")

// fonts
const { fonts } = require("./util/fonts")

// visuals
const { svg } = require("./visuals/svg")
const { portfolioSVG } = require("./visuals/portfolioSVG")
const { blogImages } = require("./visuals/blogimages")
const { heroImages } = require("./visuals/heroimages")
const { heroIndex } = require("./visuals/heroimagesindex")
const { slideImages } = require("./visuals/slides")

// other
const { animations } = require("./animations")
const { paths } = require("./variables")
const { deploy } = require("./deploy")
const { util } = require("babel-core")

// variables
const { parallel, series, watch } = require('gulp');


// cleaners
exports.cleanJS = cleanJS;
exports.cleanFolders = cleanFolders;
exports.cleanCSS = cleanCSS;
exports.cleanPages = cleanPages; 
// css
exports.css = css;
exports.cssInline = cssInline;
// html
exports.layouts = layouts;
exports.pages = pages;
exports.includes = includes;

// util
exports.fonts = fonts;

// scripts
exports.cachebustScripts = cachebustScripts;
exports.lintJS = lintJS;
exports.minifyScripts = minifyScripts;
exports.minifySearch = minifySearch;
exports.concatJs = concatJs;
exports.minifyInlineScripts = minifyInlineScripts;
// movers
exports.bower = bower;
exports.collections = collections;
exports.videos = videos;
// visuals
exports.svg = svg;
exports.portfolioSVG = portfolioSVG;
exports.blogImages = blogImages;
exports.heroImages = heroImages;
exports.heroIndex = heroIndex;
exports.slideImages = slideImages;
// other
exports.deploy = deploy;
exports.animations = animations;

// combined tasks
exports.default = series(parallel(cleanCSS, cleanJS, cleanPages), bower, svg, portfolioSVG, parallel(css, cssInline), parallel(concatJs, minifyInlineScripts), cachebustScripts, parallel(includes, layouts, pages, collections))

exports.rebuild = series(parallel(cleanCSS, cleanJS, cleanPages), parallel(css, cssInline), parallel(concatJs, minifyInlineScripts), cachebustScripts, parallel(includes, layouts, pages, collections))

// watcher
const {
  styles: {
    watch: inputCSS,
    inputInline: inputInlineCSS
  },
  scripts: {
    input: inputJS,
    inline: inlineJS
  },
  includes: {
    input: includesInput
  },
  pageLayouts: {
    input: layoutsInput
  },
  pages: {
    input: pagesInput
  },
   markdown: {
    watch: markdown
  },
  videos: {
    input: videofolder
  }
} = paths;

function watchTask() {
  watch(
    [inputCSS, inputInlineCSS, inputJS, inlineJS, includesInput, layoutsInput, pagesInput, markdown, videofolder],
    series(parallel(cleanCSS, cleanJS, cleanPages), parallel(css, cssInline), parallel(concatJs, minifyInlineScripts), cachebustScripts, parallel(includes, layouts, pages, collections))
  );
}

exports.watcher = watchTask;



