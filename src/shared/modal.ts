import { FieldValue, Timestamp } from "@firebase/firestore"

export interface UserDetails {
    displayName: string,
    email: string,
    accessToken: string,
}

export interface QuestionCommonField {
    email: string,
    questions: string[],
    topic: string,
    yoe: string,
    numberOfQuestions: string
}

export interface QuestionPayload extends QuestionCommonField{
    timestamp: FieldValue
}

export interface QuestionObj extends QuestionCommonField {
    id: string
    timestamp: Timestamp
}

export interface Message {
    id: number;
    text: string;
    sender: Sender;
}

export enum Sender {
    BOT,
    USER
} 

export interface Result {
    rating: number,
    summary: string
}