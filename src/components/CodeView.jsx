import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';

const MultiCodeViewer = () => {
    const [code1, setCode1] = useState('// Code for File 1\nconsole.log("Hello from File 1!");');
    const [code2, setCode2] = useState('// Code for File 2\nfunction greet() { return "Hello from File 2!"; }');

    const handleEditorChange1 = (value, event) => {
        setCode1(value);
    };

    const handleEditorChange2 = (value, event) => {
        setCode2(value);
    };

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
                <h3>File 1 (JavaScript)</h3>
                <Editor
                    height="400px"
                    language="javascript"
                    value={code1}
                    onChange={handleEditorChange1}
                    theme="vs-dark"
                />
            </div>
            <div style={{ flex: 1 }}>
                <h3>File 2 (Python)</h3>
                <Editor
                    height="400px"
                    language="python"
                    value={code2}
                    onChange={handleEditorChange2}
                    theme="vs-dark"
                />
            </div>
        </div>
    );
};

export default MultiCodeViewer;