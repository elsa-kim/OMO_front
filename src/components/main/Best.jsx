import React from "react";
import { NavLink } from "react-router-dom";

export default function Best() {
	return (
		<section id="best">
			<h3>π μ€λ μ΄κ³³μ μ΄λμ?</h3>
			<div className="moreContainer">
				<div className="tourMore col-4">
					<NavLink to="/tour">
						<div className="img">
							<img src="/images/mainTour.jpeg" alt="κ΄κ΄μ§" />
						</div>
					</NavLink>
					<span>
						κΌ­ κ°λ΄μΌν  <br /> ν«νλ μ΄μ€
					</span>
				</div>
				<div className="cultureMore col-4">
					<NavLink to="/culture">
						<div className="img">
							<img src="images/mainCulture.jpeg" alt="λ¬Ένμμ€" />
						</div>
					</NavLink>
					<span>
						μΌμμ νΉλ³νκ²
						<br /> λ§λ€μ΄μ€ κ³΅κ°
					</span>
				</div>
				<div className="foodMore col-4">
					<NavLink to="/food">
						<div className="img">
							<img src="/images/mainFood.jpeg" alt="" />
						</div>
					</NavLink>
					<span>
						μ°λ§μ λ³΄λ΄κΈ° μ’μ <br /> λ€μ΄λ νλ μ΄μ€
					</span>
				</div>
			</div>
		</section>
	);
}
