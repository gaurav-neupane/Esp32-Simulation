import { useEffect, useRef } from "react";

interface UploadModalProps {
  onClose: () => void;
  onImageSelect: (image: string) => void; // send the image back to App.tsx
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onImageSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // -----------------------------
  // FILE UPLOAD
  // -----------------------------
  const openFilePicker = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const imageURL = reader.result?.toString();
        if (imageURL) {
          onImageSelect(imageURL); // send image to App.tsx
          onClose(); // close modal
        }
      };
      reader.readAsDataURL(file);
    };

    input.click();
  };

  // -----------------------------
  // CAMERA START
  // -----------------------------
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      alert("Camera access denied");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // -----------------------------
  // CAPTURE FROM CAMERA
  // -----------------------------
  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);

    const image = canvas.toDataURL("image/png");

    onImageSelect(image); // send to parent
    onClose(); // close modal
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-80 p-6 rounded-xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Choose an Option
        </h2>

        {/* Camera preview */}
        <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg mb-4" />

        <div className="flex flex-col gap-3">
          <button
            onClick={captureImage}
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Capture From Camera
          </button>

          <button
            onClick={openFilePicker}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Upload From Device
          </button>

          <button
            onClick={onClose}
            className="bg-gray-300 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
