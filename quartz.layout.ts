import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer(
    
  ),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta({
      lastModified: true,
                          
                 
     
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      sortFn: (a, b) => {
        // Define specific order for files
        const fileOrder = {
          "Data Catalog Guide": 1,
          "Data Governance through Catalogs": 2,
          "Strategic Roadmap for Data Catalog Implementation": 3,
          "Appendix: Glossary of Terms": 666  // Using your numbering scheme
        };
        
        // Order values for items
        const orderA = a.isFolder ? a.order : (fileOrder[a.displayName] || 100);
        const orderB = b.isFolder ? b.order : (fileOrder[b.displayName] || 100);
        
        // Sort by order
        if (orderA !== orderB) {
          return orderA - orderB;
        }
        
        // If same order, sort alphabetically
        return a.displayName.localeCompare(b.displayName, undefined, {
          numeric: true,
          sensitivity: "base"
        });
      }
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.1,
        repelForce: 0.5,
        centerForce: 0.3,
        linkDistance: 70,        // Increase this to space nodes further apart
        fontSize: 2,           // Increase this significantly from default (0.6)
        opacityScale: 1,
        showTags: true,
        removeTags: [],
        enableRadial: false,
        focusOnHover: true,
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 1.5,
        repelForce: 3.0,
        centerForce: 0.5,
        linkDistance: 150,
        fontSize: 5,
        opacityScale: 5,
        removeTags: [],
        showTags: true,
        focusOnHover: false,
        enableRadial: true,       
      }, 
    }),
    
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
