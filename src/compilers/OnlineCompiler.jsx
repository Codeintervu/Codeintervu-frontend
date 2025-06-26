import React, { useState } from "react";
import axios from "axios";

const languageMap = {
  java: {
    id: 62,
    name: "Java",
    boilerplate:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  },
  python: { id: 71, name: "Python", boilerplate: "print('Hello, World!')" },
  javascript: {
    id: 63,
    name: "JavaScript",
    boilerplate: "console.log('Hello, World!');",
  },
  c: {
    id: 50,
    name: "C",
    boilerplate:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  },
  cpp: {
    id: 54,
    name: "C++",
    boilerplate:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!\\n";\n    return 0;\n}',
  },
};

const RAPIDAPI_KEY = "be6766c2cdmsh1014f6bba39facap1eb9c0jsne168ae4664f9";

const OnlineCompiler = ({ language }) => {
  const lang = languageMap[language];
  const [code, setCode] = useState(lang.boilerplate);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const payload = {
        source_code: code,
        language_id: lang.id,
      };
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
      setOutput(
        res.data.stdout ||
          res.data.stderr ||
          res.data.compile_output ||
          "No output"
      );
    } catch (err) {
      setError(
        "Error: " +
          (err.response?.data?.message ||
            JSON.stringify(err.response?.data) ||
            err.message)
      );
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Left: Code Editor */}
      <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow-md flex flex-col">
        <div className="flex items-center mb-2 gap-2">
          <button
            onClick={handleRun}
            className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Running..." : "Run"}
          </button>
        </div>
        <label className="block font-bold mb-2 text-gray-800 dark:text-white text-left">
          {lang.name} Code:
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;
              setCode(code.substring(0, start) + "\t" + code.substring(end));
              setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 1;
              }, 0);
            }
          }}
          className="w-full font-mono bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded mb-2 border border-gray-300 dark:border-gray-700 flex-1 min-h-[300px]"
          rows={16}
        />
      </div>
      {/* Right: Output */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-md flex flex-col">
        <label className="block font-bold mb-2 text-gray-800 dark:text-white text-left">
          Output:
        </label>
        <div className="flex-1 min-h-[300px] bg-black rounded p-4 text-green-400 overflow-x-auto whitespace-pre-wrap">
          {output ? (
            output
          ) : (
            <span className="text-gray-500">Output will appear here.</span>
          )}
        </div>
        {error && (
          <div className="mt-4 text-red-500 font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
};

export default OnlineCompiler;
