

import { Dna } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useContext } from "react";
import uuid from "react-uuid";

import ContentItem from "../components/ContentItem";
import { DataContext } from "../context/DataContext";



export default function WorkPlace() {

	const { news, employees } = useContext(DataContext);

	return (
		<>
			<div className="flex gap-2 p-4">
				<NavLink
					to={"/api/dashboard/home/news/add"}
					className="group flex flex-col h-32 w-32 border-4 border-transparent text-white text-2xl bg-orange-500 hover:bg-orange-300 gap-2 px-2 items-center justify-center transition-all cursor-pointer shadow-lg"
				>
					<FaPlus className="cursor-pointer transition-all text-5xl" />
					<p className="text-[16px] border-t white font-bold">Új bejegyzés</p>
				</NavLink>
			</div>

			<div className="relative flex flex-wrap max-lg:flex-col justify-center gap-10 p-4 items-start">
				{!news
					? <Dna
						visible={true}
						height="100"
						width="100"
						ariaLabel="dna-loading"
					/>
					: <>
						{
							news.map(item => {
								const user = employees.find(emp => emp._id === item.userID)
								return (
									<ContentItem
										key={uuid()}
										data={item}
										user={user}
									/>
								)
							})
						}
					</>
				}

			</div>
		</>
	)
}
