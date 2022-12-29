import React, { useEffect, useState } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import HtmlReactParser from "html-react-parser";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

export default function Diary() {
	const [movieContent, setMovieContent] = useState({
		title: "",
		content: "",
	});

	const [viewContent, setViewContent] = useState([]);

	useEffect(() => {
		const localMovieContent = JSON.parse(
			window.localStorage.getItem("movieContent")
		);
		const localViewContent = JSON.parse(
			window.localStorage.getItem("viewContent")
		);

		if (localMovieContent) setMovieContent(localMovieContent);
		if (localViewContent) setViewContent(localViewContent);
	}, []);

	const getValue = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		setMovieContent({
			...movieContent,
			[name]: value,
		});
	};

	return (
		<>
			<section className="diary">
				<h1>{localStorage.getItem("name")}'s DIARY</h1>
				<div className="movie_container">
					<h2>작성된 글</h2>
					{viewContent.map((element) => (
						<div className="writeContent">
							<h2>{element.title}</h2>
							<div>{HtmlReactParser(element.content)}</div>
							{/* <div>{element.content}</div> */}
							<button className="modify">
								<CiEdit />
							</button>{" "}
							<button className="delete">
								<MdDeleteOutline />
							</button>
						</div>
					))}
				</div>

				<div className="form_wrapper">
					<h2>글 작성하기</h2>
					<input
						className="title_input"
						type="text"
						placeholder="제목"
						onChange={getValue}
						name="title"
					/>
					<CKEditor
						editor={ClassicEditor}
						data=""
						onReady={(editor) => {
							// console.log("Editor is ready to use!", editor);
						}}
						onChange={(event, editor) => {
							const data = editor.getData();
							// console.log({ event, editor, data });
							setMovieContent({
								...movieContent,
								content: data,
							});
							console.log("??", movieContent);
						}}
						onBlur={(event, editor) => {
							console.log("Blur.", editor);
						}}
						onFocus={(event, editor) => {
							console.log("Focus.", editor);
						}}
					/>

					{/* <textarea className="text_area" placeholder="내용"></textarea> */}
				</div>

				<button
					className="submit_button"
					onClick={() => {
						setViewContent(viewContent.concat({ ...movieContent }));
						window.localStorage.setItem(
							"viewContent",
							JSON.stringify(
								viewContent.concat({ ...movieContent })
							)
						);
						window.localStorage.setItem(
							"movieContent",
							JSON.stringify(movieContent)
						);
					}}>
					submit
				</button>
			</section>
		</>
	);
}
