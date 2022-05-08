import { useState } from 'react'
import SketchPicker from 'react-color/lib/components/sketch/Sketch';

function App() {
  const [color, setColor] = useState('#1fa9f4');

  return (
    <div>
      <SketchPicker
        color={color}
        onChange={(color, event) => {
          console.log(color);
          setColor(color);       
        }}
       />
    </div>
  )
}

export default App
