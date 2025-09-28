import { useCallback, useState, useEffect, useRef } from "react";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";
import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  // Generate password
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (symbolAllowed) str += "!@#$5&*()_-+";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, symbolAllowed, generatePassword]);

  const passwordRef = useRef(null);
  // Copy to clipboard
  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    passwordRef.current.select();
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-200 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-6 space-y-6">
        {/* Title */}
        <h1 className="text-gray-400 text-center text-2xl tracking-wider">
          Password Generator
        </h1>

        {/* Password Box */}
        <div className="flex items-center justify-between bg-gray-800 rounded-md px-3 py-3">
          <input
            type="text"
            ref={passwordRef}
            value={password}
            readOnly
            className="text-xl font-mono tracking-wide text-gray-100 bg-transparent outline-none w-full"
          />
          <button
            className="text-blue-400 hover:text-blue-300"
            onClick={handleCopy}
          >
            {copied ? (
              <FaCheckCircle size={22} className="text-blue-400" />
            ) : (
              <FaRegCopy size={22} />
            )}
          </button>
        </div>

        {/* Character Length */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm tracking-wide">Character Length</label>
            <span className="text-blue-400 font-bold">{length}</span>
          </div>
          <input
            type="range"
            min={8}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full accent-blue-400 cursor-pointer"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={numberAllowed}
              className="accent-blue-400"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            Include Numbers
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={symbolAllowed}
              onChange={() => setSymbolAllowed((prev) => !prev)}
              className="accent-blue-400"
            />
            Include Symbols
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-blue-400 hover:bg-blue-500 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2"
        >
          Generate <span className="font-bold">→</span>
        </button>
      </div>
    </div>
  );
}

export default App;
