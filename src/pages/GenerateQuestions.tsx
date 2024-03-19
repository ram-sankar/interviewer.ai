import { useFormik } from "formik";
import { Navbar } from "../components/Navbar";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import "./styles.css"
import { getResponseFromPrompt } from "../api/gemini";
import { generateQuestionsFromTopic } from "../shared/prompt";

export const GenerateQuestions = () => {
    const [topic, setTopic] = useState("Java Script")
    const [step, setStep] = useState(1)
    const [questions, setQuestions] = useState<string[]>([])


    const generateQuestionsList = async () => {
        const updatedPrompt = generateQuestionsFromTopic(topic)
        const questionsResponse = await getResponseFromPrompt(updatedPrompt)
        const quesList = questionsResponse.split(/[?.]/)
        setQuestions(quesList?.filter(ques => ques?.length > 10))
        setStep(2)
    }
    
    const handleGenerateQuestion = () => {
            generateQuestionsList()
    }

    const RenderGeneratedQuestions = () => {
        return <>
            {
                questions.map((ques, index) => <div key={index}>
                    {`${index+1}. ${ques}`}
                </div>)
            }
            <Button variant="contained" onClick={handleGenerateQuestion}>Re Generate</Button>
        </>
    }

    return (
        <>
            <Navbar />
            <div className="questionWrapper">
                <h1 className="mb-4">You can Generate Questions here</h1>
                <div className="questionsBox">
                    {step === 1 && <>
                        <label htmlFor="topic" className="fields">Enter a topic in which you want to generate questions</label>
                        <TextField 
                            id="topic" label="Topic" variant="standard" className="fields"
                            value={topic} onChange={(e) => setTopic(e.target.value)} />
                        <Button variant="contained" onClick={handleGenerateQuestion}>Proceed</Button>
                    </>}
                    {step === 2 && <>
                        {RenderGeneratedQuestions()}
                    </>}
                </div>
            </div>
        </>
)};