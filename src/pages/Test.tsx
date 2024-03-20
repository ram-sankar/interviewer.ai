import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Navbar } from "../components/Navbar";
import "./styles.css"
import { db } from "../api/firebase";
import { ERROR, INDICES } from "../shared/constants";
import { doc, getDoc } from "@firebase/firestore";
import { Message, QuestionObj, Result, Sender } from "../shared/modal";
import { generatePromptFromSummary, generateQuestionsFromAnswer } from "../shared/prompt";
import { getResponseFromPrompt } from "../api/gemini";
import { getFormattedJson } from "../shared/helper";
import ReactMarkdown from 'react-markdown';


export const Test = () => {
    const params = useParams()  

    const [testDetails, setTestDetails] = useState<QuestionObj|null>(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I'm your AI interviewer, Please answer the following questions.", sender: Sender.BOT },
    ]);
    const [result, setResult] = useState<Result[]>([])
    const [currentMark, setCurrentMark] = useState<string>("")
    const [newMessage, setNewMessage] = useState('');
    const [finalSummary, setFinalSummary] = useState<string>(ERROR.NO_SUMMARY)
    
    useEffect(() => {
        // getRating()
        getDocumentByTestId()
    }, [])

    useEffect(() => {
        addNewQuestion();
    }, [result])

    const getDocumentByTestId = async () => {
        const docRef = doc(db, INDICES.QUESTIONS, params?.testID || "");
        try {
            const documentSnapshot = await getDoc(docRef);
            if (documentSnapshot.exists()) {
                const documentData: any = documentSnapshot.data();
                setTestDetails(documentData)
                addNewQuestion(documentData)
            } else {
                console.log("Document does not exist!");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    const generateReport = async () => {
        const summaryPrompt = generatePromptFromSummary(result, testDetails?.topic || "")
        let questionsResponse: string = ERROR.NO_SUMMARY;
        if (summaryPrompt !== ERROR.NO_SUMMARY) {
            questionsResponse = await getResponseFromPrompt(summaryPrompt)
        }
        setFinalSummary(questionsResponse)
        setIsCompleted(true)
    }

    const addNewQuestion = (details = testDetails) => {
        if (details?.questions?.length && currentQuestionIndex === details?.questions?.length) {
            generateReport()
            return
        }
        const currentQuestion = details?.questions?.[currentQuestionIndex] || ""
        addMessageToList(currentQuestion, Sender.BOT)
        setCurrentQuestionIndex(currentQuestionIndex+1)
    }

    const getRating = async (question: string = "", answer: string = "") => {

        // question = "Tell me about some of the complex task you have worked on AWS"
        // answer = "I worked on a feature in which I needed to send a notification to the user. So, I had to work on EventBridge and define rules in the EventBridge, and every day in the morning, I knew that rule would trigger a Lambda job. So, I needed to set up a Lambda job and configure it accordingly to receive the props from the EventBridge. Once the Lambda function spins up, it runs multiple queries to the database, fetches the data, and determines to whom I need to send the email. Then, I'll be drafting an email and using the SNS service to send the email to the user."
        const updatedPrompt = generateQuestionsFromAnswer(question, answer)
        const questionsResponse = await getResponseFromPrompt(updatedPrompt)
        const markJson = getFormattedJson(questionsResponse)
        const res: Result = {
            rating: markJson.mark || 0,
            summary: markJson.summary || ERROR.NO_SUMMARY
        }
        setCurrentMark(`Question ${currentQuestionIndex}. mark: ${res.rating}/5, review: ${res.summary}`)
        setResult((result) => [...result, res])
    }

    const addMessageToList = (text: string, sender: Sender) => {
        if (text.trim() === '') return;
        const newId = messages.length + 1;
        const newMessageObj: Message = { id: newId, text, sender };
        setMessages([...messages, newMessageObj]);
        setNewMessage('');
    }
    
    const handleMessageSubmit = async (e: any) => {
        e.preventDefault();
        if (messages?.at(-1)?.sender === Sender.BOT) {
            addMessageToList(newMessage, Sender.USER)
            await getRating(messages?.at(-1)?.text || "-", newMessage || "-")
        }
    };

    const calculateAverageRating = (): number => {
        if (result.length === 0) return 0;
      
        const sumOfRatings = result.reduce((total, res) => total + res.rating, 0);
        const averageRating = sumOfRatings / result.length;
        
        return averageRating;
      };

    const RenderTest = () => {
        return (
            <div className="app">
                <div className="chat-container">
                    <div className="chat-messages">
                    {messages.map(message => (
                        <div key={message.id} className={message.sender === Sender.BOT ? "botMessage" : "userMessage"}>
                        {message.text}
                        </div>
                    ))}
                    <div className="currentReview">
                        {currentMark}
                    </div>
                    </div>
                    <form onSubmit={handleMessageSubmit} className="message-form">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="message-input"
                    />
                    <button type="submit" className="send-button">
                        Send
                    </button>
                    </form>
                </div>
            </div>
          );
    }

    const RenderReport = () => {
        return (
            <div className="summaryWrapper">
                <div className="questionsBox">
                    <h3>Overall Interview Performance</h3>
                    <b>Score: <span>{calculateAverageRating()}/5</span></b><br/>
                    <b>Performance Summary:</b>
                    <ReactMarkdown>{finalSummary}</ReactMarkdown>
                </div>
            </div>
        )
    }

    return (
    <div>
        <Navbar />
        {isCompleted ? RenderReport() : RenderTest()}
    </div>
)};