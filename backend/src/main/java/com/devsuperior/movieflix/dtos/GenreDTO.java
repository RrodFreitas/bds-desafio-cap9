package com.devsuperior.movieflix.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenreDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String name;
	@JsonIgnore
	private Set<MovieDTO> movies = new HashSet<>();
	
	public GenreDTO() {
	}

	public GenreDTO(Long id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public GenreDTO(Genre entity) {
		id = entity.getId();
		name = entity.getName();
	}

	public GenreDTO(Genre entity, Set<Movie> movies) {
		this(entity);
		movies.forEach(mov -> this.movies.add(new MovieDTO(mov)));
	}	
	
	public Set<MovieDTO> getMovies() {
		return movies;
	}

	public void setMovies(Set<MovieDTO> movies) {
		this.movies = movies;
	}
}
