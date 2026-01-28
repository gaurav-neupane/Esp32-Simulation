# 🧠 TinyML ESP32 Image Classification Simulation

This project simulates an edge-to-cloud TinyML pipeline. The ESP32 stays in standby mode until triggered by a physical button. Once activated, it "captures" an image, sends it to a TinyML backend endpoint for inference, and displays the resulting classification on an I2C OLED screen.

---

## 🛠 Installation & Setup

Follow these steps to get the simulation and backend environment running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/gaurav-neupane/Esp32-Simulation.git
cd tinyml-esp32-sim

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Backend API

Open your configuration file (e.g., `src/config.js` or the ESP32 sketch) and update the fetch URL to point to your TinyML inference server:

```javascript
// Replace with your actual backend IP or localhost
const BACKEND_API = "http://localhost:5000/predict";

```

### 4. Run Development Server

```bash
npm run dev

```



