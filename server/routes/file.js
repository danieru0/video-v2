import secureUpload from '../middlewares/secureUpload';
import fs from 'fs';

module.exports = (app, videoUpload, imageUpload, miniatureUpload) => {
	app.post('/upload/video', secureUpload, videoUpload.single('video'), (req, res) => {
		res.status(200).send({name: req.file.filename});
	});

	app.post('/upload/avatar', secureUpload, imageUpload.single('avatar'), (req, res) => {
		res.status(200).send('File name: ' + req.file.filename);
	});

	app.post('/upload/miniature', secureUpload, miniatureUpload.single('miniature'), (req, res) => {
		res.status(200).send({name: req.file.filename});
	});

	//https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6 
	app.get('/serve/video', (req, res) => {
		const path = './videos/5d092a1c9cc2f81ee068c089.mp4';
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