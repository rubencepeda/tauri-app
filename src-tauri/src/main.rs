#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use palette::Srgb;
use palette::Lch;
use palette::FromColor;

#[tauri::command]
fn create_gradiant(r: u8, g: u8, b: u8) -> Vec<Vec<u8>> {  
  let my_rgb = Srgb::new(
    r as f32 / 255.0,
    g as f32 / 255.0,
    b as f32 / 255.0
  );

  let my_lch = Lch::from_color(my_rgb.into_linear());

  let gradiant = palette::Gradient::new(vec![
    Lch::new(0.0, my_lch.chroma, my_lch.hue),
    my_lch,
    Lch::new(128.0, my_lch.chroma, my_lch.hue),
  ]);
  let colors = gradiant
    .take(10)
    .map(|color| {
      let (r,g,b) = Srgb::from_color(color).into_components();
      vec![
        (r * 255.0) as u8,
        (g * 255.0) as u8,
        (b * 255.0) as u8
      ]
    })
    .collect::<Vec<_>>();
    return colors;  
}

fn main() {
  tauri::Builder::default()    
    .invoke_handler(tauri::generate_handler![
      create_gradiant
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
