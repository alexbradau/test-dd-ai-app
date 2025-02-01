import { heroBackground } from "../assets";
import Section from "./Section";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import ButtonGradient from "../assets/svg/ButtonGradient";

const CodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [displayText, setDisplayText] = useState(""); // Holds gradually typed text
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_GENERATE_CODE_URL;
  const parallaxRef = useRef(null);

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
          "Content-Type": "text/plain",
        },
        body: inputText,
      });
      const data = await response.json();
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
    <Section
      className="pt-[12rem] -mt-[5.25rem] relative"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative text-center" ref={parallaxRef}>

        {/* Background Image Positioned Between Section & Content */}
        <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%] z-[-1]">
          <img
            src={heroBackground}
            className="w-full"
            width={1440}
            height={1800}
            alt="hero"
          />
        </div>

        <BackgroundCircles />
        <div className="rounded-lg p-6 bg-transparent shadow-lg max-w-2xl mx-auto relative z-10">
        {/* Input Text Area */}
        <div className="w-full max-w-2xl mx-auto p-6  shadow-lg rounded-xl relative z-10">          
          <h2 className="text-2xl font-semibold mb-4">Enter Your Test Code</h2>
          <textarea
            className="w-full h-32 p-4 bg-gray-950 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 scrollbar-hide"
            placeholder="Enter text to generate code..."
            value={inputText}
            onChange={handleInputChange}
          ></textarea>

          {/* Generate Button */}
          <Button
            onClick={fetchData}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Code"}
          </Button>
          <ButtonGradient />
        </div>

        {/* Response Box */}
        {responseText && (
          <div className="w-full max-w-2xl mx-auto mt-6 p-6 shadow-lg rounded-xl relative z-10">
            <h2 className="text-2xl font-semibold mb-4">Generated Code</h2>
            <textarea
              className="w-full h-40 p-4 rounded-lg bg-gray-950 bg-opacity-50 focus:outline-none scrollbar-hide text-white"
              value={responseText}
              readOnly
            ></textarea>

            {/* Copy Button */}
            <Button
              onClick={copyToClipboard}
              disabled={!responseText}>
              Copy to Clipboard
            </Button>
            <ButtonGradient />
          </div>
        )}
      </div>
      </div>

      <BottomLine />
    </Section>
  );
};

export default CodeGenerator;