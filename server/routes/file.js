import secureUpload from '../middlewares/secureUpload';

module.exports = (app, videoUpload, imageUpload) => {
	app.post('/upload/video', secureUpload, videoUpload.single('video'), (req, res) => {
		
	});
}