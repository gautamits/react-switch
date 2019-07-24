import React from 'react';


const ToggleContext = React.createContext()

function useEffectAfterMount(cb, dependencies){
  const justMounted = React.useRef(true)
  React.useEffect(()=>{
    if(!justMounted.current) return cb()
    justMounted.current = false
  }, dependencies)
}

export default function Toggle({active, children, onToggle, disabled, style}){
  const [on, setOn] = React.useState(Boolean(active))
  const toggle = React.useCallback(()=>{
      if(!disabled) setOn(oldOn=>!oldOn)
    },[])
  useEffectAfterMount(()=>{
    if(onToggle && typeof onToggle === 'function' && !disabled)
      onToggle(on)
  },[on])
  const value = React.useMemo(()=>({on, toggle}),[on])
  return <ToggleContext.Provider value={value}>
    <div style={style}>
        {children}
    </div>
    </ToggleContext.Provider>
}

function useToggleContext() {
  const ctx = React.useContext(ToggleContext)
  if (!ctx) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`,
    )
  }
  return ctx
}

function On({children}) {
  const {on} = useToggleContext()
  return on ? children : null
}

function Off({children}) {
  const {on} = useToggleContext()
  return on ? null : children
}

function Button() {
  const {on, toggle} = useToggleContext()
  return <Switch on={on} onClick={toggle}/>
}

Toggle.On = On
Toggle.Off = Off
Toggle.Button = Button

function Switch({on, onClick}){
    return <label className="switch">
              <input onChange={onClick} checked={on} type="checkbox"/>
              <span className="slider round"></span>
            </label>
    }