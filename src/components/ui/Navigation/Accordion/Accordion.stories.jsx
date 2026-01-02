
import Accordion, { AccordionItem } from './Accordion'

export default {
  title: 'Navigation/Accordion',
  component: Accordion,
}

export function Basic() {
  return (
    <Accordion>
      <AccordionItem title="First item">First panel content</AccordionItem>
      <AccordionItem title="Second item">Second panel content</AccordionItem>
    </Accordion>
  )
}

export function WithOneOpen() {
  return (
    <Accordion>
      <AccordionItem title="Open by default" open>
        This item starts open.
      </AccordionItem>
      <AccordionItem title="Closed by default">This item starts closed.</AccordionItem>
    </Accordion>
  )
}

export function Disabled() {
  return (
    <Accordion disabled>
      <AccordionItem title="First item">First panel content</AccordionItem>
      <AccordionItem title="Second item">Second panel content</AccordionItem>
    </Accordion>
  )
}

export function Ordered() {
  return (
    <Accordion ordered>
      <AccordionItem title="First item">First panel content</AccordionItem>
      <AccordionItem title="Second item">Second panel content</AccordionItem>
      <AccordionItem title="Third item">Third panel content</AccordionItem>
    </Accordion>
  )
}
