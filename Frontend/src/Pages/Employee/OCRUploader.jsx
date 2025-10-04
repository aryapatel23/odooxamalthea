// // src/components/OCRUploader.jsx
// import React, { useState } from "react";
// import Tesseract from "tesseract.js";

// const OCRUploader = () => {
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleUpload = () => {
//     if (!image) return;
//     setLoading(true);
//     Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) })
//       .then(({ data: { text } }) => setText(text))
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//           OCR Upload
//         </h2>

//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />

//         {image && (
//           <div className="mb-4">
//             <img
//               src={image}
//               alt="Uploaded Preview"
//               className="w-full h-48 object-cover rounded-lg shadow-sm"
//             />
//           </div>
//         )}

//         <button
//           onClick={handleUpload}
//           className={`w-full text-white font-semibold py-2 rounded-lg transition-colors duration-200 ${
//             loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Upload & Extract Text"}
//         </button>

//         {text && (
//           <div className="bg-gray-50 p-4 mt-6 rounded-lg border border-gray-200 shadow-inner">
//             <h3 className="font-semibold mb-2 text-gray-700">Extracted Text:</h3>
//             <p className="text-gray-600 whitespace-pre-line">{text}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OCRUploader;
// src/components/OCRUploader.jsx
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OCRUploader = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setText(""); // clear previous text when new file is uploaded
  };

  const handleUpload = () => {
    if (!image) return;
    setLoading(true);
    setText(""); // clear previous text while processing
    Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => setText(text))
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          OCR Upload
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {image && (
          <div className="mb-4">
            <img
              src={image}
              alt="Uploaded Preview"
              className="w-full h-48 object-cover rounded-lg shadow-sm"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className={`w-full flex justify-center items-center gap-2 text-white font-semibold py-2 rounded-lg transition-colors duration-200 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          )}
          {loading ? "Processing..." : "Upload & Extract Text"}
        </button>

        {loading && (
          <p className="text-center text-gray-500 mt-4">Extracting text, please wait...</p>
        )}

        {text && !loading && (
          <div className="bg-gray-50 p-4 mt-6 rounded-lg border border-gray-200 shadow-inner">
            <h3 className="font-semibold mb-2 text-gray-700">Extracted Text:</h3>
            <p className="text-gray-600 whitespace-pre-line">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OCRUploader;
