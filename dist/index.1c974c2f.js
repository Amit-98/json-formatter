document.addEventListener("DOMContentLoaded", ()=>{
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const beautifyBtn = document.getElementById("beautify");
    const minifyBtn = document.getElementById("minify");
    const formatBtn = document.getElementById("format");
    const uploadBtn = document.getElementById("upload");
    function beautifyJSON(json) {
        return JSON.stringify(json, null, 4);
    }
    function minifyJSON(json) {
        return JSON.stringify(json);
    }
    function formatJSON(json) {
        let formatted = "";
        let indent = 0;
        let isInString = false;
        for(let i = 0; i < json.length; i++){
            let char = json.charAt(i);
            if (char === '"' && json.charAt(i - 1) !== "\\") isInString = !isInString;
            if (!isInString) {
                if (char === "{" || char === "[") formatted += char + "\n" + " ".repeat(++indent * 2);
                else if (char === "}" || char === "]") formatted += "\n" + " ".repeat(--indent * 2) + char;
                else if (char === ",") formatted += char + "\n" + " ".repeat(indent * 2);
                else if (char === ":") formatted += char + " ";
                else formatted += char;
            } else formatted += char;
        }
        return formatted;
    }
    function processJSON(action) {
        try {
            const jsonObject = JSON.parse(input.value);
            switch(action){
                case "beautify":
                    output.value = beautifyJSON(jsonObject);
                    break;
                case "minify":
                    output.value = minifyJSON(jsonObject);
                    break;
                case "format":
                    output.value = formatJSON(input.value);
                    break;
            }
        } catch (error) {
            output.value = "Invalid JSON: " + error.message;
        }
    }
    beautifyBtn.addEventListener("click", ()=>processJSON("beautify"));
    minifyBtn.addEventListener("click", ()=>processJSON("minify"));
    formatBtn.addEventListener("click", ()=>processJSON("format"));
    uploadBtn.addEventListener("change", (event)=>{
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e)=>{
                input.value = e.target.result;
                processJSON("beautify");
            };
            reader.readAsText(file);
        }
    });
    // Add copy to clipboard functionality
    output.addEventListener("click", ()=>{
        output.select();
        document.execCommand("copy");
        alert("Copied to clipboard!");
    });
});

//# sourceMappingURL=index.1c974c2f.js.map
