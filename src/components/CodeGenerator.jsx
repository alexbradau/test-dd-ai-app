import { heroBackground } from "../assets";
import Section from "./Section";
import { BackgroundCircles, BottomLine } from "./design/Hero";
import { useState } from "react";
import Button from "./Button";
import ButtonGradient from "../assets/svg/ButtonGradient";
import prettier from "prettier/standalone";
import javaPlugin from "prettier-plugin-java";
import GeneratedResponse from "./GeneratedResponse";

const CodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [responseProse, setResponseProse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_GENERATE_CODE_URL;

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const fetchData = async () => {
    if (!inputText.trim()) return alert("Please enter some text!");

    setLoading(true);
    setResponseText("");
    setFormattedText("");
    setResponseProse("");

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

  return (
    <Section className="pt-[12rem] -mt-[5.25rem] relative" crosses crossesOffset="lg:translate-y-[5.25rem]" customPaddings id="hero">
      <div className="container relative text-center">

        <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%] z-[-1]">
          <img src={heroBackground} className="w-full" width={1440} height={1800} alt="hero" />
        </div>

        <BackgroundCircles />
        <div className="w-11/12 max-w-screen-xl mx-auto p-6 rounded-xl bg-transparent relative z-10">
          <div className="w-11/12 max-w-screen-xl mx-auto p-6 rounded-xl bg-transparent relative z-10">
            {/* Input Box - Same Width as Response */}
            <textarea
              className="w-full p-4 bg-gray-950 bg-opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 scrollbar-hide"
              placeholder="Enter text to generate code..."
              value={inputText}
              onChange={handleInputChange}
            ></textarea>

            <div className="flex justify-start">
              <Button onClick={fetchData} disabled={loading}>
                {loading ? "Generating..." : "Generate Code"}
              </Button>
              <ButtonGradient />
            </div>
          </div>

          <GeneratedResponse responseText={responseText} formattedText={formattedText} responseProse={responseProse} />
        </div>
      </div>
      <BottomLine />
    </Section>
  );
};

export default CodeGenerator;