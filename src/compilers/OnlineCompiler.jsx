import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";

// Judge0 API configuration
const JUDGE0_BASE_URL = "https://judge0-ce.p.rapidapi.com";
const RAPIDAPI_KEY =
  import.meta.env.VITE_RAPIDAPI_KEY ||
  "be6766c2cdmsh1014f6bba39facap1eb9c0jsne168ae4664f9";

const languageMap = {
  java: {
    id: 62,
    name: "Java",
    monacoLang: "java",
    boilerplate:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  },
  python: {
    id: 71,
    name: "Python",
    monacoLang: "python",
    boilerplate: "print('Hello, World!')",
  },
  javascript: {
    id: 63,
    name: "JavaScript",
    monacoLang: "javascript",
    boilerplate: "console.log('Hello, World!');",
  },
  c: {
    id: 50,
    name: "C",
    monacoLang: "c",
    boilerplate:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  },
  cpp: {
    id: 54,
    name: "C++",
    monacoLang: "cpp",
    boilerplate:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!\\n";\n    return 0;\n}',
  },
  csharp: {
    id: 51,
    name: "C#",
    monacoLang: "csharp",
    boilerplate:
      'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  },
  fsharp: {
    id: 87,
    name: "F#",
    monacoLang: "fsharp",
    boilerplate: 'printfn "Hello, World!"',
  },
  nim: {
    id: 78,
    name: "Nim",
    monacoLang: "nim",
    boilerplate: 'echo "Hello, World!"',
  },
};

const OnlineCompiler = ({ language }) => {
  const lang = languageMap[language];
  const { isDarkMode } = useTheme();
  const [code, setCode] = useState(lang.boilerplate);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fontSize, setFontSize] = useState(18);
  const [executionStatus, setExecutionStatus] = useState("");
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [executionTime, setExecutionTime] = useState("");
  const [memoryUsed, setMemoryUsed] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const editorRef = useRef(null);
  const outputRef = useRef(null);

  // Test API connection on component mount
  useEffect(() => {
    testJudge0Connection();
  }, []);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.updateOptions({
      fontSize: fontSize,
      fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
      lineHeight: 1.5,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: "on",
      lineNumbers: "on",
      folding: true,
      bracketPairColorization: { enabled: true },
      guides: {
        bracketPairs: true,
        indentation: true,
      },
      padding: { top: 16, bottom: 16 },
      renderLineHighlight: "all",
      cursorBlinking: "smooth",
      cursorSmoothCaretAnimation: "on",
    });
  };

  const handleEditorChange = (value) => {
    setCode(value);
    const inputKeywords = [
      "Scanner",
      "System.in",
      "next()",
      "nextInt()",
      "nextLine()",
      "readLine()",
      "input()",
      "gets()",
      "scanf",
      "cin",
      "getline",
    ];
    const needsInput = inputKeywords.some((keyword) => value.includes(keyword));
    setShowInput(needsInput);
  };

  const clearOutput = () => {
    setOutput("");
    setError("");
    setExecutionStatus("");
    setInput("");
    setShowInput(false);
    setExecutionTime("");
    setMemoryUsed("");
  };

  const handleInputSubmit = async () => {
    if (!input.trim()) return;
    await executeCode(input.trim() + "\n");
  };

  const executeCode = async (customInput = null) => {
    if (isExecuting) return;

    setIsExecuting(true);
    setLoading(true);
    setError("");
    setExecutionStatus("");
    setExecutionTime("");
    setMemoryUsed("");

    try {
      const languageId = lang.id;
      let finalCode = code;

      // For Java, ensure the class is named Main
      if (language === "java") {
        const classMatch = code.match(/class\s+([A-Za-z_][A-Za-z0-9_]*)/);
        if (classMatch) {
          const className = classMatch[1];
          if (className !== "Main") {
            finalCode = code
              .replace(
                new RegExp(`class\\s+${className}\\b`, "g"),
                "class Main"
              )
              .replace(new RegExp(`\\b${className}\\b`, "g"), "Main");
          }
        }
      }

      const submissionData = {
        source_code: finalCode,
        language_id: languageId,
        stdin: customInput || input || "",
        expected_output: null,
        cpu_time_limit: 15,
        memory_limit: 512000,
        enable_network: false,
      };

      if (import.meta.env.DEV) {
        console.log("Submitting to Judge0:", submissionData);
      }

      // Submit code to Judge0
      const response = await axios.post(
        `${JUDGE0_BASE_URL}/submissions`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          timeout: 15000,
        }
      );

      const { token } = response.data;
      if (import.meta.env.DEV) {
        console.log("Code submitted successfully. Token:", token);
      }

      // Wait for result
      let result = null;
      let attempts = 0;
      const maxAttempts = 30;

      while (attempts < maxAttempts) {
        try {
          const statusResponse = await axios.get(
            `${JUDGE0_BASE_URL}/submissions/${token}`,
            {
              headers: {
                "X-RapidAPI-Key": RAPIDAPI_KEY,
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
              },
              timeout: 5000,
            }
          );

          const submission = statusResponse.data;
          if (import.meta.env.DEV) {
            console.log(
              `Status check ${attempts + 1}: ${
                submission.status?.description || "Unknown"
              }`
            );
          }

          if (submission.status && submission.status.id > 2) {
            result = {
              status: submission.status.description,
              stdout: submission.stdout || "",
              stderr: submission.stderr || "",
              compile_output: submission.compile_output || "",
              time: submission.time,
              memory: submission.memory,
              exit_code: submission.exit_code,
              message: submission.message || "",
            };
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 1000));
          attempts++;
        } catch (error) {
          if (import.meta.env.DEV) {
            console.error("Error checking submission status:", error.message);
          }
          break;
        }
      }

      if (!result) {
        throw new Error("Execution timeout");
      }

      // Handle specific error cases
      if (result.status === "Internal Error") {
        throw new Error("Judge0 internal error");
      }

      // Determine success
      const success =
        result.status === "Accepted" &&
        !result.stderr &&
        !result.compile_output;

      if (success) {
        setOutput(result.stdout || "No output");
        setExecutionStatus("✓ Execution completed successfully");
        setError("");
      } else {
        setOutput("");
        setError(result.stderr || result.compile_output || "Execution failed");
        setExecutionStatus("✗ Execution failed");
      }

      setExecutionTime(result.time ? `${result.time}s` : "N/A");
      setMemoryUsed(result.memory ? `${result.memory}KB` : "N/A");

      // Auto-scroll to bottom of output
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Frontend execution error:", err);
      }
      const errorMessage =
        err.response?.data?.error || err.message || "Unknown error occurred";

      setError(`Error: ${errorMessage}`);
      setExecutionStatus("✗ Execution failed");
      setOutput("");
      setExecutionTime("N/A");
      setMemoryUsed("N/A");
    } finally {
      setLoading(false);
      setIsExecuting(false);
    }
  };

  // Test Judge0 API connection
  const testJudge0Connection = async () => {
    try {
      const response = await axios.get(`${JUDGE0_BASE_URL}/languages`, {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        timeout: 10000,
      });
      if (import.meta.env.DEV) {
        console.log(
          "✅ Judge0 API connection successful, languages:",
          response.data.length
        );
      }
      return true;
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("❌ Judge0 API connection failed:", error.message);
      }
      return false;
    }
  };

  const handleRun = async () => {
    if (showInput && !input.trim()) {
      setOutput(
        "Enter your input values below and click 'Submit Input' to run the program.\n$ "
      );
      setError("");
      setExecutionStatus("");
      setLoading(false);
      return;
    }
    await executeCode();
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        fontSize: fontSize,
      });
    }
  }, [fontSize]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header with language name centered */}
      <div className="w-full flex justify-center">
        {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {lang.name} Compiler
        </h2> */}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Code Editor Panel */}
        <div className="w-full lg:w-1/2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label className="block font-semibold text-gray-800 dark:text-white text-left">
              {lang.name} Code
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Font:
              </span>
              <button
                onClick={() => setFontSize((prev) => Math.max(12, prev - 1))}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="text-sm font-mono text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize((prev) => Math.min(24, prev + 1))}
                className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Increase font size"
              >
                A+
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[500px] rounded border border-gray-300 dark:border-gray-600 overflow-hidden bg-white dark:bg-gray-900">
            <Editor
              height="500px"
              language={lang.monacoLang}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme={isDarkMode ? "vs-dark" : "vs"}
              options={{
                fontSize: fontSize,
                fontFamily:
                  "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
                lineHeight: 1.5,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: "on",
                lineNumbers: "on",
                folding: true,
                bracketPairColorization: { enabled: true },
                guides: {
                  bracketPairs: true,
                  indentation: true,
                },
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: "all",
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
              }}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-full lg:w-1/2 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label className="block font-semibold text-gray-800 dark:text-white text-left">
              Output
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={clearOutput}
                className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title="Clear output"
              >
                Clear
              </button>
              <button
                onClick={handleRun}
                disabled={loading || isExecuting}
                className="px-6 py-2 bg-blue-600 text-white rounded font-semibold transition duration-200 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading || isExecuting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Running...
                  </>
                ) : (
                  "Run"
                )}
              </button>
            </div>
          </div>

          {/* Output Terminal */}
          <div
            ref={outputRef}
            className="flex-1 min-h-[500px] bg-black rounded p-4 text-green-400 overflow-y-auto font-mono text-sm"
          >
            {output || error ? (
              <>
                {/* Execution Info */}
                {(executionTime || memoryUsed) && (
                  <div className="text-gray-500 text-xs mb-2 border-b border-gray-700 pb-2">
                    {executionTime && <span>Time: {executionTime}</span>}
                    {executionTime && memoryUsed && (
                      <span className="mx-2">|</span>
                    )}
                    {memoryUsed && <span>Memory: {memoryUsed}</span>}
                  </div>
                )}

                {/* Output Content */}
                {output && (
                  <div className="text-green-300 whitespace-pre-wrap mb-2">
                    {output}
                  </div>
                )}

                {/* Error Content */}
                {error && (
                  <div className="text-red-400 whitespace-pre-wrap mb-2">
                    {error}
                  </div>
                )}

                {/* Interactive Input Panel */}
                {showInput && output.includes("$") && (
                  <div className="mt-3 border-t border-gray-700 pt-3">
                    <div className="flex items-start">
                      <span className="text-green-400 mr-2 mt-1">$ </span>
                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 bg-transparent text-green-300 border-none outline-none font-mono resize-none"
                        placeholder="Enter input values..."
                        rows={3}
                        autoFocus
                      />
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Enter each value on a separate line
                      </div>
                      <button
                        onClick={handleInputSubmit}
                        disabled={loading || isExecuting || !input.trim()}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Input
                      </button>
                    </div>
                  </div>
                )}

                {/* Execution Status */}
                {executionStatus && (
                  <div
                    className={`mt-3 font-semibold text-sm ${
                      executionStatus.includes("successfully")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {executionStatus}
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-500 text-center mt-8">
                <div className="text-4xl mb-2">▶</div>
                <div>Click "Run" to execute your code</div>
                <div className="text-xs mt-1">Output will appear here</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineCompiler;
