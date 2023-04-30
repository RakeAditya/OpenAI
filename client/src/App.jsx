import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Home, Setpost } from './Pages';
import { logo } from './assets';
const App = () => {
	return (
		<BrowserRouter>
			<header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
				<Link to="/">
					<img src={logo} alt="logo" className="w-28 object-contain" />
				</Link>
				<Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
					Create
				</Link>
			</header>
			{/* min-h- m e 100 vh full height - 73 that is height of our navbar */}
			<main className="sm:p-8 px-4 py-8 bg-[#f9fafe] w-full min-h-[calc(100vh - 73px)]">
				{/* main k ander dono pages ka route set kr die h */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create-post" element={<Setpost />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
