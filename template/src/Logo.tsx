import { React, O } from 'oblong'
import logo from './logo.svg'

const size = O.state('logo.size').as('100')

const scale = O.query()
  .with({ size })
  .as((o) => (parseInt(o.size) || 0) / 100)

const reset = O.command('reset')
  .with({ size })
  .as((o) => {
    if (window.confirm(`The size is currently ${o.size}. Reset?`)) {
      o.size = '100'
    }
  })

export const Logo = O.view('Logo')
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
