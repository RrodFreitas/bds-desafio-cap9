package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.stream.Collectors;

import com.devsuperior.movieflix.dtos.ReviewDTO;
import com.devsuperior.movieflix.dtos.ReviewMinDTO;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.entities.Review;

@Service
public class ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private MovieRepository movieRepository;
	
	@Autowired
	private AuthService authService;

	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {
		Review entity = new Review();
		copyDtoToEntity(dto, entity);
		System.out.println("Review "+entity.getText());
		entity = reviewRepository.save(entity);
		ReviewDTO reviewDTO = new ReviewDTO(entity);
		reviewDTO.setUser(authService.authenticated());
		return reviewDTO;
	}
	
	 @Transactional(readOnly = true)
	    public List<ReviewMinDTO> findReviewsOfMovie(Long id) throws ResourceNotFoundException {
	        List<Review> list = reviewRepository.findReviewsOfMovie(id);
	        if (list.isEmpty()) {
	            throw new ResourceNotFoundException("Entity not found");
	        }
	        return list.stream().map(x -> new ReviewMinDTO(x, x.getUser())).collect(Collectors.toList());
	    }


	private void copyDtoToEntity(ReviewDTO dto, Review entity) {
		System.out.println("MovieId "+dto.getMovieId());
		System.out.println("MovieId "+dto.getUserId());
		entity.setMovie(movieRepository.getOne(dto.getMovieId()));
		entity.setUser(authService.authenticated());
		entity.setText(dto.getText());

	}	
}