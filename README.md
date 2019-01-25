Files README.md
---

Show README.md & HEADER.md gitlab style on your NextCloud !

![screenshot](screenshot.png)

With this app you can add a header and a footer to your nextcloud directories.
This can be use to explain the goal of a directory, describe the content of a folder ...

It show README.md in the way gitlab does.


# Usage 

  * Create a README.md file (case sensitive name) and fill it with the apropriate Markdown content.
  * You can do the same with the HEADER.md file.
  * It's rendered using the markdown engine. Before file list for the HEADER.md, after file list for the README.md

Now you can use template to customize the README.md/HEADER.md rendering.

  * Create your own theme and use your own content.css (see css/content.css file)
  * Rendering is done inside a div contenair with headermd or readmemd class.
  
# Requirement
  * ~~[markDown editor](https://apps.nextcloud.com/apps/files_markdown) need to be installed~~
  * An alternate renderer [(showndown)](http://showdownjs.com/) is now used when the [markDown editor](https://apps.nextcloud.com/apps/files_markdown) is not available    

# Limitation
  * Doesn't show up in public share
