import { ChatMannager, TokenProvider } from '@pusher/chatkit-client' 

const INSTATNCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR;
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL;
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10;

let currentUser = null;
let activeRoom = null;

async function connectUser(userId){
    const chatMannager = new ChatMannager({
        INSTATNCE_LOCATOR : INSTATNCE_LOCATOR,
        TokenProvider: new TokenProvider({url : TOKEN_URL}),
        userId
    })

    currentUser = await ChatMannager.connect();
    return currentUser;
}

export default {
    connectUser
}