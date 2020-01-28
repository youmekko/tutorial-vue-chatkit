import chatkit from '../chatkit'

//Helper function for displying error messages
function handleError(commit, error){
    const message = error.message || error.info.error_description;
    commit('setError', message)
}

export default {
    async login({ commit, state }, userId){
        try {
            commit('setError', '');
            commit('setLoading', true);

            //Connect user to Chatkit service
            const currentUser = await chatkit.connectUser(userId);
            commit('setUser', {
                username: currentUser.id,
                name: currentUser.name
            });

            //save list of user's room in store
            const rooms = currentUser.rooms.map(room => ({
                id: room.id,
                name: room.name
            }))
            commit('setRooms', rooms);

            //subsribe user to a room
            const activeRoom = state.activeRoom || rooms[0] //pci last used room, ror the first one
            commit('setActiveRoom', {
                id: activeRoom.id,
                name: activeRoom.name
            })
            await chatkit.subscribeToRoom(activeRoom.id);

            commit('setReconnect', false);

            //Test state.user
            console.log(state.user);

            return true;
        } catch (error) {
            handleError(commit, error);
        } finally {
            commit('setLoading', false)
        }
    },


    //changing room
    async changeRoom({commit}, roomId){
        try{
            const { id, name } = await chatkit.subscribeToRoom(roomId);
            commit('setActiveRoom', { id, name })
        }catch (error) {
            console.log('error', error)
            handleError(commit, error);
        }
    },


    async sendMessage({ commit }, message) {
        try {
            commit('setError', '');
            commit('setSending', true);
            const messageId = await chatkit.sendMessage(message);
            return messageId;
        }catch (error) {
            handleError('setSending', false);
        }finally {
            commit('setSending', false)
        }
    },

    async logout({ commit }) {
        commit('reset');
        chatkit.disconnectUser();
        window.localStorage.clear();
    }
    
}

