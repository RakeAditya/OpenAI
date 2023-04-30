import React from 'react';

const FillForm = (props) => {
	return (
		<div>
			<div className="flex items-center gap-2 mb-4">
				<label htmlFor={props.name} className="block text-sm font-medium text-gray-600">
					{props.labelName}
				</label>
				{props.isSurpriseMe && (
					<button type="button" onClick={props.handleSurpriseMe} className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black">
						Surprise Me
					</button>
				)}
			</div>
			<input
				type={props.type}
				id={props.name}
				name={props.name}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.handleChange}
				className=" bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg p-3 block focus:ring-[#4649ff] outline-none w-full focus:border-[#4649ff]"
			/>
		</div>
	);
};

export default FillForm;
