import type { SectionProps } from "./types";
import { ButtonUI } from "../Button";

export const SectionUI =(props: SectionProps) => {
const {img, title, content, buttonContent} = props

return (
  <section>
    <img src={img}></img>
    <h2>{title}</h2>
    <p>{content}</p>
    <ButtonUI children={`${buttonContent}`} />
  </section>
)
}