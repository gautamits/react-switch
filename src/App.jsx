import React from 'react';
import './App.css';

const ToggleContext = React.createContext()

function useEffectAfterMount(cb, dependencies){
  const justMounted = React.useRef(true)
  React.useEffect(()=>{
    if(!justMounted.current) return cb()
    justMounted.current = false
  }, dependencies)
}

function Toggle({isFalse, isTrue, children, onToggle}){
  const [on, setOn] = React.useState(Boolean(isFalse || isTrue))
  const toggle = React.useCallback(()=>setOn(oldOn=>!oldOn),[])
  useEffectAfterMount(()=>{
    onToggle(on)
  },[on])
  const value = React.useMemo(()=>({on, toggle}),[on])
  return <ToggleContext.Provider value={value}>
    {children}
    </ToggleContext.Provider>
}

function useToggleContext() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`,
    )
  }
  return context
}

function On({children}) {
  const {on} = useToggleContext()
  return on ? children : null
}

function Off({children}) {
  const {on} = useToggleContext()
  return on ? null : children
}

function Button(props) {
  const {on, toggle} = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}

Toggle.On = On
Toggle.Off = Off
Toggle.Button = Button


function App() {
  return (
    <div className="App">
      <Toggle onToggle={on => console.log(on)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
    </div>
  );
}

function Switch({on, onClick}){
return <label className="switch">
          <input onClick={onClick} value={on} type="checkbox"/>
          <span className="slider round"></span>
        </label>
}
export default App;
