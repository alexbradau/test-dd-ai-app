import { heroBackground } from "../assets";
import Section from "./Section";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import ButtonGradient from "../assets/svg/ButtonGradient";
import prettier from "prettier/standalone";
import javaPlugin from "prettier-plugin-java";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [formattedText, setFormattedText] = useState(""); // Holds formatted Java code
  const [displayText, setDisplayText] = useState(""); // Holds gradually typed text
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);

  const API_URL = import.meta.env.VITE_GENERATE_CODE_URL;
  const parallaxRef = useRef(null);

  // Handle user input
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Fetch API response
  const fetchData = async () => {
    if (!inputText.trim()) return alert("Please enter some text!");

    setLoading(true);
    setResponseText(""); // Reset response text
    setFormattedText(""); // Reset formatted text
    setDisplayText(""); // Reset display text

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: inputText,
      });
      const data = await response.json();
      const formattedCode = await prettier.format(data.code || "No response from API", {
        parser: "java",
        plugins: [javaPlugin],
      });
      setResponseText(data.code || "No response from API"); // Store full response
      setFormattedText(formattedCode || "No response from API"); // Store formatted code
    } catch (error) {
      setResponseText("Error generating code");
      setFormattedText("Error generating code");
      console.error("API Error:", error);
    }
    setLoading(false);
  };

  // Typing effect: gradually updates displayText
  useEffect(() => {
    if (!responseText) return;

    let index = 0;
    setDisplayText(formattedText.charAt(0)); // Immediately show the first character

    const typeCharacter = () => {
      index++;
      if (index < formattedText.length) {
        setDisplayText((prev) => prev + formattedText.charAt(index)); // Append character
        setTimeout(typeCharacter, 10); // Continue typing effect
      }
    };

    setTimeout(typeCharacter, 10); // Start typing effect after first character

  }, [formattedText]); // Runs when responseText updates

  // Auto-expand textarea as text is typed
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"; // Adjust height
    }
  }, [displayText]); // Runs whenever displayText updates

  // Copy response to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(responseText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Clipboard error:", err));
  };

  const transparentTheme = {
    ...oneDark, // Keep syntax colors
    'pre[class*="language-"]': {
      background: "none !important",
      backgroundColor: "transparent !important",
      boxShadow: "none",
      border: "none",
      padding: "0",
      margin: "0",
      textAlign: "left",
    },
    'code[class*="language-"]': {
      background: "none !important",
      backgroundColor: "transparent !important",
      padding: "0",
      boxShadow: "none",
      border: "none",
      textAlign: "left",
    },
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
          <div className="w-full max-w-2xl mx-auto p-6 shadow-lg rounded-xl relative z-10">
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

              {/* Syntax Highlighted Java Code with Fully Transparent Background */}
              <div className="rounded-lg p-4 overflow-auto max-h-96 bg-gray-950 bg-opacity-50 scrollbar-hide">
                <SyntaxHighlighter
                  language="java"
                  style={transparentTheme} // Fully Transparent Theme
                  wrapLongLines
                  showLineNumbers
                >
                  {displayText}
                </SyntaxHighlighter>
              </div>
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