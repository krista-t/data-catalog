import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Quartz 4",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "krista-t.github.io/data-catalog",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f8",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#284b63",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#161618",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        comments: true,
        highlight: true,
        wikilinks: true,
        callouts: true,
        mermaid: true,
        parseTags: true,
        parseArrows: true,
        parseBlockReferences: true,
        enableInHtmlEmbed: true,
        enableYouTubeEmbed: true,
        enableVideoEmbed: true,
        enableCheckbox: true,
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "relative",
        enableInHtmlEmbed: true,
        prettyLinks: true, // Add this for nicer link parsing
      }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [
      Plugin.RemoveDrafts(),
    ],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        // Add this sort function to match your Explorer component sorting
        sort: (a, b) => {
          // Define specific order for files
          const fileOrder = {
            "Data Catalog Guide": 1,
            "Data Governance through Catalogs and the Role of DCAT and DPROD Standards": 2,
            "Strategic Roadmap for Data Catalog Implementation": 3,
            "Appendix: Glossary of Terms": 666
          };
          
          // Get title from frontmatter
          const titleA = a.frontmatter?.title || "";
          const titleB = b.frontmatter?.title || "";
          
          // Get order or default to high number
          const orderA = fileOrder[titleA] || 100;
          const orderB = fileOrder[titleB] || 100;
          
          return orderA - orderB;
        }
      }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
    ],
  },
};

export default config;
