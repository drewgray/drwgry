# drwgry.com

Personal portfolio website for Drew Gray.

## Structure

```
drwgry/
├── index.html      # Main website (particle animation, links)
├── resume.tex      # LaTeX source for resume
├── resume.pdf      # Compiled resume
├── CNAME           # Custom domain: drwgry.com
└── README.md
```

## Resume

The resume is written in LaTeX using Source Sans Pro font.

### Compiling

```bash
pdflatex -interaction=nonstopmode resume.tex
```

### Dependencies

Requires `texlive-latex-base`, `texlive-latex-extra`, and `texlive-fonts-extra`:

```bash
sudo apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-extra
```

### Design Notes

- 10pt Source Sans Pro (clean sans-serif)
- Muted color palette: slate blue headings, gray accents
- Single page layout
- Sections: Profile, Experience, Core Competencies, Education

## Deployment

GitHub Pages serves the site automatically from the `master` branch.

- Domain: https://drwgry.com
- Push to `master` to deploy changes

## Notes

- Keep resume to 1 page
- Compile PDF before committing resume changes
- Auxiliary files (`.aux`, `.log`, `.out`) are not tracked
