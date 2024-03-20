import { useFormik } from "formik";
import { Navbar } from "../components/Navbar";
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles.css"
import { getResponseFromPrompt } from "../api/gemini";
import { generateQuestionsFromTopic } from "../shared/prompt";
import { INDICES, numQuestionsList, yoeList } from "../shared/constants";
import { db } from "../api/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { QuestionObj, QuestionPayload } from "../shared/modal";
import { getLoggedInUserDetails } from "../shared/helper";
import { useNavigate } from "react-router";

export const GenerateQuestions = () => {
    const [topic, setTopic] = useState("Java Script")
    const [yoe, setYoe] = useState(yoeList[0])
    const [numberOfQuestions, setNumQuestions] = useState(numQuestionsList[0])
    const [step, setStep] = useState(1)
    const [questions, setQuestions] = useState<string[]>([])
    const navigate=useNavigate();

    const generateQuestionsList = async () => {
        const updatedPrompt = generateQuestionsFromTopic(topic, yoe, numberOfQuestions)
        const questionsResponse = await getResponseFromPrompt(updatedPrompt)
        const quesList = questionsResponse.split(/[?.]/)
        setQuestions(quesList?.filter(ques => ques?.length > 10))
        setStep(2)
    }

    const handleSubmit = async () => {

        const userDetails = getLoggedInUserDetails()

        const payload: QuestionPayload = {
            email: userDetails.email,
            questions,
            topic,
            yoe,
            numberOfQuestions,
            timestamp: serverTimestamp()
        }

        const docRef = await addDoc(collection(db, INDICES.QUESTIONS), payload);
        console.log("Document written with ID: ", docRef.id);
        navigate("/");
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