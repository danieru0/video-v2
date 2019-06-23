const initState = {
	popularVideos: null,
	videos: null
}

const videoReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_POPULAR_VIDEOS':
			return {
				...state,
				popularVideos: action.data
			}
		case 'UPDATE_VIDEOS':
			return {
				...state,
				videos: action.data
			}
		default: return state;
	}
}

export default videoReducer;