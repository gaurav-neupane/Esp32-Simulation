import { useState } from "react"
import Esp32 from "./assets/Screenshot 2026-01-27 010252.png"
import UploadModal from "./components/UploadModal"

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null);
  const [bootText, setBootText] = useState<string>("BOOT UP");

  const handleImageUpload = async (file: File) => {
  setImage(file);

  const bootMessages = [
    "Initializing...",
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
    }, 1500); // speed of boot messages
  });
    
    
  const formData = new FormData();
  formData.append("file", file);

  // --- After boot finishes, call backend ---
  try {
    const response = await fetch("http://localhost:5000/process", {
      method: "POST",
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
    <div className="flex flex-col justify-center items-center gap-10 h-screen max-h-screen bg-[#333333]">
      <h1 className="text-4xl text-white font-serif">Esp32 Simulation</h1>
      {open && <UploadModal onClose={() => setOpen(false)} onImageSelect={(img) =>  handleImageUpload(img)} />}
      <div className="relative">
         <button className="    absolute left-[5.6%] top-[38.5%] aspect-square w-[5%] z-10 rounded-4xl
    bg-red-800 text-white text-[1.3vw]
    shadow-lg 
    active:scale-90 active:shadow-md active:bg-red-500 
    transition-all"
      onClick={()=>setOpen(true)}
        >Push</button>
          <div className={`absolute top-[26%] left-[52%] w-[44%] h-[38%] z-20 p-[2%] font-mono text-[2vw] rounded-md transition-all duration-300 ${image?"bg-green-400":"bg-green-800"}`}>{bootText}</div>
        <img src={Esp32}/>
      </div>
    </div>
  )
}

export default App
