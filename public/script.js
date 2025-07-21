const chatBox = document.getElementById("chat");
const input = document.getElementById("input");

function appendMessage(role, text) {
    const div = document.createElement("div");
    div.className = `msg ${role}`;

    div.innerHTML = marked.parse(text);

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && input.value.trim()) {
        const userMessage = input.value.trim();
        appendMessage("user", userMessage);
        input.value = "";

        console.log("Enviando para backend:", userMessage);

        try {
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            console.log("Resposta do backend:", data);
            appendMessage("bot", data.response);
        } catch (error) {
            appendMessage("bot", "❌ Erro ao se comunicar com o servidor.");
        }
    }
});
