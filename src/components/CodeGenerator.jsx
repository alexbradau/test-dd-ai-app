import { useState } from "react";

const CodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_GENERATE_CODE_URL;

  // Handle user input
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Make API call with raw text in the request body
  const fetchData = async () => {
    if (!inputText.trim()) return alert("Please enter some text!");

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain", // Sending raw text
        },
        body: inputText, // Sending input as raw text
      });
        const data = await response.json();
        console.log(data.code)
      setResponseText(data.code || "No response from API");
    } catch (error) {
      setResponseText("Error generating code");
      console.error("API Error:", error);
    }
    setLoading(false);
  };

  // Copy response to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Clipboard error:", err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 shadow-md rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Code Generator</h2>

        {/* Input Textbox */}
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Describe what code you need..."
          className="w-full p-3 border border-gray-300 rounded resize-none"
          rows="4"
        />

        {/* API Call Button */}
        <button
          onClick={fetchData}
          className="w-full mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Code"}
        </button>

        {/* Response Textbox (Uneditable) */}
        <textarea
          value={responseText}
          readOnly
          className="w-full p-3 mt-4 border border-gray-300 bg-gray-200 rounded resize-none"
          rows="4"
        />

        {/* Copy to Clipboard Button */}
        <button
          onClick={copyToClipboard}
          className="w-full mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          disabled={!responseText}
        >
          Copy Code
        </button>
      </div>
    </div>
  );
};

export default CodeGenerator;