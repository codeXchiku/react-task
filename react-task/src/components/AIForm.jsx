import { useState } from "react";
import axios from "axios";

const AIForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [aiResponse, setAiResponse] = useState(null);

    const handleChange = (e) => {
        const{name,value} = e.target
        setForm(
            { 
            ...form,
            [name]:value
            }
        );
    };

    const validate = async () => {
        const res = await axios.post("http://localhost:5000/validate-form", form);
        setAiResponse(res.data);
    };

    const applySuggestions = () => {
        setForm({ ...form, ...aiResponse.suggestions });
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-4">AI Form Validator</h1>

            {["name", "email", "phone", "address"].map((field) => (
                <input
                    key={field}
                    className="border p-2 w-full my-2 rounded"
                    placeholder={field.toUpperCase()}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                />
            ))}

            <button
                onClick={validate}
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
            >
                Validate with AI
            </button>

            {aiResponse && (
                <div className="mt-4 p-4 border rounded">
                    <h2 className="font-semibold">AI Suggestions</h2>
                    <pre className="text-sm">{JSON.stringify(aiResponse, null, 2)}</pre>

                    <button
                        onClick={applySuggestions}
                        className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
                    >
                        Apply Suggested Fixes
                    </button>
                </div>
            )}
        </div>
    );
}

export default AIForm;
