// messageHandler 

import { addMessageToConversation } from './uiService.js';
import { sendMessageToServers } from './apiService.js';
import { showLoadingMessage, updateWithBotResponse } from './utilities.js';



// prevent sending void messages, dont show alert just dont send any message
/**
 * Formats the message to be compatible with server commands.
 * @param {string} message - The message to format.
 * @returns {string} The formatted message.
 */
function formatMessageForServer(message) {
    return message.startsWith('/') ? message : `.ai ${message}`;
}

/**
 * Sends a message entered by the user and processes the response.
 */
export async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    console.log("Sending message:", message);

    const sendButton = document.getElementById('sendButton');
    sendButton.disabled = true; // Disable button while sending

    // Clear input and update UI with user's message
    messageInput.value = '';
    addMessageToConversation(message, 'user');

    // Show loading message from the bot
    showLoadingMessage();

    try {
        // Make sure formatted text is only displayed for user, send original message to server
        const formattedMessage = formatMessageForServer(message);
    /*    console.log("Formatted message for server:", formattedMessage);
        const responseText = await sendMessageToServers(formattedMessage);
*/
        // Handle server response
        if (responseText) {
            console.log("Received response from server:", responseText);
            updateWithBotResponse(responseText);
        } else {
            console.warn("No response received from server.");
            updateWithBotResponse('Damn, Respuesta no recibida. Inténtalo más tarde.');
        }
    } catch (error) {
        console.error('Error with sendMessageToServers:', error);
        updateWithBotResponse('Damn, No se pudo enviar el mensaje. Inténtalo más tarde.');
    } finally {
        sendButton.disabled = false; // Re-enable the send button after the message is sent
    }
}
