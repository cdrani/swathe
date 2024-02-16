#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use active_win_pos_rs::get_active_window;
use image::GenericImageView;
use image::{io::Reader as ImageReader, DynamicImage};
use screenshots::Screen;
use serde::Deserialize;
use std::option::Option;
use std::path::{Path, PathBuf};

#[derive(Deserialize)]
struct Dimension {
    top: i32,
    left: i32,
    width: u32,
    height: u32,
}

async fn select_image() -> Option<PathBuf> {
    use tauri::api::dialog::blocking::FileDialogBuilder;

    FileDialogBuilder::new().pick_file()
}

fn compress_image(image: &DynamicImage, file_path: &Path, quality: u8) -> Result<(), ()> {
    let file = match std::fs::File::create(file_path) {
        Ok(file) => file,
        Err(_) => return Err(()),
    };

    let mut writer = std::io::BufWriter::new(file);

    match image.write_to(&mut writer, image::ImageOutputFormat::Jpeg(quality)) {
        Ok(_) => Ok(()),
        Err(_) => Err(()),
    }
}

fn get_aspect(image: &DynamicImage) -> f64 {
    let dimensions = image.dimensions();
    dimensions.0 as f64 / dimensions.1 as f64
}

fn write_to_tmp(image: &DynamicImage) -> Result<(String, f64), ()> {
    let temp_dir = std::env::temp_dir().join("swathe");

    if let Err(_) = std::fs::create_dir_all(&temp_dir) {
        return Err(());
    }

    let file_name = format!("{}.jpeg", uuid::Uuid::new_v4());
    let file_path = temp_dir.join(&file_name);
    let _ = compress_image(image, &file_path, 75);

    let file_path_str = match file_path.to_str() {
        Some(path_str) => path_str.to_string(),
        None => return Err(()),
    };

    let aspect = get_aspect(&image);
    Ok((file_path_str, aspect))
}

#[tauri::command(rename_all = "snake_case")]
async fn process_image(file_path: Option<&str>) -> Result<(String, f64), ()> {
    let file_path = match file_path {
        Some(path) => PathBuf::from(path),
        None => {
            if let Some(file_path) = select_image().await {
                file_path
            } else {
                return Err(());
            }
        }
    };

    if let Ok(reader) = ImageReader::open(&file_path) {
        if let Ok(image) = reader.decode() {
            return write_to_tmp(&image);
        }
    }

    Err(())
}

#[tauri::command(rename_all = "snake_case")]
fn flickr(file_path: &str, dims: Dimension) {
    match get_active_window() {
        Ok(active_window) => {
            let _x: i32 = active_window.position.x as i32;
            let _y: i32 = active_window.position.y as i32;

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

            std::fs::write(file_path, buffer).unwrap();
        }
        Err(()) => {
            println!("Error getting active window")
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![flickr, process_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
