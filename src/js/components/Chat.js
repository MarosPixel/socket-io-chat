import React from "react";

import * as ChatActions from "../actions/ChatActions";
import ChatStore from "../stores/ChatStore";

export default class Chat extends React.Component
{
    constructor(props)
    {
        super();

        this.state = {
            message: '',
            messages: ChatStore.getAll()
        };
    }

    componentWillMount()
    {
        ChatStore.on('change', this.updateMessages.bind(this));
    }

    componentWillUnmount()
    {
        ChatStore.unbind('change', this.updateMessages.bind(this));
    }

    updateMessages()
    {
        this.setState({
            messages: ChatStore.getAll()
        });
    }

    handleChange(event)
    {
        this.setState({
            message: event.target.value
        });
    }

    handleSubmit(event)
    {
        event.preventDefault();

        ChatActions.addMessage(this.state.message);

        this.setState({
            message: ''
        });
    }

    render()
    {
        const MessageComponents = this.state.messages.map((message) => {
            return (<li key={message.id}>{message.text}</li>);
        });

        return (
            <div>
                <ul id="messages">{MessageComponents}</ul>
                <form action="" onSubmit={this.handleSubmit.bind(this)}>
                    <input id="m" autoComplete="off" value={this.state.message} onChange={this.handleChange.bind(this)} /><button>Send</button>
                </form>
            </div>
        );
    }
}
