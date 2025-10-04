import React, { useState } from "react";
import Tesseract from "tesseract.js";
import { Upload, FileText, Sparkles, Copy, Check, X } from "lucide-react";

const OCRUpload = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file!");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
    setText("");
    setProgress(0);
  };

  const handleExtractText = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    setText("Extracting text...");
    try {
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      setText(result.data.text);
    } catch (err) {
      console.error(err);
      setText("Failed to extract text.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl);
      setText("");
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-3xl font-bold ml-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            OCR Text Extractor
          </h2>
        </div>

        {/* Upload Section or Image Preview */}
        {!image ? (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="border-2 border-dashed border-blue-300 rounded-2xl p-12 mb-6 hover:border-blue-500 transition-all duration-300 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"
          >
            <label className="cursor-pointer flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Upload className="w-12 h-12 text-blue-600" />
              </div>
              <span className="text-gray-800 font-semibold text-lg mb-2">
                Drop an image or click to upload
              </span>
              <span className="text-gray-500 text-sm">
                Supports JPG, PNG, WEBP
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="relative bg-white border-2 border-gray-200 rounded-2xl mb-6 overflow-hidden shadow-lg group">
            <img
              src={image}
              alt="Preview"
              className="w-full h-80 object-contain rounded-xl"
              onError={(e) => {
                e.target.style.display = "none";
                alert("Image failed to load. Try another file.");
              }}
            />
            <button
              onClick={() => {
                setImage(null);
                setText("");
                setProgress(0);
              }}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {progress > 0 && progress < 100 && (
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Processing...
              </span>
              <span className="text-sm font-semibold text-indigo-600">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-500 mt-3 text-sm animate-pulse">
              Extracting text from your image...
            </p>
          </div>
        )}

        {/* Extract Button */}
        <button
          onClick={handleExtractText}
          disabled={!image}
          className={`w-full flex justify-center items-center gap-3 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg ${
            !image
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl transform hover:scale-[1.02]"
          }`}
        >
          <FileText className="w-5 h-5" />
          Extract Text
        </button>

        {/* Output */}
        {text && text !== "Extracting text..." && (
          <div className="mt-8 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                Extracted Text
              </h3>
              {text !== "Failed to extract text." && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-6 shadow-inner max-h-96 overflow-y-auto">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                {text}
              </p>
            </div>
            {text !== "Failed to extract text." && (
              <div className="mt-3 text-right">
                <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg inline-block">
                  {text.split(/\s+/).length} words · {text.length} characters
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OCRUpload;