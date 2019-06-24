export default (duration) => {
	let time = Math.floor(duration);
	let hrs = Math.floor(time / 3600);
	let mins = Math.floor((time % 3600) / 60);
	if (mins < 10) mins = '0'+mins;
	let secs = time % 60;
	let videoDuration = '';
	if (hrs > 0) {
		videoDuration += "" + hrs + ":" + (mins < 10 ? "0" : "");
	}
	videoDuration += "" + mins + ":" + (secs < 10 ? "0" : "");
	videoDuration += "" + secs;	
	return videoDuration;
}