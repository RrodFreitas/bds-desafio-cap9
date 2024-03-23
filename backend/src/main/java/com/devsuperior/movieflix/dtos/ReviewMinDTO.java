package com.devsuperior.movieflix.dtos;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ReviewMinDTO {

	private Long id;
	@NotBlank(message = "Campo obrigatório")
	private String text;
	private Long movieId;
	private UserDTO user;

	public ReviewMinDTO(Long id, String text, Long movieId) {
		this.id = id;
		this.text = text;
		this.movieId = movieId;
	}

	public ReviewMinDTO(Review entity, User user) {
		id = entity.getId();
		text = entity.getText();
		movieId = entity.getMovie().getId();
		this.user = new UserDTO(user);
	}
}
