import { useState } from "react";
import { Eye, EyeOff, Copy, Edit, Trash2, LogOut } from "lucide-react";

export default function PasswordManager() {
  const [passwords, setPasswords] = useState([]);
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    alert("Logged out successfully!");
  };

  const handleAddPassword = () => {
    if (!website || !username || !password) return;
    setPasswords([...passwords, { website, username, password }]);
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  const handleDelete = (index) => {
    setPasswords(passwords.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    const item = passwords[index];
    setWebsite(item.website);
    setUsername(item.username);
    setPassword(item.password);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    const updatedPasswords = [...passwords];
    updatedPasswords[editingIndex] = { website, username, password };
    setPasswords(updatedPasswords);
    setWebsite("");
    setUsername("");
    setPassword("");
    setEditingIndex(null);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const toggleShowPassword = (index) => {
    setShowPasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl flex justify-between items-center bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">🔑 Password Manager</h1>
        {token && (
          <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 transition">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Add / Save Button */}
        {editingIndex === null ? (
          <button
            onClick={handleAddPassword}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            ➕ Add Password
          </button>
        ) : (
          <button
            onClick={handleSaveEdit}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            ✅ Save Changes
          </button>
        )}
      </div>

      <div className="mt-6 w-full max-w-lg">
        {passwords.length === 0 ? (
          <p className="text-gray-500 text-center">No passwords saved yet.</p>
        ) : (
          passwords.map((item, index) => (
            <div key={index} className="bg-white shadow-sm p-4 mb-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-semibold">{item.website}</p>
                <p className="text-sm text-gray-500">{item.username}</p>
                <p className="text-sm">{showPasswords[index] ? item.password : "••••••••"}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleCopy(item.password)} className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"><Copy className="h-5 w-5 text-gray-600" /></button>
                <button onClick={() => toggleShowPassword(index)} className="p-1 bg-gray-200 rounded-md hover:bg-gray-300">{showPasswords[index] ? <EyeOff className="h-5 w-5 text-gray-600" /> : <Eye className="h-5 w-5 text-gray-600" />}</button>
                <button onClick={() => handleEdit(index)} className="p-1 bg-blue-200 rounded-md hover:bg-blue-300"><Edit className="h-5 w-5 text-blue-600" /></button>
                <button onClick={() => handleDelete(index)} className="p-1 bg-red-200 rounded-md hover:bg-red-300"><Trash2 className="h-5 w-5 text-red-600" /></button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
