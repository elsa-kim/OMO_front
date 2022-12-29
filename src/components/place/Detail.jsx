import React from "react";
import {
	BsFillBookmarkFill,
	BsFillHeartFill,
	BsFillTelephoneFill,
	BsFillShareFill,
	BsMapFill,
	BsBookmark,
} from "react-icons/bs";
import { IoMdHome } from "react-icons/io";

import { NavLink, useLocation, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

export default function Detail() {
	const [data, setData] = useState([]);
	const [image, setImage] = useState([]);
	let { contentid } = useParams();
	const location = useLocation();
	const state = location.state;
	console.log(location.state);
	// 관광정보 API
	const key =
		"ooVIIXvB%2F%2F%2B6kPC1iOe5%2FArkuU5iefGXK4vuV228x6faKt32nsB1O%2BZCEVg8v3xcT6m9tvBLsprDfDjVs5gt3w%3D%3D";

	// 정보 불러오기
	const infoURL = `http://apis.data.go.kr/B551011/KorService/detailCommon?_type=json&serviceKey=${key}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentid}&defaultYN=Y`;

	// 이미지 불러오기
	const imgURL = `http://apis.data.go.kr/B551011/KorService/detailImage?_type=json&serviceKey=${key}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&contentId=${contentid}&subImageYN=Y`;

	// 정보 불러오기
	useEffect(() => {
		fetch(infoURL)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				console.log(json.response.body.items.item);
				setData(json.response.body.items.item);
			});
	}, []);

	// 이미지 불러오기
	useEffect(() => {
		fetch(imgURL)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				console.log(json.response.body.items.item);
				setImage(json.response.body.items.item);
			});
	}, []);

	// 서버(isSaved true/false)

	// 저장
	// useEffect(() => {
	// 	let method = "POST";
	// 	if (save === undefined) {
	// 		method = "DELETE";
	// 	}
	// 	fetch(url, {
	// 		method,
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: localStorage.getItem("Token"),
	// 		},
	// 		body: JSON.stringify(save),
	// 	})
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((json) => {
	// 			console.log(json.response.body.items.item);
	// 			setData(json.response.body.items.item);
	// 		});
	// }, [save]);

	console.log(data); // 정보
	console.log(image); // 이미지

	// 들어갈 정보들
	const placeImg = state.img;
	const placeTitle = data[0]?.title;
	const placeAddr = state.addr;
	const homepage = data[0]?.homepage;
	// console.log(placeHomepage.split('"')[1]);
	const placeHomepage = homepage?.split('"')[1];
	const placeTel = data[0]?.tel;

	return (
		<>
			<section
				className="detailView
			">
				<div className="sectionWrap">
					<div className="placeInfo">
						<div className="placeImg">
							<img src={placeImg} alt="장소 이미지" />
						</div>
						<div
							className="infoContents
						">
							<div className="inner">
								{" "}
								<ul className="infoText">
									<li className="placeTitle">
										{placeTitle !== ""
											? placeTitle
											: "제목 없음"}
									</li>
									<li className="placeAddr">
										<BsMapFill />
										{placeAddr}
									</li>
									<li className="placeHomepage">
										<IoMdHome />
										{/* //placeHomepage <NavLink to={placeHomepage} /> */}
										{homepage !== "" ? (
											<a href={placeHomepage}>
												{placeHomepage}
											</a>
										) : (
											"미제공"
										)}
									</li>
									<li className="placeTel">
										<BsFillTelephoneFill />
										{placeTel !== "" ? placeTel : " 미제공"}
									</li>
								</ul>
								<ul className="shareBookmark">
									<li>
										<BsBookmark />
										{/* save 값이 있다면 <BsFillBookmarkFill /> 없다면 <BsBookmark />*/}
									</li>
									<li>
										<BsFillShareFill />
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="placeImgMore">
						<div className="inner">
							<h2>사진 더 보기</h2>
							<hr />
							{image === undefined ? (
								<h4>제공되는 이미지 없음</h4>
							) : (
								image?.map((item, index) => (
									<div key={index}>
										<img
											src={item.originimgurl}
											alt={item.contentid}
											style={{ width: 300 }}
										/>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}