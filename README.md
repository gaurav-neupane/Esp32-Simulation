# 🧠 TinyML ESP32 Image Classification Simulation

This project simulates an edge-to-cloud TinyML pipeline. The ESP32 stays in standby mode until triggered by a physical button. Once activated, it "captures" an image, sends it to a TinyML backend endpoint for inference, and displays the resulting classification on an I2C OLED screen.

---

## 🛠 Installation & Setup

Follow these steps to get the simulation and backend environment running locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/tinyml-esp32-sim.git](https://github.com/your-username/tinyml-esp32-sim.git)
cd tinyml-esp32-sim