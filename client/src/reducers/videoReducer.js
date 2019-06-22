const initState = {
	popularVideos: null
}

const videoReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_POPULAR_VIDEOS':
			return {
				...state,
				popularVideos: action.data
			}
		default: return state;
	}
}

export default videoReducer;