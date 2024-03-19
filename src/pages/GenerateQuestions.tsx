import { useFormik } from "formik";
import { Navbar } from "../components/Navbar";
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import "./styles.css"
import { getResponseFromPrompt } from "../api/gemini";
import { generateQuestionsFromTopic } from "../shared/prompt";
import { numQuestionsList, yoeList } from "../shared/constants";

export const GenerateQuestions = () => {
    const [topic, setTopic] = useState("Java Script")
    const [yoe, setYoe] = useState(yoeList[0])
    const [numberOfQuestions, setNumQuestions] = useState(numQuestionsList[0])
    const [step, setStep] = useState(1)
    const [questions, setQuestions] = useState<string[]>([])


    const generateQuestionsList = async () => {
        const updatedPrompt = generateQuestionsFromTopic(topic, yoe, numberOfQuestions)
        const questionsResponse = await getResponseFromPrompt(updatedPrompt)
        const quesList = questionsResponse.split(/[?.]/)
        setQuestions(quesList?.filter(ques => ques?.length > 10))
        setStep(2)
    }

    const handleSubmit = () => {
        const payload = {
            user: 1,
            questions,
            topic,
            yoe,
            numberOfQuestions
        }
        console.log(payload)
    }

    const RenderForm = () => {
        return <>
            <div className="fields">
                <TextField 
                    id="topic" label="Topic" variant="standard" className="w-100"
                    value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>

            <div className="fields">
                <InputLabel>YOE</InputLabel>
                <Select
                    value={yoe}
                    fullWidth
                    label="YOE"
                    onChange={(e) => setYoe(e.target.value)}
                >
                    {yoeList.map(yoe => <MenuItem key={yoe} value={yoe}>{yoe}</MenuItem>)}
                </Select>
            </div>

            <div className="fields">
                <InputLabel>No. of Questions</InputLabel>
                <Select
                    value={numberOfQuestions}
                    fullWidth
                    label="No. of Questions"
                    onChange={(e) => setNumQuestions(e.target.value)}
                >
                    {numQuestionsList.map(numQues => <MenuItem key={numQues} value={numQues}>{numQues}</MenuItem>)}
                </Select>
            </div>
            <div className="questionButtonContainer">
                <Button variant="contained" className="proceedBtn" onClick={generateQuestionsList}>Proceed</Button>
            </div>
        </>
    }

    const RenderGeneratedQuestions = () => {
        return <>
            <h3>Generated Questions</h3>
            {
                questions.map((ques, index) => <div key={ques}>
                    <div className="question">
                        {`${index+1}. ${ques}?`}
                    </div>
                </div>)
            }
            <div className="questionButtonContainer">
                <Button className="quesBtn" variant="contained" onClick={generateQuestionsList}>Re Generate Questions</Button>
                <Button className="quesBtn" variant="contained" onClick={handleSubmit}>Looks Good! Create Test</Button>
            </div>
        </>
    }

    return (
        <>
            <Navbar />
            <div className="questionWrapper">
                <h1 className="mb-4">You can Generate Questions here</h1>
                <div className="questionsBox">
                    {step === 1 && RenderForm()}
                    {step === 2 && RenderGeneratedQuestions()}
                </div>
            </div>
        </>
)};