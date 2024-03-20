import { GenerateContentRequest, GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || "");

export async function getResponseFromPrompt(prompt: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const text = result?.response?.text();
        return text || ""
    } catch (e) {
        console.log(e);
        return ""
    }
}