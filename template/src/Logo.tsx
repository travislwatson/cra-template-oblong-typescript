import { React, O } from 'oblong'
import logo from './logo.svg'

const size = O.createState().withDefault('100').as('logo.size')

const scale = O.createQuery()
  .with({ size })
  .as((o) => (parseInt(o.size) || 0) / 100)

const reset = O.createCommand()
  .with({ size })
  .named('reset')
  .as((o) => {
    if (window.confirm(`The size is currently ${o.size}. Reset?`)) {
      o.size = '100'
    }
  })

export const Logo = O.createView()
  .with({ size, scale, reset })
  .as((o) => (
    <>
      <input
        type="range"
        min="1"
        max="100"
        value={o.size}
        onChange={(event) => {
          o.size = event.target.value
        }}
      />
      <button onClick={o.reset}>Reset</button>
      <div style={{ transform: `scale(${o.scale})` }}>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </>
  ))
