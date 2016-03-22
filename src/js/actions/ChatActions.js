import dispatcher from "../dispatcher";

export function addMessage(text)
{
    dispatcher.dispatch({
        type: "ADD_MESSAGE",
        text
    });
}
