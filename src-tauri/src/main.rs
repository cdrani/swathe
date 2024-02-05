#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::write;
use serde::Deserialize;
use screenshots::Screen;
use active_win_pos_rs::get_active_window;

#[derive(Deserialize)]
struct Dimension {
    top: i32,
    left: i32,
    width: u32,
    height: u32,
}

#[tauri::command(rename_all = "snake_case")]
fn flickr(file_path: &str, dims: Dimension) {
    match get_active_window() {
        Ok(active_window) => {
            let _x: i32 = active_window.position.x as i32;
            let mut _y: i32 = active_window.position.y as i32;

            let cap = Screen::from_point(_x, _y).unwrap();

            let Dimension {
                left,
                top,
                width,
                height,
            } = dims;

            let image = cap
                .capture_area(left + _x, top + _y, width, height)
                .unwrap();

            let buffer = image.to_png(None).unwrap();

            write(file_path, buffer).unwrap();
        }
        Err(()) => {
            println!("Error getting active window")
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![flickr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
