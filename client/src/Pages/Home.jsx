import React from 'react';
import { Card, Loader, FillForm } from '../components';

//cards ko render krne k lie e renderPost functionbanaenge
const RenderPosts = ({ data, title }) => {
	if (data.length > 0) {
		return data.map((itm) => <Card key={itm._id} {...itm} />);
	} else {
		return <h2 className="mt-5 font-bold text-xl uppercase text-[#6449ff]">{title}</h2>;
	}
};
const Home = () => {
	const [load, setLoad] = React.useState(false);
	const [posts, setPosts] = React.useState([]);
	const [searchText, setSearchText] = React.useState('');
	const [searchResult, setSearchResult] = React.useState(null);
	const [searchTimeOut, setSearchTimeOut] = React.useState(null);
	const fetchData = async () => {
		setLoad(true);
		try {
			const resp = await fetch('http://localhost:8000/api/v1/post', {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});
			const result = await resp.json();
			setPosts(result.data.reverse());
		} catch (error) {
			alert(error);
		} finally {
			setLoad(false);
		}
	};
	const handleSearch = async (e) => {
		clearTimeout(searchTimeOut);

		setSearchText(e.target.value);
		// ab hm search m kuch bhi type krte h to kuch second k baad jake wo cheej search hogi iske lie debounceing krte h
		setSearchTimeOut(
			setTimeout(() => {
				const resText = posts.filter(
					(itm) => itm.name.toLowerCase().includes(searchText.toLowerCase()) || itm.prompt.toLowerCase().includes(searchText.toLowerCase())
				);
				setSearchResult(resText);
			}, 500)
		);
	};
	React.useEffect(() => {
		fetchData();
	}, []);
	return (
		<section className="max-w-7xl mx-auto">
			{/* head of this section */}
			<div>
				<h1 className="font-extrabold text-[#222328] text-[32px]">Community Showcase</h1>
				<p className="text-[16px] mt-2 text-[#666e75]">Browse through tons of stunning images generated by AI</p>
			</div>
			{/* form field will be here */}
			<div className="mt-16">
				<FillForm labelName="Search Post" type="text" name="text" placeholder="Search post" value={searchText} handleChange={handleSearch} />
			</div>
			{/* Loading section */}
			{load ? (
				<div className="flex justify-center items-center">
					<Loader />
				</div>
			) : (
				<>
					{searchText && (
						<h1 className="text-[#666e75] font-medium text-xl mb-3">
							Showing results for <span className="text-[#222328]">{searchText}</span>
						</h1>
					)}
				</>
			)}
			{/* yaha p mere sare posts aaenge */}
			{/* yaha pe searchtext ko configure kie h hm */}
			<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
				{/* if our user searches somethin then searchtext=1 so 1st RenderPost workds but if user doesnot searches anything then that means they want to get all posts */}
				{searchText ? (
					// 1st render it searches if data given to it is there then responds otherwise no result found
					<RenderPosts data={searchResult} title="No results found" />
				) : (
					// y wala seacrh basically tb chalega jb mera user kuch search ni kr rha h
					<RenderPosts data={posts} title="No posts found" />
				)}
			</div>
		</section>
	);
};

export default Home;
