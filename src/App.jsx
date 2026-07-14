import { useState, useRef, useCallback, useEffect } from "react";

function App() {
  let [length, setLength] = useState(8);
  let [charAllowed, setCharAllowed] = useState(false);
  let [numAllowed, setNumAllowed] = useState(false);
  let [password, setPassword] = useState("");

  let passwordRef = useRef(null);

  const copyToClipBoard = () => {
    passwordRef?.current.select();
    window.navigator.clipboard.writeText(passwordRef.current.value);
  };

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (charAllowed) str += "!@#$%^&*()_+";
    if (numAllowed) str += "0123456789";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, charAllowed, numAllowed, setPassword]);

  useEffect(() => {
    PasswordGenerator();
  }, [PasswordGenerator]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-8">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            🔐 Password Generator
          </h1>

          {/* Password Field */}
          <div className="flex rounded-xl overflow-hidden border border-gray-600 mb-6">
            <input
              type="text"
              placeholder="Generated Password"
              className="flex-1 bg-gray-900 text-orange-400 text-lg px-4 py-3 outline-none"
              readOnly
              value={password}
              ref={passwordRef}
            />

            <button
              onClick={copyToClipBoard}
              className="bg-blue-600 hover:bg-blue-700 px-6 text-white font-semibold transition duration-200"
            >
              Copy
            </button>
          </div>

          {/* Length */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Password Length</span>
              <span className="text-orange-400 font-semibold">{length}</span>
            </div>

            <input
              type="range"
              min="6"
              max="100"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 rounded-xl p-4 cursor-pointer transition">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                onClick={(e) => setNumAllowed(!numAllowed)}
                className="w-5 h-5 accent-orange-500"
              />
              <span className="text-white">Include Numbers</span>
            </label>

            <label className="flex items-center gap-3 bg-gray-900 hover:bg-gray-700 rounded-xl p-4 cursor-pointer transition">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onClick={(e) => setCharAllowed(!charAllowed)}
                className="w-5 h-5 accent-orange-500"
              />
              <span className="text-white">Include Symbols</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
