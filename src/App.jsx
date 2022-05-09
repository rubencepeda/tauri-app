import { useState } from 'react'
import SketchPicker from 'react-color/lib/components/sketch/Sketch';
import { invoke } from '@tauri-apps/api/tauri'

function App() {
  const [color, setColor] = useState('#1fa9f4');
  const [gradiant, setGradiant] = useState([]);

  return (
    <>
      <SketchPicker
        color={color}
        onChange={(color, event) => {
          console.log(color);
          setColor(color);

          invoke('create_gradiant', color.rgb)
            .then((grad) => {
              setGradiant(grad);
              console.log(`grad: ${grad}`);
              console.log(`gradiant: ${gradiant[1]}`);
            })
            .catch((e) => console.error(e));
        }}
      />
      {gradiant.map((color, index) => (
      <div 
        key={index}
        style={{
          padding: '2rem',
          backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        }}
      >
        rgb({color[0]}, {color[1]}, {color[2]})
      </div>
      ))}
    </>
  )
}

export default App
