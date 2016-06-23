# Searchy McSearchBox
---
A pretty JQuery plugin search box for [lunr.js](http://lunrjs.com). Demo [here](http://pjtatlow.me/notes) (hint: press Shift + Space to see it).

---
##Dependencies:
* Bootstrap CSS (including glyphicons)
* JQuery
* Lunr.js
* JQuery UI (OPTIONAL)

---

##Installation:
It's really simple to use. If you are already using Lunr.js just pass in your index and an array of all your posts. Here's what it might look like:
```js
$(document).ready(function() {

  var my_posts = [ // create an array or object of blog posts
    { 
    title: "My Blog Post", // REQUIRED 
    url : "/my_blog_post.html", // REQUIRED
    html : "<p>This is my blog post...</p>", // REQUIRED (just an exerpt of the post)
    date: new Date("2016-06-23T12:45:37-06:00"), // OPTIONAL (date will show underneath preview)
    category: ["welcome","searchyMcSearchBox"], // OPTIONAL (allows for searching by category)
    content: "This is my blog post..." // OPTIONAL (basically the same as html but with the tags removed)
    // you can add any other items you'd like and include them in the index for searching
    }
  ]
  
  var my_lunr_index = lunr(function () { // create the index
    this.field('id'); // REQUIRED
    this.field('title', { boost: 10 }); // REQUIRED
    this.field('category', { boost: 7}); // OPTIONAL
    this.field('content'); // OPTIONAL
  }); 
  
  for (var key in my_posts) { // load the index with your posts.
    my_lunr_index.add({
      'id': key,
      'title': my_posts[key].title,
      'category': my_posts[key].category,
      'content': my_posts[key].content
    });  
  }
  
  
  
  $(document).searchyBox({ // initialize
      posts: my_posts,
      idx: my_lunr_index,
      dates: true,
      draggable: true,
      placeHolder: "Search Posts",
    });
    
}
```

---
##Options:

* draggable (bool; Optional; Default: false):
  * Whether or not you want the search box to be draggable using a mouse
  * **NOTE:** requires JQuery UI
* dates (bool; Optional; Default: false):
  * Whether or not to show dates under the post preview
* floatingBtn (bool; Optional; Default: false): 
  * Adds a floating button fixed to the bottom right corner that opens the search box
  * Recommended if you want mobile users to be able to search
* placeHolder (string; Optional; Default: "Search Blog"):
  * The placeholder you want for the input box
* style (object; Optional; Default: {background: "#579A00",text: "#eee"}):
  * Determined the background and text colors of a selected post, as well as the floating button
  * Any valid CSS color is allowed
  * if you provide this option, give values to both "background" and "text"
* shortcut (object; Optional; Default: {key:32,modifier: "shiftKey"}):
  * The [keycode](https://css-tricks.com/snippets/javascript/javascript-keycodes/#article-header-id-1) and modifier that trigger the search-box
  * Valid modifiers are "ctrlKey", "altKey", and "shiftKey"
  * Any valid keycode is allowed (key must be int)


