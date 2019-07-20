const initState = {
	popularVideos: null,
	videos: null,
	videosProfile: null,
	singleVideo: null,
	watchVideoError: null,
	favouritesVideos: null,
	userVideos: null
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
		case 'UPDATE_FAVOURITES_VIDEOS':
			return {
				...state,
				favouritesVideos: action.data
			}
		case 'CLEAR_FAVOURITES_VIDEOS':
			return {
				...state,
				favouritesVideos: null
			}
		case 'UPDATE_PROFILE_VIDEOS':
			return {
				...state,
				videosProfile: action.data
			}
		case 'CLEAR_PROFILE_VIDEOS':
			return {
				...state,
				videosProfile: null
			}
		case 'UPDATE_USER_VIDEOS':
			return {
				...state,
				userVideos: action.data
			}
		case 'CLEAR_USER_VIDEOS':
			return {
				...state,
				userVideos: null
			}
		default: return state;
	}
}

export default videoReducer;