# ViperQB Face Recognition Biometric Manager

Made by the **ViperQB Team**

## Overview
ViperQB is a modern, browser-based biometric manager for KYC and identity verification. It supports unlimited face images per person, live camera liveness checks, document (PDF) matching, and robust person management—all running locally in your browser with high performance and privacy.

---

## Features
- **Unlimited Images per Person:** Add as many face images as needed for each profile.
- **Live Camera Capture & Liveness Detection:** Anti-spoofing via head pose (left, right, up, down) with auto-capture and storage.
- **Face Matching:** Upload images or PDFs (ID cards) to match against registered persons.
- **PDF Document Support:** Extract faces from scanned documents for matching.
- **IndexedDB Storage:** All data is stored locally in your browser for privacy and speed.
- **Export/Import:** Backup and restore your biometric database as JSON.
- **Modern Futuristic UI:** Neon theme inspired by the ViperQB logo, with responsive design.

---

## Quick Start

1. **Install Node.js** (if not already installed):
   - [Download Node.js](https://nodejs.org/)

2. **Run a Local HTTP Server:**
   - Open a terminal in the project folder.
   - Run:
     ```powershell
     npx http-server -p 8000
     ```
   - Or use Python:
     ```powershell
     python -m http.server 8000
     ```

3. **Open the App:**
   - Go to [http://localhost:8000](http://localhost:8000) in your browser (Firefox recommended for best camera support).

---

## Architecture

- **Frontend:** Single-page app (`index.html`) with all logic, UI, and storage.
- **Face Recognition:** Uses [face-api.js](https://github.com/justadudewhohacks/face-api.js) for detection, landmarks, and matching.
- **PDF Processing:** Integrates [PDF.js](https://mozilla.github.io/pdf.js/) to render and extract faces from documents.
- **Database:** Uses IndexedDB via a custom `BiometricDB` class for persons and faces.
- **Liveness Detection:** Head pose estimation via facial landmarks, with auto-capture for each challenge.
- **UI:** Tailwind CSS + custom neon theme, Orbitron font, and responsive layouts.

---

## Usage Guide

### Adding a Person
- Click **Add Person** in the Person Management section.
- Enter name and (optionally) description.
- Add face images via drag & drop or camera live capture.

### Live Camera & Liveness
- Click **Live Capture** on a person card.
- Follow on-screen liveness instructions (turn head left, right, up, down).
- Images are auto-captured and saved to the profile.

### Face Matching
- Go to **Face Matching**.
- Upload an image or PDF (ID card).
- The app will detect faces and show matching results with confidence scores.

### Export/Import
- Use **Export** to download your database as JSON.
- Use **Import** to restore or merge data.

---

## Troubleshooting
- **Camera Not Working:** Use Firefox or ensure you are on `localhost` (Chrome may block camera on some setups).
- **Models Not Loading:** Ensure all files in the `model/` folder are present and accessible.
- **PDF Matching Issues:** Use high-quality scans for best results.
- **Storage Limits:** IndexedDB is local; exporting regularly is recommended for backup.

---

## Credits
- Built by the ViperQB Team
- Powered by face-api.js, PDF.js, and Tailwind CSS

---

## License
MIT License

- A webcam for face recognition
- At least 2GB of RAM
- Sufficient storage for local data management

## 🔑 Key Features

- **Client-Side Processing**: All data processing occurs directly in your browser, keeping your information secure.
- **Privacy-Focused**: No data is sent to external servers; everything remains on your device.
- **Offline Functionality**: The application can be used without an internet connection, providing full access to its features.
- **User-Friendly Interface**: Designed for ease of use, even for those without technical expertise.
- **Face Recognition Technology**: Utilize advanced algorithms to recognize and manage biometric profiles efficiently.
- **JSON Data Export**: Easily export your data in JSON format for backup or analysis.

## 📝 How to Use

Once you've opened the application, you can:

- **Enroll a New Profile**: Click on "Enroll New Face". Follow the prompts to capture your face and fill in any required information.
  
- **Manage Existing Profiles**: View, edit, or delete profiles using the provided options in the interface.
  
- **Export Your Data**: Click on the "Export" option to download your profiles in a secure format.

## 🤔 Troubleshooting

If you experience issues, consider the following:

- Ensure your webcam is working correctly.
- Check if your browser settings allow for camera access and local storage.
- Clear your browser cache if the application does not load correctly.
- Restart your browser if the application is unresponsive.

## 💬 Support

For further assistance, feel free to reach out through the GitHub repository. You can create a new issue for any questions or problems you encounter.

Or Contact : 

Najb.Yassine@gmail.com
Oussahm@gmail.com