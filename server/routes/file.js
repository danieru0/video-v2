import secureUpload from '../middlewares/secureUpload';
import canUpload from '../middlewares/canUpload';
import canUseSettings from '../middlewares/canUseSettings';
import fs from 'fs';

module.exports = (app, videoUpload, imageUpload, miniatureUpload, backgroundUpload) => {
	app.post('/upload/video', secureUpload, canUpload, videoUpload.single('video'), (req, res) => {
		res.status(200).send({name: req.file.filename});
	});

	app.post('/upload/avatar', secureUpload, canUseSettings, imageUpload.single('avatar'), (req, res) => {
		res.status(200).send('File name: ' + req.file.filename);
	});

	app.post('/upload/miniature', secureUpload, canUseSettings, miniatureUpload.single('miniature'), (req, res) => {
		res.status(200).send({name: req.file.filename});
	});

	app.post('/upload/background', secureUpload, canUseSettings, backgroundUpload.single('background'), (req, res) => {
		res.status(200).send({name: req.file.filename});
	});

	//https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6 
	app.get('/serve/video', (req, res) => {
		const path = `./videos/${req.query.id.substring(1, req.query.id.length-1)}.mp4`;
		const stat = fs.statSync(path);
		const fileSize = stat.size;
		const range = req.headers.range;

		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			const end = parts[1]
			? parseInt(parts[1], 10)
			: fileSize-1

			const chunksize = (end-start)+1;
			const file = fs.createReadStream(path, {start, end});
			const head = {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4',
			}

			res.writeHead(206, head);
			file.pipe(res);
		} else {
			const head = {
			'Content-Length': fileSize,
			'Content-Type': 'video/mp4',
			}
			res.writeHead(200, head);
			fs.createReadStream(path).pipe(res);
		}
	});
}