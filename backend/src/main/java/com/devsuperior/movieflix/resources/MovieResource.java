package com.devsuperior.movieflix.resources;

import java.util.List;

import com.devsuperior.movieflix.dtos.MovieDTO;
import com.devsuperior.movieflix.dtos.MovieMinDTO;
import com.devsuperior.movieflix.dtos.ReviewMinDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.services.MovieService;
import com.devsuperior.movieflix.services.ReviewService;

@RestController
@RequestMapping(value = "/movies")
public class MovieResource {

	@Autowired
	private MovieService service;
	
	@Autowired
	private ReviewService reviewService;
	
	@GetMapping
	public ResponseEntity<Page<MovieMinDTO>> findGenre(
			@RequestParam(value = "genreId", defaultValue = "0") Long genreId,
		    Pageable pageable) {
		Page<MovieMinDTO> dto = service.findGenre(genreId,pageable);
		return ResponseEntity.ok().body(dto);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {
		MovieDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}	
	
	@GetMapping(value = "{id}/reviews")
    public ResponseEntity<List<ReviewMinDTO>> findReviewsOfMovie(@PathVariable Long id) {
        List<ReviewMinDTO> list = reviewService.findReviewsOfMovie(id);
        return ResponseEntity.ok().body(list);
    }
}