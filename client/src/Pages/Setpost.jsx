import React from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { FillForm, Loader } from '../components';
import { getRandom } from '../utils';
const Setpost = () => {
	const [isImage, setIsImage] = React.useState(false);
	const [load, setLoad] = React.useState(false);
	const navigate = useNavigate();
	const [form, setForm] = React.useState({
		name: '',
		prompt: '',
		photo: '',
	});
	// form functions
	const handleChange = (e) => {
		// form m jo change kr rhe h wo e.name s milega aur uski value e.value s aur ... s change kr denge
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	const generateImage = async (e) => {
		e.preventDefault();
		if (form.prompt) {
			try {
				setIsImage(true);
				const response = await fetch('http://localhost:8000/api/v1/ai', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						prompt: form.prompt,
					}),
				});

				const data = await response.json();
				setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
			} catch (err) {
				alert(err);
			} finally {
				setIsImage(false);
			}
		} else {
			alert('Please provide proper prompt');
		}
	};
	const handleSurpriseMe = () => {
		const newPropmt = getRandom(form.prompt);
		setForm({ ...form, prompt: newPropmt });
	};
	// change krne p y chalega

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (form.prompt && form.photo) {
			setLoad(true);
			try {
				const resp = await fetch('http://localhost:8000/api/v1/post', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ...form }),
				});
				const re = await resp.json();
				console.log(re);
				navigate('/');
				setLoad(false);
			} catch (error) {
				alert(error);
			} finally {
				setLoad(false);
			}
		} else {
			alert('Fill the form correctly');
		}
	};
	return (
		<section className=" max-w-7xl mx-auto">
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
				<p className="text-[16px] mt-2 text-[#666e75]">Create your own visually stunning and asthetic images by the help of AI</p>
			</div>
			<form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-5">
					<FillForm labelName="Your name" name="name" type="text" placeholder="johnDoe" value={form.name} handleChange={handleChange} />
					<FillForm
						labelName="Prompt"
						name="prompt"
						type="text"
						placeholder="a stained glass window depicting a hamburger and french fries"
						value={form.prompt}
						handleChange={handleChange}
						isSurpriseMe
						handleSurpriseMe={handleSurpriseMe}
					/>
				</div>
				<div className="mt-5  border bg-gray-50 relative border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64 p-3 flex justify-center items-center">
					{form.photo ? (
						<img src={form.photo} alt="form ka photo" className=" w-full object-contain h-full" />
					) : (
						<img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
					)}
					{isImage && (
						<div className=" absolute inset-0 z-0 rounded-lg bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
							<Loader />
						</div>
					)}
				</div>
				<div className="mt-5 flex gap-5">
					<button
						type="button"
						onClick={generateImage}
						className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						{isImage ? 'Generating....' : 'Generate'}
					</button>
				</div>
				<div className="mt-10">
					<p className="mt-2 text-[14px] text-[#666e75]">Once the image is created you can also share it with others</p>
					<button type="submit" className=" font-medium mt-3 bg-[#6469ff] rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center text-white">
						{load ? 'Sharing...' : 'Share with others'}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Setpost;
