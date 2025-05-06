import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"


const PageTitle: QuartzComponent = ({  displayClass }: QuartzComponentProps) => {
  const title = "Data Catalog"
  
  // Instead of using pathToRoot(fileData.slug!) which can lead to "/"
  // Use a direct link to a specific page
  return (
    <h1 class={classNames(displayClass, "page-title")}>
     <a href="/data-catalog/">{title}</a>
    </h1>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor




// import { pathToRoot } from "../util/path"
// import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// import { classNames } from "../util/lang"
// import { i18n } from "../i18n"

// const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
//   //const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
//   const title = "Data Catalog"
//   const baseDir = pathToRoot(fileData.slug!)
//   return (
//     <p class={classNames(displayClass, "page-title")}>
//       <a href={baseDir}>{title}</a>
//     </p>
//   )
// }

// PageTitle.css = `
// .page-title {
//   font-size: 1.75rem;
//   margin: 0;
//   padding: 0 0 10 0 ;
//   font-family: var(--titleFont);
// }
// `

// export default (() => PageTitle) satisfies QuartzComponentConstructor
