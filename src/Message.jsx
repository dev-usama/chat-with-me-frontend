import './Message.css';
export default function Message({prompt, response}) {
    return (
        <div className="Message" style={prompt && {justifyContent: "flex-end"}}>
            <p>{response ? response : prompt}</p>
        </div>
    );
}