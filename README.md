Files README.md
---

Show README.md & HEADER.md gitlab style on your NextCloud !

With this app you can add a header and a footer to your nextcloud directories. This can be use to explain the goal of a directory, describe the content of a folder ...

![screenshot](screenshot.png)

It show README.md in the way gitlab does ✌️ .

# 

# V3.X
Starting NC 28 the nextcloud files app has been updated to use vue.js. As a consequence files_readme.md had to be rewritten for most of the parts. This new version is using vue.js as frontend framework. this could introduce new bug or regression that were not present in 2.XX versions.


# Usage

- Create a README.md file (case sensitive name) and fill it with the apropriate Markdown content.
- You can do the same with the HEADER.md file.
- It's rendered using the same markdown engine as the app. Before file list for the HEADER.md, after file list for the README.md
- You can now use .README.md & .HEADER.md .It means that you can now hide those files.
- You can also use .markdown extention.
- It also render in public shares !
- optimized compatibility with markdown produce by text app

# Markdow enabled plugins

The following markdown plugins are available, more to come, fill a issue if you need more.

|      Plugins      |            Link            |
|:-----------------:|:--------------------------:|
| Image sizing |  [markdown-it-imsize](https://www.npmjs.com/package/markdown-it-imsize) |
| Task list | [markdown-it-task-lists](https://www.npmjs.com/package/markdown-it-task-lists) |
| Code highlight | [markdown-it-highlightjs](https://www.npmjs.com/package/markdown-it-highlightjs) |
| Mermaid | [markdown-it-mermaid-plus](https://www.npmjs.com/package/markdown-it-mermaid-plus) |
| Katex | [markdown-it-katex](https://www.npmjs.com/package/markdown-it-katex) |
| image resize | [imsize](https://www.npmjs.com/package/markdown-it-imsize) |
| Anchord | [markdown-it-anchor](https://www.npmjs.com/package/markdown-it-anchor) |
| Table of Contents | [markdown-it-toc-done-right](https://www.npmjs.com/package/markdown-it-toc-done-right) |
| emoji | [markdown-it-emoji](https://www.npmjs.com/package/markdown-it-emoji)|

# Admin section

Admin section in setting let you tweak README.md :

- Multi rendering engine are available
- You can choose which filenames are to be used for header/footer content.