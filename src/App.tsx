import { useState } from "react"
import Esp32 from "./assets/Screenshot 2026-01-27 010252.png"
import UploadModal from "./components/UploadModal"

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null);
  const [bootText, setBootText] = useState<string>("000000xxxxxxx0000x");

  const handleImageUpload = async (file: File) => {
  setImage(file);

  const bootMessages = [
    "Initializing...",
    "Connecting to sensors...",
    "Loading firmware...",
    "Preparing image data...",
    "Processing image..."
  ];

  let index = 0;
  setBootText(bootMessages[index]);

  // Run boot messages with interval
  await new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      index++;
      if (index < bootMessages.length) {
        setBootText(bootMessages[index]);
      } else {
        clearInterval(interval);
        resolve(); // continue after boot finishes
      }
    }, 600); // speed of boot messages
  });
    
    
  const formData = new FormData();
  formData.append("image", file);

  // --- After boot finishes, call backend ---
  try {
    const response = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    });

    const data = await response.json();
    setBootText(data.result || "Done.");

  } catch (error) {
    console.error(error);
    setBootText("Error: Backend not responding.");
  }
};

  return (
    <div className="flex justify-center items-center relative h-screen max-h-screen bg-[#333333]">
      <button className="    absolute left-19 top-69 h-15 w-15 z-10 rounded-4xl 
    bg-red-800 text-white 
    shadow-lg 
    active:scale-90 active:shadow-md active:bg-red-500 
    transition-all"
      onClick={()=>setOpen(true)}
      >Push</button>
      <div className={`absolute h-48 top-53 left-166 w-138 z-20 p-8 font-mono text-lg rounded-md transition-all duration-300 ${image?"bg-green-400":"bg-green-800"}`}>{bootText}</div>
      {open && <UploadModal onClose={() => setOpen(false)} onImageSelect={(img) =>  handleImageUpload(img)} />}
      <img src={Esp32} />
    </div>
  )
}

export default App
