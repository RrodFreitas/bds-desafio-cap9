package com.devsuperior.movieflix.dtos;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ReviewDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long movieId;
	private Long userId;

	@NotBlank(message = "Campo obrigatório")
	private String text;

	private User user;
	
	public ReviewDTO(Long id, Long movieId, Long userId, String text) {
		this.id = id;
		this.movieId = movieId;
		this.userId = userId;
		this.text = text;
	}
	
	public ReviewDTO(Review entity) {
		this.id = entity.getId();
		this.movieId = entity.getMovie().getId();
		this.userId = entity.getUser().getId();
		this.text = entity.getText();		
	}
}
