var ready = function (fn) {
  console.log('ready');
  // Sanity check
  if (typeof fn !== 'function') return;
  // If document is already loaded, run method
  if (document.readyState === 'complete') {
    return fn();
  }
  // Otherwise, wait until document is loaded
  document.addEventListener('DOMContentLoaded', fn, false);
};
var pageFunctions = {
  intialize: function () {
    var self = this;
    this.initJsTest(); //test for js
    this.initScrollButton();
    this.initMenuButton();
    this.addLink();
    this.initResizeListener();
    this.getElementsAll();
    this.handleDate();
    self.initScrollListener("textPage");
    self.initQuoteAnimate(self.blogQuotes);
  },
  initializeIndex: function () {
    var self = this;
    self.getElementsIndex();
    self.nameplateAnimate(); // animates nameplate
    self.setActiveItem(self.indexModules);
    self.initScrollListener('index');
  },
  getElementsAll: function () {
    var self = this;
    self.header = document.querySelector('#inside-header');
    self.navMenu = document.querySelector('#nav-menu');
    self.logo = document.querySelector('#header-logo');
    self.menuButton = document.querySelector('#menu-button');
    self.siteFooter = document.querySelector('#site-footer');
    self.siteFooterLinks = [].slice.call(document.querySelectorAll('#footer-links li'));
    self.scrollButton = document.querySelector('#scroll-to-top');
    self.blogQuotes = [].slice.call(document.querySelectorAll('.blog-pullquote'));
  },
  getElementsIndex: function () {
    var self = this;
    self.indexModules = [].slice.call(document.querySelectorAll('.teaser-module'));
  },
  initScrollListener: function (pageType) {
    var self = this;
    // var used to determine scroll direction
    self.lastScrollTop = 0;
    document.onscroll = function () {
      var scrollPosition = self.getScrollPosition();
      if (pageType === 'index') {        
        self.setActiveItem(self.indexModules);
      }
      console.log(pageType)
      if (pageType === 'portfolio_entry'|| pageType === 'textPage') {
        self.initQuoteAnimate(self.blogQuotes);
      }
      self.handleScrollButton(scrollPosition);
      self.handleSiteFooter(scrollPosition);
    };
  },
  initResizeListener: function () {
    var self = this;
    window.onresize = function (e) {
      self.heroArtHeight = document.querySelector('#hero-image').clientHeight;
      self.entryList = [].slice.call(document.querySelectorAll(".blog-entry"));
    };
  },
  initJsTest: function () {
    document.querySelectorAll('HTML')[0].classList.remove('no-js');
  },
  initScrollButton: function () {
    var self = this;
    var scrollToTopButton = document.querySelector('#scroll-to-top');
    scrollToTopButton.addEventListener("click", function (e) {
      var scrollStart = self.getScrollPosition();
      self.scrollToGeneric(0, 500, scrollStart);
      e.preventDefault();
    });
  },
  initMenuButton: function () {
    var self = this;
    var menuButton = document.querySelector('#menu-button'),
      navMenu = document.querySelector('#nav-menu');
    menuButton.addEventListener("click", function (e) {
      self.expandMenu();
      e.preventDefault();
    });
  },
  initButtonHandler: function () {
    const cont = document.querySelector('#blog-container');
    cont.addEventListener("click", (e) => {
      const scroll = document.documentElement.scrollTop
      const val = document.querySelector(`#${e.target.value}`).classList.remove("closed");
      document.documentElement.scrollTop = document.body.scrollTop = scroll;
    })

  },
  // onload functions
  // animates nameplate on page load
  nameplateAnimate: function () {
    var self = this;
    var siteNameplate = document.querySelector('#header-logo'),
      navigation = document.querySelector('#nav-menu'),
      siteSubhead = document.querySelector('#main-subhead');

      self.addShit(siteNameplate, 'main-header-nameplate--active');
      self.addShit(navigation, 'navigation-menu--active');
      self.addShit(siteSubhead, 'active');
      self.handleWillChange('will-change-ot', siteNameplate);
      self.handleWillChange('will-change-ot', siteSubhead);
      self.handleWillChange('will-change-ot', navigation);
  },
  addLink: function () {
    var linkList = [{
      "name": "email-link",
      "link": "mailto:david@davidputney.com?Subject=Website%20feedback"
    }, {
      "name": "linked-in",
      "link": "https://www.linkedin.com/in/davidmputney"
    }];

    linkList.forEach(function (el) {
      var targetEl = document.querySelector('#' + el.name);
      targetEl.innerHTML = "<a href=\"" + el.link + "\">" + targetEl.innerHTML + '</a>';
    });
  },
  handleScrollButton: function (scrollPosition) {
    var self = this;
    var scrollButton = self.scrollButton,
      active = scrollButton.classList.contains('scroll-to-top-active');

    if (scrollPosition > 300 && !active) {
      self.addShit(scrollButton, ["will-change-o", "scroll-to-top-active"]);
    }
    if (scrollPosition < 300 && active) {
      self.removeShit(scrollButton, ['scroll-to-top-active', 'will-change-o']);
      self.addShit(scrollButton, 'scroll-to-top-inactive');
    }
  },
  // initQuoteAnimate: function (quoteList) {
  //   var self = this;
  //   quoteList.forEach(function (el) {
  //     var visible = self.isElementVisible(el);
  //     var active =
  //       el.classList.contains('blog-pullquote--set');
  //     if (!visible && !active) {
  //       self.addShit(el, ['will-change-ot', 'blog-pullquote--set']);
  //     } else if (visible && active) {
  //       self.handleWillChange('will-change-ot', el);
  //       el.classList.add('blog-pullquote--animate');
  //     }
  //   });
  // },
  handleSiteFooter: function (scrollPosition) {
    var self = this;
    var siteFooter = self.siteFooter,
      isVisible = self.isElementVisible(siteFooter),
      active = siteFooter.classList.contains('site-footer-active');
    if (isVisible) {
      self.addShit(siteFooter, 'site-footer-active');
      self.handleWillChange("will-change-ot", siteFooter, 'LI');
      self.handleWillChange("will-change-o", siteFooter);
    }
  },
  handleWillChange: function (style, mainEl, subEl) {
    var self = this;
    if (subEl) {
      mainEl.addEventListener('transitionend', function (e) {
        var el = e.target;
        if (el.tagName === subEl) {
          el.classList.remove(style);
        }
      });
    } else {
      mainEl.addEventListener('transitionend', function (e) {
        mainEl.classList.remove(style);
      });
    }
  },
  setActiveItem: function (els) {
    var self = this;
    var windowHeight = window.innerHeight,
      triggerLine = windowHeight * 0.75;
    els.forEach(function (el) {
      var itemBounds = el.getBoundingClientRect();
        var active = el.classList.contains('set');
      // sets item to active when it scrolls up and into position
      if (itemBounds.top <= triggerLine && active) {
        self.removeShit(el, "active");
        self.addShit(el, "active");
        self.handleWillChange('will-change-ot', el);
      }
    });
  },
  // functions that return data or change elements
  getElemDistance: function (elem) {
    var location = 0;
    if (elem.offsetParent) {
      do {
        location += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return location >= 0 ? location : 0;
  },
  addShit: function (object, style) {
    if (style.constructor === Array) {
      style.forEach(function (el) {
        object.classList.add(el);
      });
    } else if (object.constructor === Array) {
      object.forEach(function (el) {
        el.classList.add(style);
      });
    } else {
      object.classList.add(style);
    }
  },
  removeShit: function (object, style) {
    if (style.constructor === Array) {
      style.forEach(function (el) {
        object.classList.remove(el);
      });
    } else {
      object.classList.remove(style);
    }
  },
  removeShitTimer: function (el, style, time) {
    var self = this;
    setTimeout(function () {
      self.removeShit(el, style);
    }, time);
  },
  scrollToGeneric: function (to, duration, start) {
    // slow scrolls to location send destination, duration of scroll and start point
    var self = this;
    var documentBody = document.body,
      html = document.getElementsByTagName('HTML')[0],
      scrollFunction = self.easeOutCubic,
      change = to - start,
      currentTime = 0,
      increment = 20;

    function animateScroll() {
      currentTime += increment;
      var val = scrollFunction(currentTime, change, duration, start);
      documentBody.scrollTop = val;
      html.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    }
    animateScroll();
  },
  easeOutCubic: function (currentTime, change, duration, start) {
    currentTime /= duration;
    currentTime--;
    return change * (currentTime * currentTime * currentTime + 1) + start;
  },
  expandMenu: function () {
    var self = this;
    var button = document.querySelector('#menu-button'),
      header = document.querySelector('#inside-header'),
      topNav = document.querySelector('#nav-menu'),
      active = topNav.classList.contains('nav-list--open');

    if (!active) {
      self.addShit(topNav, 'nav-list--open');
      self.addShit(button, 'nav-menu-button--active');
      self.addShit(header, 'menu-container--active');
      // self.handleHeadlineSwap(true) // boolean signals button press;
    }
    if (active) {
      self.removeShit(topNav, 'nav-list--open');
      self.addShit(topNav, 'nav-list--close');
      self.removeShit(button, 'nav-menu-button--active');
      self.removeShitTimer(header, 'menu-container--active', 500);
      self.removeShitTimer(topNav, 'nav-list--close', 500);
      self.handleHeadlineSwap(true); // boolean signals button press;
    }
  },
  handleDate: function () {
    document.querySelector('#current-year').innerHTML = new Date().getFullYear().toString();
  },
  getScrollPosition: function () {
    var sp = window.scrollY;
    return sp;
  },
  isElementVisible: function (elem) {
    var distance = elem.getBoundingClientRect();
    console.log("is vis")
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  initQuoteAnimate: function (quoteList) {
    var self = this;
    console.log("foobar", quoteList)
    quoteList.forEach(function (el) {
      var visible = self.isElementVisible(el);
      var active =
        el.classList.contains('blog-pullquote--set');
        
      if (!visible && !active) {
        self.addShit(el, ['will-change-ot', 'blog-pullquote--set']);
      } else if (visible && active) {
        self.handleWillChange('will-change-ot', el);
        el.classList.add('blog-pullquote--animate');
      }
    });
  },
};

// slideshow
(function(){
  const galleryWrapper = document.querySelector('.gallery-wrapper');
  const counter = document.querySelector('.gallery-count');
  const images = () => Array.from(document.querySelectorAll('.slide'));
  //finds the index of an element sent to it if the class matches
  const findI = (r, cl) => r.findIndex((el) => el.classList.contains(cl));
  const remove = (el, cl) => el.classList.remove(cl);
  const add = (el, cl) => el.classList.add(cl);
  const getSlide = (r, active) => r.filter((el, i) => i === active);
  const trans = (el) => document.querySelector('.gallery').addEventListener('transitionend', (e) => { remove(el, "move-out")} ); 

const advanceSlide = (curr, next) => {
  add(next, "center"),
  remove(curr, "center"),
  add(curr, "move-out"),
  trans(curr)
}
const slideCount = (slide) => counter.replaceChild(document.createTextNode(slide+1), counter.childNodes[0]);

const handleAction = (val) => {
    // Do something...
  const imgArr = images();
  // finds the slide with the class current
  const activeSlide = findI(imgArr, "center");  
  // gets dom object of current slide from array
  const [current] = getSlide(imgArr, activeSlide);     
  const [next] =  
    val === "advance" && activeSlide === imgArr.length - 1 ? imgArr.slice(0,1) 
    : val === "advance"? getSlide(imgArr, activeSlide + 1)
    : val === "back" && activeSlide === 0 ? imgArr.slice(-1)    
    : val === "back"? getSlide(imgArr, activeSlide - 1)
    : false;
    advanceSlide(current, next);
    slideCount(
    activeSlide + 1 === imgArr.length && val === "advance"? 0
    : activeSlide === 0 && val === "back"? imgArr.length - 1
    : val === "back"? activeSlide - 1
    :  activeSlide + 1
   )
};

 // Swipe Up / Down / Left / Right
 let initialX = null;
 let initialY = null;

const startTouch = (e) => {
   initialX = e.touches[0].clientX;
   initialY = e.touches[0].clientY;
 };

const moveTouch = (e) => {
  if (initialX === null) {
    return;
  }
  if (initialY === null) {
    return;
  }
  const dir = Math.abs(initialX - e.touches[0].clientX) > Math.abs(initialY - e.touches[0].clientY) && initialX - e.touches[0].clientX > 0 ? "advance": "back";

  handleAction(dir);
  initialX = null;
  initialY = null;
  e.preventDefault();
};

const clickMove = (e) => handleAction(e.target.value);

if (galleryWrapper) {
  galleryWrapper.addEventListener('touchstart', startTouch, false);
  galleryWrapper.addEventListener('touchmove', moveTouch, false);
  galleryWrapper.addEventListener("click", clickMove, false);
}

})();


 