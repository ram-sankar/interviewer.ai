export const generateQuestionsFromTopic = (topic: string, yoe: string, numberOfQuestions: string) => {
    return `Generate ${numberOfQuestions} questions for the following topic for a person with ${yoe} years of experience in react, give the output without numbers or next line or bullets, output should be continuous text with question mark separated questions: '''topic''':${topic}`
}