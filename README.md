# Searchy 
#####(aka Searchy McSearchBox)
---
A pretty jQuery plugin search box that works with [lunr.js](http://lunrjs.com). Demo [here](http://pjtatlow.me/notes) (hint: press Shift + Space to see it).

---
##Dependencies:
* [Bootstrap CSS](getbootstrap.com) (including glyphicons)
* [jQuery](http://jquery.com)
* [Lunr.js](http://lunrjs.com)
* [jQuery UI](https://jqueryui.com) (OPTIONAL: You really only need "draggable")

---

##Installation:

####Bower (recommended)
```bash
bower install searchy.js
```
####Download

Grab the [css](https://raw.githubusercontent.com/pjtatlow/searchy.js/master/dist/searchy.min.css) and the [js](https://raw.githubusercontent.com/pjtatlow/searchy.js/master/dist/searchy.min.js) and include them on your page. Be sure you meet all the other dependencies have the script load after jQuery. 

---

##Use:
It's really simple to use. If you are already using Lunr.js just pass in your index and an array of all your posts. Here's what it might look like:
```js
$(document).ready(function() {

  var my_posts = [ // create an array of blog posts
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
##Parameters:


* posts (array; Required; Default: none):
  * An array of each of the posts in the blog
* index (object; Required; Default: none):
  * A Lunr.js index with your posts added
* appendTo (string; Optional; Default: "body"):
  * The element to which you want the search box appended. Unless you have some specific reason, probably leave this one alone.
* draggable (bool; Optional; Default: false):
  * Whether or not you want the search box to be draggable using a mouse
  * **NOTE:** requires jQuery UI
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

##Using with Jekyll

Assuming your [front matter](https://jekyllrb.com/docs/frontmatter/) looks something like this...
```yaml
---
layout: post
title:  "My First Post!"
date:   2016-06-23 12:45:37 -0600
categories: welcome searchyMcSearchBox
---

```
You can use the below javascript to create the array of posts and add them to a Lunr.js index.

```js
  var posts = [ 
    {% for post in site.posts %}
      {
        "title": "{{ post.title | xml_escape }}",
        "category": {{ post.categories | jsonify }} ,
        "content": {{ post.content | strip_html | strip_newlines | jsonify }},
        "html": {{ post.excerpt | jsonify }},
        "url":  "{{ post.url | xml_escape }}",
        "date": new Date( "{{ post.date | date_to_xmlschema }}" )
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  
  
  var idx = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('category', { boost: 7});
    this.field('content');
  });  
  
 
  for (var key in posts) {
    idx.add({
      'id': key,
      'title': posts[key].title,
      'category': posts[key].category,
      'content': posts[key].content
    });  
  }

```

---

##Development
1 Fork the repo using the button at the top^.

2 Clone the repo to your machine:
```bash
git clone https://github.com/{{ yourUserNameHere }}/searchy.js.git
```
3 Make your changes, then run:
```bash
gulp // this will minify your js and sass into the "dist/" directory
```
4 Commit and push your changes back to your repo:
```bash
git add *
git commit -m "Description of my changes"
git push
```
5 Click "New Pull Request" at the top of your repository!

Done!

##Final Thoughts
If you're using this anywhere let me know on [twitter](twitter.com/pjtatlow).

Also if you could provide a link to my site [pjtatlow.me](pjtatlow.me) that would be awesome!


