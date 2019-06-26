const initState = {
	popularVideos: null,
	videos: null,
	singleVideo: null,
	watchVideoError: null
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
		case 'CLEAR_VIDEOS': 
			return {
				...state,
				videos: null,
				popularVideos: null
			}
		case 'UPDATE_SINGLE_VIDEO':
			return {
				...state,
				singleVideo: action.data
			}
		case 'UPDATE_WATCH_VIDEO_ERROR':
			return {
				...state,
				watchVideoError: action.data
			}
		case 'CLEAR_SINGLE_VIDEO':
			return {
				...state,
				singleVideo: null
			}
		default: return state;
	}
}

export default videoReducer;