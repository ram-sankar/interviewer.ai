import { Timestamp } from "@firebase/firestore"
import { UserDetails } from "./modal"

export const getLoggedInUserDetails = () => {
    const u = localStorage.getItem("user") || ""
    const userDetails: UserDetails = JSON.parse(u)
    return userDetails
}

export function copyToClipboard(text: string) {
    // Create a textarea element
    const textarea = document.createElement('textarea');
    
    // Assign the text to be copied to the textarea value
    textarea.value = text;
    
    // Make the textarea out of the viewport to avoid any interference
    textarea.style.position = 'fixed';
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    
    // Append the textarea to the DOM
    document.body.appendChild(textarea);
    
    // Select the text in the textarea
    textarea.select();
    
    // Copy the selected text to the clipboard
    document.execCommand('copy');
    
    // Remove the textarea from the DOM
    document.body.removeChild(textarea);
  }

export const getFormattedDate = (timestamp: Timestamp) => {
    if (!timestamp) return "-"
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

    // Format the date according to the desired format
    const formattedDate = date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
    return formattedDate
}

export const getFormattedJson = (jsonString: string) => {
    const cleanedString = jsonString.replace(/^```json/gm, '').replace(/```$/gm, '');
    const jsonObject = JSON.parse(cleanedString);
    return jsonObject
}