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
            await chatkit.subscribeRoom(activeRoom.id);

            commit('setReconnect', false);

            //Test state.user
            console.log(state.user);

            return true;
        } catch (error) {
            handleError(commit, error);
        } finally {
            commit('setLoading', false)
        }
    }
}