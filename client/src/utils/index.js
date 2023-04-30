import FileSaver from 'file-saver';
import { randomPrompts } from '../constants';

export function getRandom(prompt) {
	// jo mere pass phle s data tha usme s ek random index nikale
	const index = Math.floor(Math.random() * randomPrompts.length);
	// fr iindex p jake hm value utha lenge
	const newPrompt = randomPrompts[index];
	// ho skta h last prompt isi k barabar ho to
	if (prompt === newPrompt) return getRandom(prompt);

	return newPrompt;
}

export async function getImage(_id, photo) {
	FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
