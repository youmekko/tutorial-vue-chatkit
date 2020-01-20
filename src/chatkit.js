import { ChatManager, TokenProvider } from '@pusher/chatkit-client' 
import moment from 'moment'
import store from './store/index'

const INSTATNCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

async function connectUser(userId){
    const chatMannager = new ChatManager({
        instanceLocator : INSTATNCE_LOCATOR,
        tokenProvider: new TokenProvider({url : TOKEN_URL}),
        userId
    })

    currentUser = await chatMannager.connect();
    return currentUser;
}

function setMembers(){
    const members = activeRoom.users.map(user => ({
        username: user.id,
        name: user.name,
        presence: user.presence.state
    }));
    store.commit('setUsers', members);
}

async function subscribeRoom(roomId){
    store.commit('clearChatRoom');
    activeRoom = await currentUser.subscribeToRoom({
        roomId,
        messageLimit: MESSAGE_LIMIT,
        hooks: {
            //receives messages
            onMessage: message => {
                store.commit('addMessage', {
                    name: message.sender.name,
                    username: message.senderId,
                    text: message.text,
                    data: moment(message.createAt).format('h:mm:ss a D-MM-YYYY')
                });
            },
            //receives an event when a user logs in or out
            onPresenceChanged: () => {
                setMembers();
            },
            //receives an event that a user is typing
            onUserStartedTyping: user => {
                store.commit('setUserTyping', user.id)
            },
            //recievs an event than a user has stopped typing
            onUsersSttopedTyping: () => {
                store.commit('setUserTyping', null)
            }
        }
    })
    setMembers();
    return activeRoom;
}

export default {
    connectUser,
    subscribeRoom
}