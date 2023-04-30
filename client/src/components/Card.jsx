import React from 'react';
import { download } from '../assets';
import { getImage } from '../utils';
const Card = ({ _id, name, prompt, photo }) => {
	return (
		<div className=" rounded-xl group relative shadow-card hover:shadow-cardhover card">
			<img src={photo} alt={prompt} className="w-full h-auto object-cover rounded-xl" />
			<div className="group-hover:flex flex-col max-h-[94.5%] hidden bg-[#10113f] m-2 p-4 rounded-md absolute left-0 right-0 bottom-0">
				<p className=" text-white text-sm overflow-y-auto prompt">{prompt}</p>
				<div className="mt-5 flex justify-between items-center gap-2">
					{/* y mera main div ho gaya */}
					<div className="flex items-center gap-2">
						<div className="text-white w-7 h-7 rounded-full object-cover bg-gray-600 flex justify-center items-center text-xs font-bold">
							{name[0].toUpperCase()}
						</div>
						<p className="text-white text-sm">{name}</p>
					</div>
					<button type="button" onClick={() => getImage(_id, photo)} className="text-white outline-none bg-transparent border-none">
						<img src={download} className="w-6 h-6 object-contain invert" alt="Download" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
