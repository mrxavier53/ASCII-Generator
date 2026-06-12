# ASCII GENERATOR

\>_ transform text into ASCII art

ASCII Generator made by **Mr Xavier**

---

## 📥 Downloads

- [Python 3.12.9 (Info Page)](https://www.python.org/downloads/release/python-3129/)
- [Windows 64-bit](https://www.python.org/ftp/python/3.12.9/python-3.12.9-amd64.exe)
- [Windows 32-bit](https://www.python.org/ftp/python/3.12.9/python-3.12.9.exe)
- [macOS (Apple Silicon/Intel)](https://www.python.org/ftp/python/3.12.9/python-3.12.9-macos11.pkg)

---

## 🚀 Quick Start

**`Run_AG.bat`** — Double click to launch

### First Run
```
> Checking administrator privileges...
> Installing dependencies (Flask, pyfiglet)...
> Creating Bat_Log/first_run.txt
> Starting ASCII Generator...
> Opening browser at http://localhost:5000
```

### Subsequent Runs
```
> Dependencies already installed (skipping)
> Starting ASCII Generator...
> Opening browser at http://localhost:5000
```

---

## 📋 Features

- ASCII art generation from any text (max 500 characters)
- 18+ different font styles for unique art
- Real-time typewriter effect with sound
- Save generated art as `.txt` file
- Copy to clipboard with one click
- Animated loading screen with matrix rain
- Black/Lime green cyberpunk theme
- Sound effects for all actions
- Character counter with visual feedback
- Responsive design for all devices
- Glitch effects and CRT scanlines
- Font selector with 18+ options

---

## 🔧 System Requirements

| Component | Requirement |
|-----------|-------------|
| OS        | Windows 7/8/10/11, Linux, macOS |
| Python    | 3.12.9 (64-bit or 32-bit) |
| RAM       | 256MB minimum |
| Browser   | Chrome, Firefox, Edge, Safari (latest) |

---

## 📦 Dependencies

- **Flask** — Web framework
- **pyfiglet** — ASCII art generator

---

## 🎮 How To Use

1. Run `Run_AG.bat` as administrator (first run only)
2. Wait for dependencies to install automatically
3. Browser will open automatically to `http://localhost:5000`
4. Enter your text (max 500 characters)
5. Select a font style (or leave as random)
6. Click GENERATE and watch the ASCII art appear
7. Save as `.txt` or copy to clipboard

---

## 🎨 Font Styles

```
standard, slant, small, cyberlarge, digital, doom, banner, big, block,
bubble, lean, mini, script, shadow, smslant, smscript, smshadow, smblock, larry3d
```

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Generate ASCII Art | Ctrl + Enter (or Cmd + Enter on Mac) |

---

## 🔊 Sound Effects

- Typing sounds for each character
- Generation success chord
- Save and copy confirmation sounds
- Error warning sounds
- Hover feedback sounds
- Boot sequence sound on first click

---

## 📁 Folder Structure

```
ascii-generator/
├── app.py
├── Run_AG.bat
├── README.md
├── README.html
├── LICENSE
├── CREDITS.md
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── downloads/
└── Bat_Log/
    └── first_run.txt
```

---

## ⚠️ Troubleshooting

**Port 5000 already in use:**
Change the port in `app.py` from 5000 to another number (e.g., 5001)

**Python not found:**
Install Python 3.12.9 and check "Add to PATH" during installation

**No sound effects:**
Click anywhere on the page first to enable audio (browser policy)

**Admin UAC prompt:**
Required for first run to install dependencies

---

## 🔄 Update Process

1. Delete the `Bat_Log` folder
2. Run `Run_AG.bat` as administrator again
3. Dependencies will reinstall with latest versions

---

## 📊 Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0 | May 2026 | Sound effects, typewriter animation, matrix rain |
| 1.0 | Initial | Basic ASCII generation, save/copy functions |

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 👤 Credits & Links

See [CREDITS.md](CREDITS.md) for author info, GitHub, and Discord links.

---

**ASCII GENERATOR v2.0** | Built with Flask & PyFiglet | Cyberpunk Edition
> _system_online
