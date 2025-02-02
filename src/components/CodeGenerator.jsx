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
  const [responseProse, setResponseProse] = useState(""); // Holds prose from API response
  const [displayCode, setDisplayCode] = useState(""); // Holds gradually typed Java code
  const [displayProse, setDisplayProse] = useState(""); // Holds gradually typed prose
  const [loading, setLoading] = useState(false);
  const proseRef = useRef(null);
  const codeRef = useRef(null);
  const parallaxRef = useRef(null);

  const API_URL = import.meta.env.VITE_GENERATE_CODE_URL;

  // Handle user input
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Fetch API response
  const fetchData = async () => {
    if (!inputText.trim()) return alert("Please enter some text!");

    setLoading(true);
    setResponseText("");
    setFormattedText("");
    setDisplayCode("");
    setResponseProse("");
    setDisplayProse("");

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

      setResponseText(data || "No response from API");
      setResponseProse(data.prose || "No response from API");
      setFormattedText(formattedCode || "No response from API");
    } catch (error) {
      setResponseText("Error generating code");
      setFormattedText("Error generating code");
      setResponseProse("Error generating prose");
      console.error("API Error:", error);
    }

    setLoading(false);
  };

  // Typing effect for displayCode (formatted Java code)
  useEffect(() => {
    if (!formattedText) return;

    let index = 0;
    setDisplayCode(formattedText.charAt(0));

    const typeCharacter = () => {
      index++;
      if (index < formattedText.length) {
        setDisplayCode((prev) => prev + formattedText.charAt(index));
        setTimeout(typeCharacter, 5);
      } else {
        // Only after displayCode completes, start typing displayProse
        startTypingProse();
      }
    };

    setTimeout(typeCharacter, 5);
  }, [formattedText]);

  // Typing effect for displayProse (prose text) - Only starts after displayCode finishes
  const startTypingProse = () => {
    if (!responseProse) return;

    let index = 0;
    setDisplayProse(responseProse.charAt(0));

    const typeCharacter = () => {
      index++;
      if (index < responseProse.length) {
        setDisplayProse((prev) => prev + responseProse.charAt(index));
        setTimeout(typeCharacter, 10);
      }
    };

    setTimeout(typeCharacter, 500); // Small delay before starting prose typing
  };

  // Auto-expand textarea as proseText is typed
  useEffect(() => {
    if (proseRef.current) {
      proseRef.current.style.height = "auto";
      proseRef.current.style.height = proseRef.current.scrollHeight + "px";
    }
  }, [displayProse]);

  // Auto-expand textarea as formattedText is typed
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.style.height = "auto";
      codeRef.current.style.height = codeRef.current.scrollHeight + "px";
    }
  }, [displayCode]);

  // Copy response to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedText)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Clipboard error:", err));
  };

  const transparentTheme = {
    ...oneDark,
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

        <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%] z-[-1]">
          <img src={heroBackground} className="w-full" width={1440} height={1800} alt="hero" />
        </div>

        <BackgroundCircles />
        <div className="w-11/12 max-w-screen-xl mx-auto p-6 rounded-xl bg-transparent relative z-10">

          <div className="w-11/12 max-w-screen-xl mx-auto p-6 rounded-xl bg-transparent relative z-10">
            <h2 className="text-2xl font-semibold mb-4">Enter Your Test Code</h2>
            <textarea
              className="w-full h-32 p-4 bg-gray-950 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 scrollbar-hide"
              placeholder="Enter text to generate code..."
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            <div className="flex justify-start">
            <Button onClick={fetchData} textAlign disabled={loading}>
              {loading ? "Generating..." : "Generate Code"}
            </Button>
            <ButtonGradient />
            </div>
          </div>

          {responseText && (
            <div>
              <div className="w-11/12 max-w-screen-xl mx-auto p-6 rounded-xl bg-transparent relative z-10">
                <div className="rounded-lg p-4 overflow-auto max-h-96 bg-gray-950 bg-opacity-50 scrollbar-hide">
                  <SyntaxHighlighter language="java" style={transparentTheme} wrapLongLines showLineNumbers>
                    {displayCode}
                  </SyntaxHighlighter>
                </div>
                <div className="flex justify-start">
                <Button onClick={copyToClipboard} disabled={!responseText}>
                  Copy to Clipboard
                </Button>
                <ButtonGradient />
                </div>
              </div>

              <div className="w-11/12 max-w-screen-xl mx-auto p-6 rounded-xl bg-transparent relative z-10">
                <textarea
                  ref={proseRef}
                  className="w-full p-4 bg-gray-950 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 scrollbar-hide resize-none"
                  value={displayProse}
                  readOnly
                  rows={1}
                  style={{ overflow: "hidden", minHeight: "2rem" }}
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
      <BottomLine />
    </Section>
  );
};

export default CodeGenerator;