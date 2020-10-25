/**
 * The main use cases of the httpMQ application (it's public interface).
 */
import { NewMessageRequestDto } from "./bondaries/schemas/new-message";

function sendMessageToDestination(newMessageRequest: object) {
    NewMessageRequestDto.parse(newMessageRequest);
} 

 export { sendMessageToDestination };
