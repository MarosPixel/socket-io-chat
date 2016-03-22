import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

import io from "socket.io-client";

class ChatStore extends EventEmitter
{
    constructor() {
        super();

        this.socket = io("http://localhost:3000");
        this.socket.on('chat message', this.handleSocketMessage.bind(this));

        this.messages = [
            {
                id: 113464613,
                text: "Go Shopping"
            },
            {
                id: 235684679,
                text: "Pay Water Bill"
            }
        ];
    }

    getAll()
    {
        return this.messages;
    }

    sendMessage(text)
    {
        this.socket.emit('chat message', text);
    }

    addMessage(text)
    {
        this.messages.push({
            id: Date.now(),
            text
        });

        this.emit("change");
    }

    handleSocketMessage(text)
    {
        this.addMessage(text);
    }

    handleActions(action)
    {
        switch(action.type) {
            case "ADD_MESSAGE": {
                this.sendMessage(action.text);
                break;
            }
        }
    }

}

const store = new ChatStore;
dispatcher.register(store.handleActions.bind(store));

export default store;
