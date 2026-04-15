# Course Content Folder

Drop your lesson `.md` files here following this naming convention:

```
course-content/
  SE101/
    01-welcome-and-overview.md
    02-variables-and-data-types.md
    03-control-flow.md
    ...
  SE102/
    01-how-the-web-works.md
    02-html-structure.md
    ...
```

## File naming rules
- Folder name = course code (e.g. `SE101`, `SE202`)
- File name = `{order}-{slug}.md` where order is a 2-digit number
- Example: `01-introduction.md`, `02-variables.md`

## Frontmatter (optional, at top of each .md file)
```yaml
---
title: Variables and Data Types
type: text        # text | code | video | mixed  (default: text)
duration: 45      # minutes (default: 30)
videoUrl: https://youtube.com/embed/xxx   # optional
---
```

If no frontmatter, the title is derived from the filename and defaults apply.

## Content
Write normal Markdown. Code blocks, headings, lists, tables all work.
The content is rendered as HTML in the LMS lesson viewer.

## Example file: SE101/01-welcome.md
```markdown
---
title: Welcome to SE101
type: text
duration: 20
---

## Welcome to Introduction to Programming

This course covers core programming concepts using Python...

### What you will learn
- Variables and data types
- Control flow
- Functions
...
```

Once you've added your files, tell Kiro to "generate lesson seeds from course-content/" and it will create the migration automatically.
