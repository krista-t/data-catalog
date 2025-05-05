import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
  <p>
    {i18n(cfg.locale).components.footer.createdWith}{" "}
    <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year} | Content © 2024 by Kristina Tomicic <a class="mymail" href="mailto:info@krista-t.com">info@krista-t.com</a>
  </p>
  <p>Licensed under CC BY 4.0 | When sharing, please provide attribution to Kristina Tomicic</p>
  <br />
  <ul>
    {Object.entries(links).map(([text, link]) => (
      <li>
        <a href={link}>{text}</a>
      </li>
    ))}
  </ul>
</footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
