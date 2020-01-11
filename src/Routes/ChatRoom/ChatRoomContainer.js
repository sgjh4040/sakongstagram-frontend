import React, { useEffect, useState, useRef } from "react";
import queryString from 'query-string';
import withRouter from "react-router-dom/withRouter";
// import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import ChatRoomPresenter from "./ChatRoomPresenter";
import { SEE_ROOM, NEW_MESSAGE, SEND_MESSAGE } from "../Chat/ChatQueries"
import { ME } from "../../SharedQueries";
import withSuspense from "../../Components/withSuspense";
import Loader from "../../Components/Loader";
import { useQuery, gql, useMutation, useSubscription } from '@apollo/client';

const chat = withRouter(({ match: { params: { id: roomId } }, location }) => {
    const [newMessage, setNewMessage] = useState([]);
    const [sendLoading, setSendLoading] = useState(false);
    const [message, setMessage] = useState("");
    const chatBox = useRef(null);
    const { subscribeToMore, data, loading } = useQuery(SEE_ROOM, {
        variables: {
            id: roomId
        }
    });
    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            message,
            roomId: roomId
        },
        refetchQueries: ()=>[{
            query: SEE_ROOM,
            variables: {
                id: roomId
            }
        }],
    });



    const more = () => subscribeToMore({
        document: NEW_MESSAGE,
        variables: {
            roomId: roomId
        },
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            console.log(prev);
            const newMessage = subscriptionData.data.newMessage;
            console.log(newMessage);
            setNewMessage(prev => [...prev, newMessage]);
            return {
                ...prev
            }
            // return Object.assign({}, prev, {
            //     seeRoom: {
            //         messages:[...prev.seeRoom.messages,newMessage]
            //     }
            // });
        },
    });
    const onSubmit = async () => {
        console.log("submit")
        if (message === "") {
            return;
        }
        try {
            setSendLoading(true);
            await sendMessageMutation();
        } catch (e) {
            console.log(e);
            return
        } finally {
            setMessage("");
            scrollToBottom();
            setSendLoading(false);

        }
    };
    const onChange = e => {
        const {
            target: { value }
        } = e;
        setMessage(value);
    };
    const scrollToBottom = () => {
        console.log(chatBox.current);
        chatBox.current.scrollIntoView({ block: 'end', behavior: 'smooth' })
    }
    useEffect(() => {
        more();
        
    }, []);
    useEffect(()=>{
        if (!loading) {
            scrollToBottom();
        }
    },[newMessage])


    return <ChatRoomPresenter
        loading={loading}
        sendLoading={sendLoading}
        data={data}
        newMessage={newMessage}
        message={message}
        onChange={onChange}
        onSubmit={onSubmit}
        chatBox={chatBox}

    />
})
export default chat;



// const chat = withRouter(({ match: { params: { id: roomId } }, location }) => {
//     const query = queryString.parse(location.search);
//     console.log(query);

//     const [loading, setLoading] = useState(false);

//     const { data, loading: seeRoomLoading,subS } = useQuery(SEE_ROOM, {
//         suspend:true,
//         // fetchPolicy: "cache-first",
//         variables: {
//             id: roomId
//         }
//     });

//     // const {
//     //     data: {
//     //         seeRoom: {
//     //             messages: oldMessages
//     //         },
//     //         me: {
//     //             id: fromId
//     //         }
//     //     }, refetch
//     // } = useQuery(SEE_ROOM, {
//     //     variables: {
//     //         id: roomId
//     //     }
//     // });


//     const { data: newdata } = useSubscription(NEW_MESSAGE, {
//         variables: {
//             roomId: roomId
//         }
//     });
//     const [message, setMessage] = useState("");

//     const [messages, setMessages] = useState(data.seeRoom.messages||[]);
//     const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
//         variables: {
//             message,
//             roomId: roomId
//         }
//     });

//     const handleNewMessage = () => {
//         console.log("handleNewMessage");
//         if (newdata !== undefined) {
//             const { newMessage } = newdata;
//             console.log(newMessage);
//             setMessages([...messages, newMessage]);
//         }
//     };

//     const onChange = e => {
//         const {
//             target: { value }
//         } = e;
//         setMessage(value);
//     };
//     useEffect(() => {
//         console.log("useeffect");

//         handleNewMessage();

//     }, [newdata]);


//     const onSubmit = async () => {
//         console.log("submit")
//         if (message === "") {
//             return;
//         }
//         try {
//             setLoading(true);
//             await sendMessageMutation();
//         } catch (e) {
//             console.log(e);
//             return
//         } finally {
//             setMessage("");
//             setLoading(false);

//         }
//     };
//     const onKeyPress = async event => {
//         console.log("onKeypress");
//         const { which } = event;
//         if (which === 13) {
//             if (message === "") {
//                 return;
//             }
//             event.preventDefault();
//             try {
//                 await sendMessageMutation();
//             } catch (e) {
//                 console.log(e);
//             } finally {
//                 setMessage("");
//             }
//         } else {
//             return
//         }
//     };
//     // return (
//     //     <div>
//     //         {messages.map(message => <div key={message.id}>{message.text}</div>)}
//     //         <input value={message} onChange={onChange}></input>
//     //         <button disabled={loading} onClick={onSubmit}>
//     //         전송
//     //     </button>
//     //     </div>


//     // )
//     // if (seeRoomLoading) {
//     //     return <Loader />
//     // } else {
//         return (
//             <div>
//                 {data&&data.seeRoom&&data.seeRoom.messages.map(message => <div key={message.id}>{message.text}</div>)}
//                 <input value={message} onChange={onChange}></input>
//                 <button disabled={loading} onClick={onSubmit}>
//                     전송
//         </button>
//             </div>
//         )
//     // }


//     // return <ChatRoomPresnter  seeRoomLoading={seeRoomLoading} loading={loading} onChange={onChange} message={message} messages={messages} onKeyPress={onKeyPress} onSubmit={onSubmit} />
// });

// export default withSuspense(chat);
// // export default chat;