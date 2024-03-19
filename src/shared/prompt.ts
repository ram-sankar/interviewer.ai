export const generateQuestionsFromTopic = (topic: string) => {
    return `Generate 5 questions for the following topic, give the output without numbers or next line or bullets, output should be continuous text with question mark separated questions: '''topic''':${topic}"`
}