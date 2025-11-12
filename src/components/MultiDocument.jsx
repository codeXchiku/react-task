import React, { useCallback, useRef, useState } from "react";

const MultiDocument = ({
  accept = "*",
  maxFiles = 20,
  maxSizeBytes = 20 * 1024 * 1024,
  onSubmit,
}) =>{
  const [files, setFiles] = useState([]); 
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const makeId = () => Math.random().toString(36).slice(2, 9);

  const addFiles = useCallback(
    (selectedFiles) => {
      setError("");
      const arr = Array.from(selectedFiles);
      if (!arr.length) return;

      
      const tooMany = files.length + arr.length > maxFiles;
      if (tooMany) {
        setError(`Maximum ${maxFiles} files allowed.`);
        return;
      }

      const validated = [];
      for (const f of arr) {
        if (f.size > maxSizeBytes) {
          setError((e) => e + `\n${f.name} is larger than ${Math.round(maxSizeBytes / 1024 / 1024)}MB.`);
          continue;
        }
        
        validated.push({ file: f, id: makeId(), preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : null });
      }

      if (validated.length) setFiles((s) => [...s, ...validated]);
    },
    [files.length, maxFiles, maxSizeBytes]
  );

  const onInputChange = (e) => {
    addFiles(e.target.files);
    e.target.value = null; 
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer?.files) addFiles(e.dataTransfer.files);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragActive(false);
  };

  const removeFile = (id) => {
    setFiles((s) => {
      const found = s.find((it) => it.id === id);
      if (found && found.preview) URL.revokeObjectURL(found.preview);
      return s.filter((it) => it.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    setFiles([]);
    setError("");
  };

  const handleSubmit = async () => {
    if (!files.length) {
      setError("Add at least one file before submitting.");
      return;
    }
    try {
      const payload = files.map((f) => f.file);
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        
        console.log("Submitting files:", payload);
        alert(`Submitting ${payload.length} files (check console).`);
      }
    } catch (err) {
      console.error(err);
      setError("Submission failed. Check console.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Upload files</label>

      
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          dragActive ? "border-indigo-400 bg-indigo-50" : "border-gray-200 bg-white"
        }`}
      >
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V8a4 4 0 114 4h6" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 20h18" />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Drag & drop files here, or</p>

          <div className="mt-3 flex items-center gap-3 justify-center">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Select files
            </button>

            <span className="text-xs text-gray-500">{files.length}/{maxFiles} selected</span>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple
            onChange={onInputChange}
            className="hidden"
            aria-hidden="true"
          />
        </div>
      </div>

      
      {error && (
        <div className="mt-3 text-sm text-red-600 whitespace-pre-line" role="status">
          {error}
        </div>
      )}

     
      <div className="mt-4">
        <div className="space-y-3">
          {files.map((f) => (
            <div key={f.id} className="flex items-center gap-3 p-3 border rounded-md bg-gray-50">
              <div className="flex items-center gap-3 flex-1">
               
                <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-white border">
                  {f.preview ? (
                    <img src={f.preview} alt={f.file.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">{f.file.type || 'FILE'}</div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{f.file.name}</div>
                  <div className="text-xs text-gray-500">{(f.file.size / 1024).toFixed(0)} KB • {f.file.type || '—'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => removeFile(f.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {files.length === 0 && (
            <div className="text-sm text-gray-500">No files selected yet.</div>
          )}
        </div>
      </div>

     
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={clearAll}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200"
        >
          Clear
        </button>

        
        <div className="ml-auto text-xs text-gray-400">Max per file: {Math.round(maxSizeBytes / 1024 / 1024)}MB</div>
      </div>
    </div>
  );
}

export default MultiDocument
