import React from 'react'
import { createRoot } from 'react-dom/client'

import { Theme } from '../../System'
import Button, { BUTTON_KINDS } from './Button'

const mount = document.getElementById('root')

if (!mount) {
  throw new Error('MDX Preview: missing #root element')
}

createRoot(mount).render(
  <Theme>
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {BUTTON_KINDS.map(kind => (
          <Button key={kind} kind={kind} onClick={() => {}}>
            {kind}
          </Button>
        ))}
      </div>
    </div>
  </Theme>,
)
