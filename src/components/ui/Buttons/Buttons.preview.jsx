import { createRoot } from 'react-dom/client'

import ButtonsPreview from './ButtonsPreview'

const mount = document.getElementById('root')

if (!mount) {
  throw new Error('MDX Preview: missing #root element')
}

createRoot(mount).render(<ButtonsPreview />)
