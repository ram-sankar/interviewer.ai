import { ERROR } from "./constants"
import { Result } from "./modal"

export const generateQuestionsFromTopic = (topic: string, yoe: string, numberOfQuestions: string) => {
    return `Generate ${numberOfQuestions} questions for the following topic for a person with ${yoe} years of experience in react, give the output without numbers or next line or bullets, output should be continuous text with question mark separated questions: '''topic''':${topic}`
}

export const generateQuestionsFromAnswer = (question: string, answer: string) => {
    return `For the given question and answer of a candidate, give mark from 0 to 5. Also give a 1 line summary about the performance of the candidate 'Question': ${question}. 'Answer': ${answer}. Give the response as json string with the following keys: mark, summary`
}

export const generatePromptFromSummary = (result: Result[], topic: string) => {
    let text = result.map(res => res.summary)
    if (!text.length) {
        return ERROR.NO_SUMMARY
    }
    return `Following is the interview performance of a candidate from ${topic} interview. Performance for each question is listed in the performance array. Give me the short overall summary in markdown format about the interview and candidate's understanding. '''performance''': ${text.toLocaleString()}`
}