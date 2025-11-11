# 🚗 RAGE:MP Vehicle Browser

A lightweight, client-side **vehicle browser** built with pure JavaScript — no frameworks, no dependencies.  
It dynamically fetches data from the official [DurtyFree GTA V data dumps](https://github.com/DurtyFree/gta-v-data-dumps) repository and displays vehicle images from [FiveM Docs](https://docs.fivem.net/vehicles/).

This project was created for developers and RAGEMP enthusiasts who want a fast and visual way to explore available GTA V vehicle models.

---

## ✨ Features

- **Dynamic Fetching:** Automatically pulls the latest vehicle data from GitHub.  
- **Lazy Loading:** Vehicles load only when visible on screen (powered by `IntersectionObserver`).  
- **Local Caching:** Data is stored in `localStorage` for instant reloading after the first visit.  
- **Optimized Grid Layout:** Responsive grid with smooth scroll and clean dark-themed design.  
- **Error Handling:** Skips missing or invalid vehicle images automatically.  

---

## 🧠 How It Works

1. On page load, the script fetches vehicle data (`vehicles.json`) from the [DurtyFree data dump](https://github.com/DurtyFree/gta-v-data-dumps).  
2. It filters out models without available images (a few known exceptions).  
3. Each vehicle gets its own visual card with a background image pulled from the FiveM Docs CDN.  
4. Lazy loading ensures that only vehicles visible in the viewport are fetched.  
5. All fetched data is cached locally for lightning-fast reloads.

---
## Current version of Project
 - Currently project is in early development because i started working on it from yesterday.
 - In further version on project i'll add native RAGE:MP functions for spawning vehicle and getting more details about what we selected.
 - Not every vehicle is avaliable (As u can see in notExistedVehicleImages array) 'cause i don't seen graphics for it on FiveM page. But don't worry - I have a few ideas to fix it.
 - I'll improve inputbar mechanics for searching what we want.

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Whitee303/veh-search-ragemp.git
   cd veh-search-ragemp
