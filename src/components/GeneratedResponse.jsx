import { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "./Button";
import ButtonGradient from "../assets/svg/ButtonGradient";

const GeneratedResponse = ({ responseText, formattedText, responseProse }) => {
  const [displayCode, setDisplayCode] = useState("");
  const [displayProse, setDisplayProse] = useState("");
  const proseRef = useRef(null);
  const codeRef = useRef(null);

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
    <>
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
    </>
  );
};

export default GeneratedResponse;