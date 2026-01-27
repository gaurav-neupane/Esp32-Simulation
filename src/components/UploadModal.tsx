

interface UploadModalProps {
  onClose: () => void;
  onImageSelect: (file: File) => void; // send the image back to App.tsx
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onImageSelect }) => {


  // -----------------------------
  // FILE UPLOAD
  // -----------------------------
  const openFilePicker = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = () => {
    const file = input.files?.[0];
    if (file) {
      onImageSelect(file); // <-- send FILE, not base64
      onClose();
    }
  };

  input.click();
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

        <div className="flex flex-col gap-3">

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
