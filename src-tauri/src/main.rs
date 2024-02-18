#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Deserialize;
use std::fs::File;
use std::option::Option;
use std::path::{Path, PathBuf};
use tauri::api::dialog::blocking::FileDialogBuilder;
use xcap::{
    image::{io::Reader as ImageReader, DynamicImage, GenericImageView, ImageOutputFormat},
    Window,
};

#[derive(Deserialize)]
struct CropDimension {
    top: u32,
    left: u32,
    width: u32,
    height: u32,
}

async fn select_image() -> Option<PathBuf> {
    FileDialogBuilder::new().pick_file()
}

fn create_file<P: AsRef<Path>>(file_path: P) -> Result<File, ()> {
    match File::create(&file_path) {
        Ok(file) => Ok(file),
        Err(_) => Err(()),
    }
}

fn compress_image(image: &DynamicImage, file_path: &Path) -> Result<(), ()> {
    let file = match create_file(&file_path) {
        Ok(file) => file,
        Err(_) => return Err(()),
    };

    let mut writer = std::io::BufWriter::new(file);

    match image.write_to(&mut writer, ImageOutputFormat::Png) {
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
    let _ = compress_image(image, &file_path);

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
fn flickr(file_path: &str, dims: CropDimension) {
    let CropDimension {
        left,
        top,
        width,
        height,
    } = dims;

    let windows = Window::all().unwrap();

    for window in windows {
        if window.app_name() != "swathe" {
            continue;
        }

        let y_offset: u32 = match window.y() < 0 {
            true => 0,
            false => window.y() as u32,
        };

        let image = window.capture_image().unwrap();
        let dimage = DynamicImage::from(image).crop(left, top + y_offset, width, height);

        let path = Path::new(file_path);
        let _ = compress_image(&dimage, &path);
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![flickr, process_image])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
